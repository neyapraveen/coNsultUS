import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { purple, grey, yellow, black, white } from "../../components/Constants";

const PastAppointments = () => {
  // Fake data for past appointments
  const pastAppointments = [
    {
      professor: "John Doe",
      student: "Alice Smith",
      date: "June 1, 2023",
      time: "10:00 AM",
      mode: "In Person",
      duration: "1 hour",
    },
    {
      professor: "Jane Smith",
      student: "Bob Johnson",
      date: "June 5, 2023",
      time: "2:30 PM",
      mode: "Online",
      duration: "45 minutes",
    },
    {
      professor: "David Brown",
      student: "Emily Davis",
      date: "June 10, 2023",
      time: "9:00 AM",
      mode: "In Person",
      duration: "1.5 hours",
    },
    {
      professor: "Sarah Green",
      student: "Michael Wilson",
      date: "June 15, 2023",
      time: "4:00 PM",
      mode: "Online",
      duration: "30 minutes",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Past Consultation Appointments</Text>
      {pastAppointments.length === 0 ? (
        <Text style={styles.placeholder}>No past appointments found</Text>
      ) : (
        pastAppointments.map((appointment, index) => (
          <View style={styles.appointmentContainer} key={index}>
            <Text style={[styles.title, styles.bold]}>Professor:</Text>
            <Text style={styles.text}>{appointment.professor}</Text>

            <Text style={[styles.title, styles.bold]}>Student:</Text>
            <Text style={styles.text}>{appointment.student}</Text>

            <Text style={[styles.title, styles.bold]}>Date:</Text>
            <Text style={styles.text}>{appointment.date}</Text>

            <Text style={styles.title}>Time:</Text>
            <Text style={styles.text}>{appointment.time}</Text>

            <Text style={styles.title}>Mode:</Text>
            <Text style={styles.text}>{appointment.mode}</Text>

            <Text style={styles.title}>Duration:</Text>
            <Text style={styles.text}>{appointment.duration}</Text>

            {index < pastAppointments.length - 1 && (
              <View style={styles.separator} />
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 10,
    color: yellow,
  },
  placeholder: {
    fontSize: 16,
    color: grey,
    marginBottom: 20,
  },
  appointmentContainer: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
    color: purple,
  },
  text: {
    fontSize: 16,
    color: black,
  },
  separator: {
    height: 1,
    backgroundColor: grey,
    marginVertical: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default PastAppointments;
