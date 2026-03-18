import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeSubtitle}>
          Order delicious food from our menu
        </Text>
      </View>

      {/* Featured Item Card */}
      <View style={styles.featuredCard}>
        <Text style={styles.featuredIcon}>🍔</Text>
        <Text style={styles.featuredName}>Cheese Burger</Text>
        <Text style={styles.featuredPrice}>£5.99</Text>
        <Text style={styles.featuredDesc}>Classic favorite</Text>
      </View>

      {/* Call to Action */}
      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => router.push("/menu")}
        >
          <Text style={styles.orderButtonText}>Start Ordering</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dealsButton}
          onPress={() => router.push("/menuDeals" as any)}
        >
          <Text style={styles.dealsButtonText}>View Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.staffButton}
          onPress={() => router.push("/employeeLogin" as any)}
        >
          <Text style={styles.staffButtonText}>Staff Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
    padding: 20,
  },

  welcomeSection: {
    alignItems: "center",
    marginTop: 40,
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },

  welcomeTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  welcomeSubtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  featuredCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginVertical: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  featuredIcon: {
    fontSize: 72,
    marginBottom: 12,
  },

  featuredName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  featuredPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff9800",
    marginBottom: 6,
  },

  featuredDesc: {
    fontSize: 14,
    color: "#999",
  },

  ctaSection: {
    gap: 12,
    marginBottom: 40,
  },

  orderButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#ff9800",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  orderButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  dealsButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ff9800",
  },

  dealsButtonText: {
    color: "#ff9800",
    fontSize: 16,
    fontWeight: "bold",
  },

  staffButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  staffButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
