import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext, useEffect } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useNavigation } from "@react-navigation/native";
import BookingContext from "../../components/BookingContext";
import { db, auth } from "../../firebase";
import firebase from "firebase/compat";

// Function to parse the time string to extract hours and minutes
function parseTime(timeString) {
  const [time, modifier] = timeString.split(" ");
  const [hours, minutes] = time.split(":");

  let parsedHours = parseInt(hours, 10);
  if (modifier === "PM" && parsedHours !== 12) {
    parsedHours += 12;
  } else if (modifier === "AM" && parsedHours === 12) {
    parsedHours = 0;
  }
  return { hours: parsedHours, minutes: parseInt(minutes, 10) };
}

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
        backgroundColor: "#7072d5",
        padding: 10,
        borderRadius: 7,
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>
        Confirm
      </Text>
    </Pressable>
  );
};

const BookingScreen = () => {
  const navigation = useNavigation();
  const {
    selectedStaff,
    setSelectedStaff,
    selectedModule,
    setSelectedModule,
    setSelectedDate,
    setSelectedTime,
    selectedDate,
    selectedTime,
  } = useContext(BookingContext);
  const [name, setName] = useState("");
  const [dateChoice, setDateChoice] = useState([]);
  const [timeChoice, setTimeChoice] = useState([]);
  const [selectedSession, setSelectedSession] = useState([]);
  const [selectedType, setSelectedType] = useState([]);

  // Fetch the user's data from Firebase
  const currentUser = auth.currentUser;
  const email = currentUser.email;

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .where("Email", "==", email)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const userData = doc.data();
          setName(userData.Name);
        });
      });

    return () => unsubscribe();
  }, []);

  const handleConfirmation = () => {
    setSelectedDate(dateChoice);
    setSelectedTime(timeChoice);

    if (
      selectedDate &&
      selectedTime.length > 0 &&
      selectedStaff &&
      selectedModule
    ) {
      // Create a new document in the "consultationRequests" collection
      const consultationRef = db.collection("consultationRequests");

      // Parse selectedTime to extract hours and minutes
      const { hours, minutes } = parseTime(selectedTime);

      // Combine selectedDate, hours, and minutes to create a new Date object
      const selectedDateTime = new Date(
        `${selectedDate}T${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:00`
      );

      consultationRef
        .add({
          Module: firebase.firestore().doc(`/modules/${selectedModule}`),
          Past: false,
          Status: "",
          Student: name,
          Time: firebase.firestore.Timestamp.fromDate(selectedDateTime),
          Email: email, // Replace this with the actual user's email or get it from the authentication data
          Staff: selectedStaff,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          console.log(selectedDateTime, selectedModule, selectedStaff, email);
          setSelectedDate("");
          setSelectedTime([]);
          setSelectedStaff("");
          setSelectedModule("");
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      console.log("Please wait for event to show up in calendar");
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
  startDate.setDate(startDate.getDate() + 1);
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 14);

  return (
    <>
      <ScrollView style={{ flex: 1, marginTop: 30 }}>
        <SafeAreaView>
          {/* Top Section */}
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Image
                source={require("../../assets/logo.png")}
                style={{ width: 50, height: 50 }}
              />
              <View>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  coNsultUS
                </Text>
                <Text>SYNC, THINK & LINK</Text>
              </View>
            </View>
          </>

          {/* Booking Remarks */}
          <>
            <Text
              style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
            >
              Booking remarks
            </Text>
            <TextInput
              style={{
                padding: 40,
                paddingTop: 20,
                paddingLeft: 20,
                borderColor: "grey",
                borderWidth: 0.7,
                paddingVertical: 40,
                borderRadius: 9,
                margin: 10,
                textAlignVertical: "top",
              }}
              multiline={true}
              numberOfLines={5}
              placeholder="Enter your booking remarks here"
            />
          </>

          {/* Selecting a Date */}
          <>
            <Text
              style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
            >
              Choose a date
            </Text>
            <HorizontalDatepicker
              mode="gregorian"
              startDate={startDate}
              endDate={endDate}
              onSelectedDateChange={(date) => setDateChoice(formatDate(date))}
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
          </>

          {/* Selecting a Time */}
          <>
            <Text
              style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
            >
              Choose a time
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {times.map((item, index) => (
                <Pressable
                  key={item.id}
                  onPress={() => setTimeChoice(item.time)}
                  style={
                    timeChoice.includes(item.time)
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
                      timeChoice.includes(item.time)
                        ? { color: "white" }
                        : { color: "black" }
                    }
                  >
                    {item.time}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>

          {/* Selecting a Session Mode */}
          <>
            <Text
              style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
            >
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
          </>

          {/* Selecting a Session Type */}
          <>
            <Text
              style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
            >
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
          </>
        </SafeAreaView>

        {/* Continuation Prompt */}
        <>
          {dateChoice &&
            timeChoice.length > 0 &&
            selectedStaff &&
            selectedModule && (
              <Pressable
                style={{
                  backgroundColor: "#F4D79A",
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
                  <Text
                    style={{ fontSize: 17, fontWeight: "600", color: "white" }}
                  >
                    Meeting with {selectedStaff} ({selectedModule})
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "300",
                      color: "#7072d5",
                      marginVertical: 6,
                    }}
                  >
                    Make sure to double check booking info!
                  </Text>
                </View>

                <ConfirmButton onPress={handleConfirmation} />
              </Pressable>
            )}
        </>
      </ScrollView>
    </>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
