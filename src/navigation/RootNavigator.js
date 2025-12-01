import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
const [initialRoute, setInitialRoute] = useState(null);

useEffect(() => {
(async () => {
const user = await AsyncStorage.getItem("username");


  if (user) {
    setInitialRoute("Dashboard");     // already logged in
  } else {
    setInitialRoute("Login");         // no user → login
  }
})();


}, []);

if (!initialRoute) return null; // small splash

return ( <NavigationContainer>
<Stack.Navigator initialRouteName={initialRoute}>
{/* Auth Screens */}
<Stack.Screen
name="Login"
component={LoginScreen}
options={{ headerShown: false }}
/>


    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerShown: false }}
    />

    {/* App Screens */}
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{headerShown:false}}
    />

    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: "Profile" }}
    />
  </Stack.Navigator>
</NavigationContainer>


);
}
