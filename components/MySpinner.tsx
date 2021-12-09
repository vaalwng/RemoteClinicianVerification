import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import colors from "../assets/colors";

const MySpinner = (props) => {
  return (
    
      <Spinner
        visible={props.visible}
        textContent={props.textContent}
        textStyle={styles.text}
        color="black"
      />
   
  );
};

export default MySpinner;

const styles = StyleSheet.create({
 
  text: {
    color: 'black',
  },
});
