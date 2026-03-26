import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
          style={styles.employeeButton}
          onPress={() => router.push("/employeeLogin" as any)}
        >
          <Text style={styles.employeeButtonText}>Employee Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  welcomeSection: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
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
    marginBottom: 10,
  },

  featuredCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    alignItems: "center",
    marginVertical: 15,
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
    marginBottom: 20,
    paddingHorizontal: 20,
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

  employeeButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#4a90e2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  employeeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
