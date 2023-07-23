import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Agenda } from "react-native-calendars";
import BookingContext from "../../components/BookingContext";
import { purple, grey, white, yellow, black } from "../../components/Constants";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const { selectedDate, selectedTime, selectedStaff, selectedModule } =
    useContext(BookingContext);
  const [items, setItems] = useState({});
  // Function to force re-render of Agenda
  const handleForceRerender = () => {
    setAgendaKey(Date.now().toString());
  };

  // Function to add an event to the agenda
  const addEventToAgenda = (date, time, moduleName) => {
    setItems((prevItems) => {
      const newItems = { ...prevItems };

      const event = {
        text: `${time} ${selectedStaff} (${moduleName})`,
        staff: selectedStaff,
        isCancelled: false,
        key: `${date}-${selectedStaff}-${false}`, // Create a unique key
      };

      newItems[date] = [event];

      return newItems;
    });
  };

  useEffect(() => {
    if (selectedDate && selectedTime && selectedModule) {
      addEventToAgenda(selectedDate, selectedTime, selectedModule);
    }
  }, [selectedDate, selectedTime, selectedModule]);

  const handleCancelPress = (item, staff) => {
    Alert.alert(
      "Confirmation",
      `Are you sure you want to cancel your meeting with ${staff}?`,
      [
        {
          text: "Yes",
          onPress: () => {
            item.isCancelled = true;
            handleForceRerender;
            Alert.alert("Booking cancelled");
            navigation.navigate("Home");
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
          { backgroundColor: item.isCancelled ? grey : yellow },
        ]}
        key={item.key}
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
            onPress={() => handleCancelPress(item, item.staff)}
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
