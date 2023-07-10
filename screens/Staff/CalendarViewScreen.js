import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import { db } from "../../firebase";
import { grey, yellow, purple, white, black } from "../../components/Constants";

const CalendarViewScreen = () => {
  const [agendaItems, setAgendaItems] = useState({});

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
        renderItem={(item) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.time}</Text>
          </View>
        )}
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
  },
  itemText: {
    color: black,
    fontSize: 16,
  },
});

export default CalendarViewScreen;
