import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppointmentItem from "../appointment/AppointmentItem";
import CalendarPicker from "../CalendarPicker";

const HomeScreen = ({ navigation }) => {
  const appointments = [
    {
      key: 0,
      title: "BLOOD TEST",
      date: "2021-12-04",
      time: "2:00 PM",
      patient: "Bob Foo",
      location: "Central Health Clinic",
      imageURI:
        "https://www.altusemergency.com/wp-content/uploads/2018/02/Lumberton-1.jpg",
      address: "1500 Main Street",
      city: "Garland",
      state: "TX",
      zipcode: "75041",
      tasks: [
        { key: 0, title: "Blood pressure", time: "5 mins" },
        { key: 1, title: "Blood work", time: "5 mins" },
        { key: 2, title: "Pulse and oxygen level", time: "5 mins" },
        { key: 3, title: "Height and weight", time: "5 mins" },
      ],
    },
    {
      key: 1,
      title: "CHECK UP",
      date: "2021-12-11",
      time: "10:00 AM",
      patient: "Luke Foo",
      location: "UT Dallas Student Health",
      imageURI:
        "https://media.bizj.us/view/img/11817836/utd*900xx1024-768-256-0.jpg",
      address: "800 W Campbell Rd",
      city: "Richardson",
      state: "TX",
      zipcode: "75080",
      tasks: [
        { key: 0, title: "Physical checkup", time: "20 mins" },
        { key: 1, title: "Light physical therapy", time: "30 mins" },
      ],
    },
    {
      key: 2,
      title: "COVID TEST",
      date: "2021-12-11",
      time: "4:00 PM",
      patient: "Bob Foo",
      location: "Central Health Clinic",
      imageURI:
        "https://media.bizj.us/view/img/11817836/utd*900xx1024-768-256-0.jpg",
      address: "1500 Main Street",
      city: "Garland",
      state: "TX",
      zipcode: "75041",
      tasks: [{ key:0,title: "Blood pressure", time: "10 mins" }],
    },
  ];
  const [selectedDate, setSelectedDate] = useState("");

  const handleSelect = (date) => {
    setSelectedDate(date);
  };

  // console.log(selectedDate);

  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View style={styles.card}>
        <CalendarPicker
          onSelectDate={handleSelect}
          appointments={appointments}
          style={styles.calendar}
        />

        <Text style={styles.appointmentText}>APPOINTMENTS</Text>
        {appointments.map((appointment) => {
          if (appointment.date == selectedDate)
            return (
              <AppointmentItem
                key={appointment.key}
                appointment={appointment}
                navigation={navigation}
              />
            );
        })}
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 30,
    paddingBottom: 30,
  },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // elevation: 5,
    // backgroundColor : "#0000" // invisible color
  },
  appointmentText: {
    fontSize: 18,
    marginHorizontal: 22,
    marginTop: 20,
    marginBottom: 40,
  },
  calendar: {
    marginTop: 10,
  },
  div: {
    height: 1,
    width: "100%",
    marginVertical: 25,
    backgroundColor: "#171717",
    opacity: 0.2,
  },
});
