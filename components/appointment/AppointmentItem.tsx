import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import colors from "../../assets/colors";

const AppointmentItem = (props) => {
  const { style, navigation, appointment } = props;
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() =>
        navigation.navigate("Appointment", { appointment: appointment })
      }
    >
      <View style={{ marginRight: 15 }}>
        <Avatar
          size="medium"
          source={{
            uri: appointment.imageURI,
          }}
        />
      </View>

      <View>
        <Text style={styles.title}>{appointment.title}</Text>
        <Text style={styles.time}>{appointment.time}</Text>
      </View>
      <View>
        <Text style={styles.location}>
          {appointment.city}, {appointment.state}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Location", { appointment: appointment })
          }
          style={styles.locationBtn}
        >
          <Text style={styles.locationTxt}>Location</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentItem;
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    marginHorizontal: 22,
    marginVertical: 10,
  },
  title: {
    color: colors.text.darkGray,

    fontSize: 18,
    letterSpacing: -0.5,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  time: {
    color: colors.text.darkGray,
  },
  location: {
    color: colors.text.darkGray,
    fontSize: 10,
    position: "absolute",
    left: 80,
    top: 0
  },

  locationBtn: {
    alignSelf: "flex-end",
    position: 'absolute',
    left: 90,
    bottom: 0
  },
  locationTxt: {
    color: "black",
    fontWeight: "normal",
    fontSize: 15,
    lineHeight: 15,
    textDecorationLine: "underline",
  },
});
