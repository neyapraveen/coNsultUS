import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useNavigation } from "@react-navigation/native";
import BookingContext from "../components/BookingContext";

function formatDate(date) {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return year + "-" + month + "-" + day;
}

const BookingScreen = () => {
  const navigation = useNavigation();
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedStaff,
    setSelectedStaff,
    selectedModule,
    setSelectedModule,
  } = useContext(BookingContext);
  const [selectedSession, setSelectedSession] = useState([]);
  const [selectedType, setSelectedType] = useState([]);

  const handleConfirmation = () => {
    if (
      selectedDate &&
      selectedTime.length > 0 &&
      selectedStaff &&
      selectedModule
    ) {
      setSelectedDate("");
      setSelectedTime([]);
      setSelectedStaff("");
      setSelectedModule("");
      navigation.navigate("Calendar");
    } else {
      console.log("Please select all the required fields");
    }
  };

  const times = [
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
      id: "1500",
      time: "3:00PM",
    },
    {
      id: "1600",
      time: "4:00PM",
    },
  ];

  const session = [
    {
      id: "0",
      name: "Online",
    },
    {
      id: "1",
      name: "In-Person",
    },
  ];

  const type = [
    {
      id: "2",
      name: "Individual",
    },
    {
      id: "3",
      name: "Group",
    },
  ];

  let startDate = new Date();
  startDate.setDate(startDate.getDate() + 2);
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 14);

  return (
    <>
      <SafeAreaView>
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Booking remarks
        </Text>
        <TextInput
          style={{
            padding: 40,
            borderColor: "grey",
            borderWidth: 0.7,
            paddingVertical: 80,
            borderRadius: 9,
            margin: 10,
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Choose a date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={startDate}
          endDate={endDate}
          onSelectedDateChange={(date) => setSelectedDate(formatDate(date))}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#F4D79A"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Choose a time
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={() => setSelectedTime(item.time)}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      backgroundColor: "#F4D79A",
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      backgroundColor: "#ececec",
                    }
              }
            >
              <Text
                style={
                  selectedTime.includes(item.time)
                    ? { color: "white" }
                    : { color: "black" }
                }
              >
                {item.time}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Choose a session type
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {session.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={() => setSelectedSession(item.name)}
              style={
                selectedSession.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      backgroundColor: "#F4D79A",
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      backgroundColor: "#ececec",
                    }
              }
            >
              <Text
                style={
                  selectedSession.includes(item.name)
                    ? { color: "white" }
                    : { color: "black" }
                }
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Choose individual or group booking
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {type.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={() => setSelectedType(item.name)}
              style={
                selectedType.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      backgroundColor: "#F4D79A",
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      backgroundColor: "#ececec",
                    }
              }
            >
              <Text
                style={
                  selectedType.includes(item.name)
                    ? { color: "white" }
                    : { color: "black" }
                }
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      {selectedDate &&
        selectedTime.length > 0 &&
        selectedStaff &&
        selectedModule && (
          <Pressable
            style={{
              backgroundColor: "#7072d5",
              padding: 10,
              marginBottom: 30,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                Meeting with {selectedStaff} ({selectedModule})
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "300",
                  color: "#F4D79A",
                  marginVertical: 6,
                }}
              >
                Make sure to double check booking info!
              </Text>
            </View>

            <Pressable onPress={handleConfirmation}>
              <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>
                Confirm
              </Text>
            </Pressable>
          </Pressable>
        )}
    </>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
