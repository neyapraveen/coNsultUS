import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Agenda } from "react-native-calendars";
import BookingContext from "../../components/BookingContext";
import { purple, grey, white, yellow, black } from "../../components/Constants";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../../firebase";
import firebase from "firebase/compat";

function formatDate(date) {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return year + "-" + month + "-" + day;
}

const CalendarScreen = () => {
  const navigation = useNavigation();
  const { selectedDate, selectedTime, selectedStaff, selectedModule } =
    useContext(BookingContext);
  const [items, setItems] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  // Fetch the user's data from Firebase
  const currentUser = auth.currentUser;
  const email = currentUser.email;

  useEffect(() => {
    const unsubscribe = fetchConsultationRequests();

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const fetchConsultationRequests = () => {
    try {
      const consultationRef = db.collection("consultationRequests");
      const query = consultationRef.where("Email", "==", currentUser.email);

      // Listen for changes in the Firestore collection
      return query.onSnapshot((snapshot) => {
        const newItems = {};

        snapshot.forEach((doc) => {
          const data = doc.data();
          const date = formatDate(data.Time.toDate());
          const time = data.Time.toDate().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const event = {
            text: `${time} ${data.Staff} (${data.Module.id})`,
            staff: data.Staff,
            isCancelled: data.Status === "rejected",
            key: doc.id,
            status: data.Status,
          };

          if (!newItems[date]) {
            newItems[date] = [];
          }

          newItems[date].push(event);
        });

        setItems(newItems);
      });
    } catch (error) {
      console.error("Error fetching consultation requests: ", error);
    }
  };

  const handleCancelPress = async (item) => {
    Alert.alert(
      "Confirmation",
      `Are you sure you want to cancel your meeting with ${item.staff}?`,
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              // Update the Status to "rejected" in Firestore
              const consultationRef = db.collection("consultationRequests");
              const docRef = consultationRef.doc(item.key);
              const doc = await docRef.get();

              if (!doc.exists) {
                console.error("Document not found! id:", item.id);
                return;
              }

              await docRef.update({ Status: "rejected" });

              // Update the event's appearance to show it as cancelled
              item.isCancelled = true;
              item.status = "rejected";
              Alert.alert("Booking cancelled");
              console.log("Booking ", item.key, " cancelled");
              renderItem(item);
              navigation.navigate("Home");
            } catch (error) {
              console.error("Error cancelling booking: ", error);
            }
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };

  const renderEmptyData = () => {
    return (
      <View style={styles.emptyDataContainer}>
        <Text style={styles.emptyDataText}>No events for this date</Text>
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <View
        style={[
          styles.eventContainer,
          {
            backgroundColor:
              item.status == "rejected"
                ? grey
                : item.status == "accepted"
                ? yellow
                : purple,
          },
        ]}
      >
        <Text
          style={[
            styles.eventText,
            { color: item.isCancelled ? black : white },
          ]}
        >
          {item.text}
        </Text>
        {item.isCancelled ? (
          <Text style={styles.cancelledText}>Cancelled</Text>
        ) : (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelPress(item)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <Agenda
      items={items}
      selected={selectedDate}
      renderItem={renderItem}
      renderEmptyData={renderEmptyData}
      theme={{
        todayTextColor:
          selectedDate !== moment().format("YYYY-MM-DD") ? purple : "#FFFFFF",
        selectedDayBackgroundColor: purple,
        dotColor: purple,
        agendaDayTextColor: black,
        agendaDayNumColor: black,
        agendaTodayColor: black,
        agendaKnobColor: purple,
      }}
    />
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eventText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyDataText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  cancelButton: {
    backgroundColor: "pink",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default CalendarScreen;
