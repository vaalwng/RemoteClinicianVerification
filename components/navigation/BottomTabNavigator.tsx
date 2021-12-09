import React from "react";
import { StyleSheet, Text, View , TouchableOpacity} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/profile/index";
import TaskScreen from "../screen/TaskScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BottomTabNavigator = ({ navigation, route }) => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={28} />
          )
        }}
      />
      <BottomTab.Screen
        name="Task"
        component={TaskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="tasks" color={color} size={22} />
          ),
          
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" color={color} size={20} />
          ),
         }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
