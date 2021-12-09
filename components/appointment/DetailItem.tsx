import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const DetailItem = ({ title, content }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.content}
        multiline={true}
        numberOfLines={10}
        // onChangeText={(text) => this.setState({ text })}
        value={content}
        editable={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export default DetailItem;
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    marginBottom: 50,
    alignItems: "center",
  },
  title: {
    position: "absolute",
    left: 30,
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  content: {
    position: "absolute",
    left: "50%",
  },
});
