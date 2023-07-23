import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Agenda } from "react-native-calendars";
import { db } from "../../firebase";
import { grey, yellow, purple, white, black } from "../../components/Constants";

const CalendarViewScreen = () => {
  const [agendaItems, setAgendaItems] = useState({});
  const [consultationRequests, setConsultationRequests] = useState([]);

  useEffect(() => {
    const fetchConsultationRequests = async () => {
      try {
        const snapshot = await db
          .collection("consultationRequests")
          .where("Status", "==", "accepted")
          .get();

        const items = {};

        snapshot.forEach((doc) => {
          const data = doc.data();
          const date = data.Time.toDate().toISOString().split("T")[0];

          if (!items[date]) {
            items[date] = [];
          }

          items[date].push({
            id: doc.id, // Add the document ID for reference when canceling
            name: data.Student,
            time: data.Time.toDate().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
          });
        });

        setAgendaItems(items);
      } catch (error) {
        console.error("Error fetching consultation requests:", error);
      }
    };

    fetchConsultationRequests();
  }, []);

  const handleCancelPress = (request) => {
    Alert.alert(
      "Confirmation",
      `Are you sure you want to cancel the consultation with ${request.Student}?`,
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              const docRef = db
                .collection("consultationRequests")
                .doc(request.id);
              const doc = await docRef.get();

              if (!doc.exists) {
                console.log("Consultation request not found", request.id);
                return;
              }

              await docRef.update({
                Status: "rejected",
              });

              const updatedRequests = consultationRequests.filter(
                (r) => r.id !== request.id
              );
              setConsultationRequests(updatedRequests);
              alert("Request Cancelled");
            } catch (error) {
              console.error("Error cancelling consultation request:", error);
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

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>{item.time}</Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelPress(item)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        theme={{
          selectedDayBackgroundColor: purple,
          dotColor: purple,
          agendaDayTextColor: black,
          agendaDayNumColor: black,
          agendaTodayColor: black,
          agendaKnobColor: purple,
        }}
        items={agendaItems}
        renderItem={renderItem}
        renderEmptyData={() => <Text>No items to display</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  itemContainer: {
    backgroundColor: yellow,
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    color: black,
    fontSize: 16,
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

export default CalendarViewScreen;
