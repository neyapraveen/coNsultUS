import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import { grey, purple, yellow, black, white } from "../../components/Constants";

const CalendarViewScreen = () => {
  const agendaItems = {
    "2023-07-19": [{ name: "John Doe", time: "10:00 AM" }],
    "2023-07-22": [{ name: "Jane Smith", time: "02:00 PM" }],
    "2023-07-02": [{ name: "Max Lee", time: "2:00 PM" }],
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
    color: "black",
    fontSize: 16,
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
});

export default CalendarViewScreen;
