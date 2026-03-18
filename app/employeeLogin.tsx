import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { InventoryContext } from "../lib/InventoryContext";

export default function EmployeeLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { loginEmployee } = useContext(InventoryContext);

  const handleLogin = () => {
    if (!password) {
      Alert.alert("Error", "Please enter a password");
      return;
    }

    if (loginEmployee(password)) {
      Alert.alert("Success", "Logged in as Employee");
      router.push("/employeeDashboard" as any);
      setPassword("");
    } else {
      Alert.alert("Error", "Invalid password");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.loginForm}>
        <Text style={styles.title}>Employee Login</Text>
        <Text style={styles.subtitle}>Access inventory management</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter employee password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Demo Password: admin123</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginVertical: 60,
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  loginForm: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fafafa",
  },

  loginButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },

  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },

  backButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },

  infoBox: {
    marginTop: 24,
    padding: 12,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },

  infoText: {
    fontSize: 12,
    color: "#2196F3",
    fontWeight: "500",
  },
});
