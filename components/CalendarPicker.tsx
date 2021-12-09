import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarPicker = ({ onSelectDate, appointments, style }) => {
  const getCurrentDate = () => {
    var day = new Date().getDate();

    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var dateString = year + "-" + month + "-";
    dateString += day < 10 ? "0" + day : day;

    
    return dateString;
  };
  
  // console.log(getCurrentDate());
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  const markedDates = {
    [selectedDate]: { selected: true },
  };

  appointments.map((appointment) => {
    if (appointment.date == selectedDate) {
      markedDates[appointment.date] = {
        marked: true,
        selected: true,
      };
    } else {
      markedDates[appointment.date] = {
        marked: true,
      };
    }
  });

  return (
    <View style={style}>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => {
          console.log("selected day: ", day);

          // console.log(appointmentSelected);
          setSelectedDate(day.dateString);
          onSelectDate(day.dateString);
        }}
        theme={{
          selectedDayBackgroundColor: "#00adf5",
          arrowColor: "#00adf5",
          dotColor: "#00adf5",
          todayTextColor: "#00adf5",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
};

export default CalendarPicker;
