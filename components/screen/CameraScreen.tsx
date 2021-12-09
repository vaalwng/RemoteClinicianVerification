import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainCamera from "../camera/MainCamera";

const CameraScreen = (props) => {
  const { navigation, route } = props;
  const { appointment } = route.params;
  return <MainCamera navigation={navigation} appointment={appointment} />;
};

export default CameraScreen;

const styles = StyleSheet.create({});
