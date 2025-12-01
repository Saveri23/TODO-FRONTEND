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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!username || !password) return alert("Enter username & password");
    await AsyncStorage.setItem("username", username);
    navigation.replace("Dashboard");
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

      <Text style={[styles.heading, { color: darkTheme ? "#fff" : "#111827" }]}>Login</Text>

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

      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={[styles.linkText, { color: darkTheme ? "#aaa" : "#2563EB" }]}>
          Don't have an account? Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  input: { width: "100%",   maxWidth: 300,padding: 10, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: "#E5E7EB" },
  btn: { width: "100%",  maxWidth: 200, backgroundColor: "#2563EB", padding: 12, borderRadius: 10, alignItems: "center", marginBottom: 12 },
  btnText: { color: "#fff", fontWeight: "600" },
  linkText: { fontSize: 14 },
  themeIcon: { position: "absolute", top: 50, right: 20 },
});
