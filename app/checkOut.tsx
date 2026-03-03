import React, { useState, FormEvent, ChangeEvent } from "react";

interface CheckoutForm {
    name: string;
    email: string;
    address: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
}

const CheckOut: React.FC = () => {
    const [form, setForm] = useState<CheckoutForm>({
        name: "",
        email: "",
        address: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // here you could send `form` to a server
        console.log("checkout data", form);
    };

    return (
        <div style={{ maxWidth: 480, margin: "0 auto", padding: 16 }}>
            <h1>Checkout Demo</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Address
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Card number
                    <input
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Expiry
                    <input
                        name="expiry"
                        placeholder="MM/YY"
                        value={form.expiry}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    CVC
                    <input
                        name="cvc"
                        value={form.cvc}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Place order</button>
            </form>

            {submitted && (
                <div style={{ marginTop: 24 }}>
                    <h2>Submitted data</h2>
                    <pre>{JSON.stringify(form, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default CheckOut;