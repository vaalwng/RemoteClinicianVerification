import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../assets/colors";
const CustomButton = (props) => {
  const { style, title, onPress, backgroundColor, disabled } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{ width: "100%" , opacity: disabled ? 0.2 : 1}}
      
    >
      <View
        style={[
          style,
          styles.root,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.button.primary,
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    borderRadius: 30,
  },
  title: {
    paddingVertical: 22,
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 17,
  },
});
