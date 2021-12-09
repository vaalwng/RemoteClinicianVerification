import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import LoginScreen from "./components/screen/LoginScreen";

import AppointmentScreen from "./components/screen/AppointmentScreen";
import CameraScreen from "./components/screen/CameraScreen";
import LocationScreen from "./components/screen/LocationScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
import { LogBox } from "react-native";
import BottomTabNavigator from "./components/navigation/BottomTabNavigator";
LogBox.ignoreLogs(["Remote debugger"]);
// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
export default function App() {
  // if (isLogin)
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="App"
          component={BottomTabNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Appointment" component={AppointmentScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // else return <LoginScreen />;
}
