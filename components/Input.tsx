import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import colors from "../assets/colors";
import { Ionicons } from "@expo/vector-icons";

const Input = (props) => {
  const [isHiddenPassword, setHiddenPassword] = useState(props.isPassword);
  const [text, onChangeText] = useState("");
  const togglePasswordVisibility = () => {
    setHiddenPassword(!isHiddenPassword);
  };
  return (
    <View style={[props.style, styles.root]}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        secureTextEntry={isHiddenPassword}
        autoCapitalize="none"
        textAlign="left"
        placeholderTextColor={colors.button.secondary}
        onChangeText={onChangeText}
      />
      {props.isPassword && (
        <Ionicons
          onPress={togglePasswordVisibility}
          name={isHiddenPassword ? "ios-eye-off" : "ios-eye"}
          size={24}
          color={colors.button.secondary}
          style={styles.hideIcon}
        />
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    borderRadius: 30,
    paddingVertical: 23,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    left: 32,
    color: colors.text.darkGray,
    fontWeight: "bold",
    fontSize: 14,
    width: '100%',
    height: '100%'
  },
  hideIcon: {
    position: "absolute",
    alignSelf: "center",
    right: 22,
  },
});
