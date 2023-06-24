import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Agenda } from "react-native-calendars";
import BookingContext from "../../components/BookingContext";
import { purple, grey, white, yellow, black } from "../../components/Constants";
import moment from "moment";

const CalendarScreen = () => {
  const { selectedDate, selectedTime, selectedStaff, selectedModule } =
    useContext(BookingContext);
  const [items, setItems] = useState([]);

  // Function to add an event to the agenda
  const addEventToAgenda = (date, time, moduleName) => {
    setItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[date]) {
        // Check if the event with the same staff already exists
        const existingEventIndex = newItems[date].findIndex(
          (event) => event.staff === selectedStaff
        );
        if (existingEventIndex !== -1) {
          // Replace the existing event
          newItems[date][existingEventIndex] = {
            text: `${time} Meeting with ${selectedStaff} (${moduleName})`,
            staff: selectedStaff,
          };
        } else {
          // Add a new event
          newItems[date].push({
            text: `${time} Meeting with ${selectedStaff} (${moduleName})`,
            staff: selectedStaff,
          });
        }
        // Sort the events by time
        newItems[date].sort((a, b) => {
          if (a.time && b.time) {
            return a.time.localeCompare(b.time);
          }
          return 0;
        });
      } else {
        newItems[date] = [
          {
            text: `${time} Meeting with ${selectedStaff} (${moduleName})`,
            staff: selectedStaff,
          },
        ];
      }
      return newItems;
    });
  };

  useEffect(() => {
    if (selectedDate && selectedTime && selectedModule) {
      addEventToAgenda(selectedDate, selectedTime, selectedModule);
    }
  }, [selectedDate, selectedTime, selectedModule]);

  const renderEmptyData = () => {
    return (
      <View style={styles.emptyDataContainer}>
        <Text style={styles.emptyDataText}>No events for this date</Text>
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <View style={styles.eventContainer}>
        <Text style={styles.eventText}>{item.text}</Text>
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
    backgroundColor: yellow,
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
  },
  eventText: {
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

export default CalendarScreen;
