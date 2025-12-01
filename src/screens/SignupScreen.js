import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ThemeContext } from "../ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen({ navigation }) {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    if (!username || !password) return alert("Enter username & password");
    navigation.replace("Login");
  };

  return (
    <View style={[styles.container, { backgroundColor: darkTheme ? "#111" : "#F9FAFB" }]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeIcon}>
        <Ionicons
          name={darkTheme ? "sunny-outline" : "moon-outline"}
          size={28}
          color={darkTheme ? "#FFD700" : "#333"}
        />
      </TouchableOpacity>

      <Text style={[styles.heading, { color: darkTheme ? "#fff" : "#111827" }]}>Signup</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={darkTheme ? "#888" : "#999"}
        value={username}
        onChangeText={setUsername}
        style={[styles.input, { backgroundColor: darkTheme ? "#222" : "#fff", color: darkTheme ? "#fff" : "#111" }]}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={darkTheme ? "#888" : "#999"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { backgroundColor: darkTheme ? "#222" : "#fff", color: darkTheme ? "#fff" : "#111" }]}
      />

      <TouchableOpacity style={styles.btn} onPress={signup}>
        <Text style={styles.btnText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={[styles.linkText, { color: darkTheme ? "#aaa" : "#2563EB" }]}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  input: { width: "100%", padding: 10, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: "#E5E7EB",maxWidth:300 },
  btn: { width: "100%", backgroundColor: "#2563EB", padding: 12, borderRadius: 10, alignItems: "center", marginBottom: 12 ,maxWidth:200},
  btnText: { color: "#fff", fontWeight: "600" },
  linkText: { fontSize: 14 },
  themeIcon: { position: "absolute", top: 50, right: 20 },
});
