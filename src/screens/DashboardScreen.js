import React, { useEffect, useState, useContext } from "react";
import {
View,
Text,
TextInput,
FlatList,
TouchableOpacity,
StyleSheet,
ActivityIndicator,
Image,
Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import api from "../api";
import { ThemeContext } from "../ThemeContext";

export default function DashboardScreen({ navigation }) {
const { darkTheme, toggleTheme } = useContext(ThemeContext);

const [todos, setTodos] = useState([]);
const [title, setTitle] = useState("");
const [username, setUsername] = useState("");
const [loading, setLoading] = useState(false);
const [menuVisible, setMenuVisible] = useState(false);
const [profileImage, setProfileImage] = useState(null);
const [tempImage, setTempImage] = useState(null);

useEffect(() => {
(async () => {
const user = await AsyncStorage.getItem("username");
if (!user) return navigation.replace("Login");
setUsername(user);
fetchTodos(user);
})();
}, []);

const fetchTodos = async (user) => {
try {
setLoading(true);
const res = await api.get(`/todos?username=${user}`);
setTodos(res.data);
} catch (e) {
console.log(e.response?.data || e.message);
alert("Error fetching todos");
} finally {
setLoading(false);
}
};

const addTodo = async () => {
if (!title.trim()) return alert("Enter todo");
try {
await api.post(`/todos?username=${username}`, { title });
setTitle("");
fetchTodos(username);
} catch (e) {
alert("Error adding todo");
}
};

const toggleTodo = async (id) => {
try {
await api.post(`/todos/${id}/complete?username=${username}`);
fetchTodos(username);
} catch (e) {
alert("Error updating todo");
}
};

const logout = async () => {
await AsyncStorage.removeItem("username");
navigation.replace("Login");
};

const pickImage = async () => {
let result = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.Images,
quality: 1,
allowsEditing: true,
aspect: [1, 1],
});
if (!result.canceled && result.assets?.length > 0) {
setTempImage(result.assets[0].uri);
}
};

const saveProfileImage = () => {
setProfileImage(tempImage);
setTempImage(null);
setMenuVisible(false);
};

const cancelProfileImage = () => {
setTempImage(null);
setMenuVisible(false);
};

return (
<View style={[styles.container, { backgroundColor: darkTheme ? "#111" : "#F9FAFB" }]}>
{/* HEADER */} <View style={styles.header}>
<Text style={[styles.heading, { color: darkTheme ? "#fff" : "#111827" }]}>
Hello, {username}  Your ToDo List</Text>

```
    <View style={styles.headerRight}>
      {/* Theme icon always visible */}
      <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
        <Ionicons
          name={darkTheme ? "sunny-outline" : "moon-outline"}
          size={28}
          color={darkTheme ? "#FFD700" : "#333"}
        />
      </TouchableOpacity>

      {/* Profile Picture */}
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : { uri: "https://i.pravatar.cc/150?img=12" }
          }
          style={styles.profilePic}
        />
      </TouchableOpacity>

      {/* Logout icon */}
      <TouchableOpacity onPress={logout} style={{ marginLeft: 12 }}>
        <Ionicons
          name="log-out-outline"
          size={28}
          color={darkTheme ? "#ff6666" : "red"}
        />
      </TouchableOpacity>
    </View>
  </View>

  {/* Profile Dropdown Modal */}
 <Modal
  visible={menuVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setMenuVisible(false)}
>
  <View style={styles.centeredModalWrap}>
    <View style={[styles.centerBox, { backgroundColor: darkTheme ? "#1e1e1e" : "#fff" }]}>

      {tempImage ? (
        <>
          <Image source={{ uri: tempImage }} style={styles.cropImage} />

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.saveBigBtn} onPress={saveProfileImage}>
              <Text style={styles.saveBigBtnText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBigBtn} onPress={cancelProfileImage}>
              <Text style={styles.cancelBigBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={pickImage}>
            <Text style={[styles.dropdownItem, { color: darkTheme ? "#fff" : "#111" }]}>
              Change Profile Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={cancelProfileImage} style={{ marginTop: 10 }}>
            <Text style={[styles.dropdownItem, { color: "red", textAlign: "center" }]}>
              Close
            </Text>
          </TouchableOpacity>
        </>
      )}

    </View>
  </View>
</Modal>


  {/* ADD TODO */}
  <View style={styles.addRow}>
    <TextInput
      placeholder="New todo"
      placeholderTextColor={darkTheme ? "#888" : "#999"}
      value={title}
      onChangeText={setTitle}
      style={[styles.input, { backgroundColor: darkTheme ? "#222" : "#fff", color: darkTheme ? "#fff" : "#111" }]}
    />
    <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
      <Text style={styles.addBtnText}>Add</Text>
    </TouchableOpacity>
  </View>

  {/* TODO LIST */}
  {loading ? (
    <ActivityIndicator size="large" color={darkTheme ? "#fff" : "#2563EB"} />
  ) : (
    <FlatList
      data={todos}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.item, { backgroundColor: darkTheme ? "#222" : "#fff" }]}
          onPress={() => toggleTodo(item.id)}
        >
          <Text
            style={[
              styles.itemText,
              { color: darkTheme ? "#fff" : "#111" },
              item.completed && styles.completed,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  )}
</View>


);
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
heading: { fontSize: 22, fontWeight: "700" },
headerRight: { flexDirection: "row", alignItems: "center" },
profilePic: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: "#eee" },
modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.2)" },
dropdown: { position: "absolute", top: 80, right: 18, width: 120, padding: 10, borderRadius: 12, elevation: 10 },
dropdownItem: { fontSize: 12, paddingVertical: 10 },
tempImage: { width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginBottom: 12 },
saveBtn: { flex: 1, backgroundColor: "#2563EB", paddingVertical: 10, borderRadius: 10, marginRight: 6, alignItems: "center" },
saveBtnText: { color: "#fff", fontWeight: "600" },
cancelBtn: { flex: 1, backgroundColor: "#aaa", paddingVertical: 10, borderRadius: 10, marginLeft: 6, alignItems: "center" },
cancelBtnText: { color: "#fff", fontWeight: "600" },
addRow: { flexDirection: "row", marginBottom: 16, alignItems: "center" },
input: { flex: 1, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB", marginRight: 10, maxWidth:300 },
addBtn: { backgroundColor: "#2563EB", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, alignItems: "center" },
addBtnText: { color: "#fff", fontWeight: "600" },
item: { padding: 14, borderRadius: 12, marginBottom: 12, elevation: 3 },
itemText: { fontSize: 16 },
completed: { textDecorationLine: "line-through", color: "gray" },
centeredModalWrap: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.4)",
},

centerBox: {
  width: 280,
  padding: 20,
  borderRadius: 20,
  elevation: 10,
  alignItems: "center",
},

cropImage: {
  width: 130,
  height: 130,
  borderRadius: 65,
  marginBottom: 15,
},

btnRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  marginTop: 10,
},

saveBigBtn: {
  flex: 1,
  backgroundColor: "#2563EB",
  paddingVertical: 12,
  borderRadius: 12,
  marginRight: 5,
  alignItems: "center",
},

cancelBigBtn: {
  flex: 1,
  backgroundColor: "#aaa",
  paddingVertical: 12,
  borderRadius: 12,
  marginLeft: 5,
  alignItems: "center",
},

saveBigBtnText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 16,
},

cancelBigBtnText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 16,
},

});
