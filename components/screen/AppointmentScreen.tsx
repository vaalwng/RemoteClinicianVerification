import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import DetailItem from "../appointment/DetailItem";
import CustomButton from "../button/CustomButton";

const AppointmentScreen = (props) => {
  const { navigation, route } = props;
  const { appointment } = route.params;
  const [isCheckIn, setCheckIn] = useState(false);

  const getAllTasks = (tasks) => {
    let str = "";
    tasks.map(t => {
      str += t.title + "\n"
    });
    return str;
  }

  return (
    <View style={styles.root}>
      <Text style={styles.dateTitle}>{appointment.date}</Text>
      <DetailItem title="CHECK-IN TIME" content={appointment.time} />
      <DetailItem
        title="LOCATION"
        content={appointment.address + ", " + appointment.city + ", " + appointment.state}
      />
      <DetailItem title="PATIENT" content={appointment.patient} />
      <DetailItem title="TASK(S)" content={getAllTasks(appointment.tasks)} />
      {/* <CustomButton
        disabled={isCheckIn}
        title="CHECK IN"
        onPress={() => {
          // navigation.navigate("Camera", {appointment : appointment});
          setCheckIn(true);
        }}
      /> */}
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  root: {},
  dateTitle: {
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 80,
    fontSize: 40,
    fontWeight: "bold",
  },
});
