// ProfileScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      const name = await AsyncStorage.getItem("username");
      if (name) setUsername(name);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {/* PROFILE IMAGE */}
      <TouchableOpacity>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=32" }}
          style={styles.bigProfile}
        />
        <Text style={styles.change}>Tap to change</Text>
      </TouchableOpacity>

      {/* USER INFO */}
      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{username}</Text>
      </View>

      {/* Theme switch */}
      <TouchableOpacity style={styles.themeBtn}>
        <Text style={styles.themeText}>Switch Theme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  bigProfile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#ddd",
  },
  change: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 14,
    color: "#555",
  },
  card: {
    backgroundColor: "#f1f1f1",
    padding: 18,
    borderRadius: 12,
    marginTop: 25,
  },
  label: { fontSize: 18, fontWeight: "600" },
  value: { fontSize: 17, marginTop: 5 },
  themeBtn: {
    marginTop: 30,
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  themeText: { color: "#fff", fontSize: 18 },
});
