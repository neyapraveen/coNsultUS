import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { format } from "date-fns";
import { grey, purple, yellow, white, black } from "../../components/Constants";
import { G } from "react-native-svg";

function formatDate(date) {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return year + "-" + month + "-" + day;
}

const ConfirmButton = ({ onPress }) => {
  return (
    <Pressable
      style={{
        backgroundColor: { purple },
        padding: 10,
        borderRadius: 7,
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 20, fontWeight: "800", color: white }}>
        Confirm
      </Text>
    </Pressable>
  );
};

const OfficeHoursScreen = () => {
  const times = [
    {
      id: "0800",
      time: "08:00AM",
    },
    {
      id: "0900",
      time: "09:00AM",
    },
    {
      id: "1000",
      time: "10:00AM",
    },
    {
      id: "1100",
      time: "11:00AM",
    },
    {
      id: "1200",
      time: "12:00PM",
    },
    {
      id: "1300",
      time: "1:00PM",
    },
    {
      id: "1400",
      time: "2:00PM",
    },
    {
      id: "1500",
      time: "3:00PM",
    },
    {
      id: "1600",
      time: "4:00PM",
    },
    {
      id: "1700",
      time: "5:00PM",
    },
  ];

  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTimes, setSelectedTimes] = useState([]);

  const today = new Date();
  const minDate = format(today, "yyyy-MM-dd");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Select/Edit Available Office Hours</Text>
      </View>

      {/* Selecting a Date */}
      <>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          Choose date(s)
        </Text>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: "gray",
            height: 350,
            marginHorizontal: 10,
            marginTop: 5,
            borderRadius: 10,
          }}
          markedDates={selectedDates}
          onDayPress={(day) => {
            const { dateString } = day;
            const selected = !selectedDates[dateString];
            const updatedDates = {
              ...selectedDates,
              [dateString]: { selected },
            };
            setSelectedDates(updatedDates);
          }}
          markingType="multi-dot"
          minDate={minDate}
          theme={{
            calendarBackground: grey,
            selectedDayBackgroundColor: purple,
            selectedDayTextColor: white,
            todayTextColor: purple,
            arrowColor: yellow,
          }}
        />
      </>

      {/* Selecting a Time */}
      <>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          Choose time(s)
        </Text>
        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
          {times.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={() => {
                if (selectedTimes.includes(item.time)) {
                  setSelectedTimes(
                    selectedTimes.filter((time) => time !== item.time)
                  );
                } else {
                  setSelectedTimes([...selectedTimes, item.time]);
                }
              }}
              style={[
                {
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  backgroundColor: selectedTimes.includes(item.time)
                    ? purple
                    : grey,
                },
                {
                  width: "45%",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text
                style={
                  selectedTimes.includes(item.time)
                    ? { color: white }
                    : { color: black }
                }
              >
                {item.time}
              </Text>
            </Pressable>
          ))}
        </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: yellow,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: white,
  },
});

export default OfficeHoursScreen;
