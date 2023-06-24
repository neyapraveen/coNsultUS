import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { grey, purple, yellow, white, black } from "../../components/Constants";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

function formatDate(date) {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return year + "-" + month + "-" + day;
}

const OfficeHoursScreen = () => {
  /* Constants */
  const navigation = useNavigation();

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
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  const today = new Date();
  const minDate = format(today, "yyyy-MM-dd");

  useEffect(() => {
    // Check if at least one date and one time is selected
    if (Object.keys(selectedDates).length > 0 && selectedTimes.length > 0) {
      setIsConfirmDisabled(false);
    } else {
      setIsConfirmDisabled(true);
    }
  }, [selectedDates, selectedTimes]);

  const handleConfirm = () => {
    if (!isConfirmDisabled) {
      navigation.navigate("Dashboard");
    } else {
      // Show warning message
      console.log("Please select at least one date and one time.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Select/Edit Available Office Hours
          </Text>
        </View>
      </>

      <ScrollView>
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
              selectedDayBackgroundColor: yellow,
              selectedDayTextColor: white,
              todayTextColor: purple,
              arrowColor: purple,
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
                      ? yellow
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

        {/* Continuation Prompt */}

        <TouchableOpacity
          onPress={handleConfirm}
          style={[
            styles.confirmButton,
            { backgroundColor: isConfirmDisabled ? "grey" : purple },
          ]}
          disabled={isConfirmDisabled}
        >
          <Text style={styles.confirmButtonText}>Confirm Selections</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: purple,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: white,
  },
  confirmButton: {
    backgroundColor: purple,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    paddingVertical: 10,
    marginVertical: 5,
  },
  confirmButtonText: {
    color: white,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default OfficeHoursScreen;
