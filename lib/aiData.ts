// Fake historical sales data for AI suggestions

export type SalesRecord = {
    date: string; // "YYYY-MM-DD"
    dayOfWeek: number; // 0=Sun, 6=Sat
    hour: number; // 0-23
    itemId: string;
    itemName: string;
    quantity: number;
};

// Generate fake past 30 days of sales data
function generateFakeSales(): SalesRecord[] {
    const items = [
        { id: "1", name: "Cheeseburger" },
        { id: "2", name: "Fries" },
        { id: "3", name: "Soda" },
        { id: "4", name: "Pizza" },
        { id: "5", name: "Ice Cream" },
        { id: "6", name: "Salad" },
    ];

    const records: SalesRecord[] = [];
    const now = new Date();

    for (let d = 0; d < 30; d++) {
        const date = new Date(now);
        date.setDate(now.getDate() - d);
        const dayOfWeek = date.getDay();
        const dateStr = date.toISOString().split("T")[0];

        // Peak hours: 12-14 (lunch) and 18-20 (dinner)
        const peakHours = [12, 13, 14, 18, 19, 20];
        const allHours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

        for (const hour of allHours) {
            const isPeak = peakHours.includes(hour);
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            for (const item of items) {
                // Burgers and fries sell more at lunch/dinner
                let baseQty = isPeak ? 8 : 3;
                if (isWeekend) baseQty = Math.round(baseQty * 1.5);

                // Item-specific patterns
                if (item.id === "1") baseQty = isPeak ? 12 : 4; // Cheeseburger most popular
                if (item.id === "2") baseQty = isPeak ? 10 : 3; // Fries close second
                if (item.id === "5") baseQty = hour >= 14 ? 6 : 2; // Ice cream afternoon
                if (item.id === "6") baseQty = isPeak ? 4 : 1; // Salad less popular

                const qty = Math.max(0, baseQty + Math.floor(Math.random() * 4) - 2);
                if (qty > 0) {
                    records.push({ date: dateStr, dayOfWeek, hour, itemId: item.id, itemName: item.name, quantity: qty });
                }
            }
        }
    }
    return records;
}

export const SALES_DATA = generateFakeSales();

// --- EMPLOYEE AI: Restock suggestions ---
export type RestockSuggestion = {
    itemId: string;
    itemName: string;
    avgDailySales: number;
    suggestedStock: number;
    reason: string;
};

export function getRestockSuggestions(currentStock: { id: string; name: string; stock: number }[]): RestockSuggestion[] {
    return currentStock.map((item) => {
        const itemSales = SALES_DATA.filter((r) => r.itemId === item.id);
        const totalQty = itemSales.reduce((s, r) => s + r.quantity, 0);
        const avgDaily = Math.round(totalQty / 30);
        const suggestedStock = avgDaily * 2; // 2-day buffer
        const daysLeft = item.stock > 0 ? Math.floor(item.stock / Math.max(avgDaily, 1)) : 0;

        let reason = "";
        if (daysLeft === 0) reason = "Out of stock — restock immediately";
        else if (daysLeft <= 1) reason = `Only ~${daysLeft} day of stock left`;
        else if (item.stock < suggestedStock) reason = `Below recommended buffer (${suggestedStock} units)`;
        else reason = "Stock level looks good";

        return { itemId: item.id, itemName: item.name, avgDailySales: avgDaily, suggestedStock, reason };
    });
}

// --- EMPLOYEE AI: Busy forecast ---
export type BusyForecast = {
    label: string;
    level: "quiet" | "moderate" | "busy" | "very busy";
    expectedSales: number;
};

export function getBusyForecast(): BusyForecast[] {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date().getDay();

    return Array.from({ length: 7 }, (_, i) => {
        const day = (today + i) % 7;
        const daySales = SALES_DATA.filter((r) => r.dayOfWeek === day);
        const total = daySales.reduce((s, r) => s + r.quantity, 0);
        const avg = Math.round(total / Math.max(daySales.length / 6, 1)); // per hour avg

        let level: BusyForecast["level"] = "quiet";
        if (avg > 40) level = "very busy";
        else if (avg > 25) level = "busy";
        else if (avg > 15) level = "moderate";

        return {
            label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayNames[day],
            level,
            expectedSales: avg,
        };
    });
}

// --- CUSTOMER AI: Suggestions ---
export type CustomerSuggestion = {
    type: "popular" | "deal" | "combo";
    title: string;
    description: string;
    itemIds: string[];
    savings?: number;
};

export function getCustomerSuggestions(cartItemIds: string[]): CustomerSuggestion[] {
    const suggestions: CustomerSuggestion[] = [];

    // Most popular items
    const popularity = SALES_DATA.reduce<Record<string, number>>((acc, r) => {
        acc[r.itemId] = (acc[r.itemId] || 0) + r.quantity;
        return acc;
    }, {});
    const topItem = Object.entries(popularity).sort((a, b) => b[1] - a[1])[0];

    if (topItem && !cartItemIds.includes(topItem[0])) {
        const name = SALES_DATA.find((r) => r.itemId === topItem[0])?.itemName;
        suggestions.push({
            type: "popular",
            title: `🔥 Most Popular: ${name}`,
            description: "Our best-seller — customers love it!",
            itemIds: [topItem[0]],
        });
    }

    // Combo suggestion: burger + fries + soda
    const hasburger = cartItemIds.includes("1");
    const hasFries = cartItemIds.includes("2");
    const hasSoda = cartItemIds.includes("3");

    if (!hasburger || !hasFries || !hasSoda) {
        suggestions.push({
            type: "combo",
            title: "🍔 Classic Combo Deal",
            description: "Add Cheeseburger + Fries + Soda and save £2.00!",
            itemIds: ["1", "2", "3"],
            savings: 2.0,
        });
    }

    // Afternoon sweet treat
    const hour = new Date().getHours();
    if (hour >= 14 && !cartItemIds.includes("5")) {
        suggestions.push({
            type: "deal",
            title: "🍦 Afternoon Treat",
            description: "Ice cream is trending right now — perfect after your meal!",
            itemIds: ["5"],
        });
    }

    // Mix & match: if they have pizza, suggest salad
    if (cartItemIds.includes("4") && !cartItemIds.includes("6")) {
        suggestions.push({
            type: "combo",
            title: "🥗 Mix & Match",
            description: "Pair your Pizza with a fresh Salad for a balanced meal.",
            itemIds: ["4", "6"],
        });
    }

    return suggestions.slice(0, 3);
}
