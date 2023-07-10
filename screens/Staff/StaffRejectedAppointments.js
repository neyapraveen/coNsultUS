import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { purple, grey, yellow, black } from "../../components/Constants";
import { db } from "../../firebase";

const StaffRejectedAppointments = () => {
  const [rejectedAppointments, setRejectedAppointments] = useState([]);

  useEffect(() => {
    const fetchRejectedAppointments = async () => {
      try {
        const snapshot = await db
          .collection("consultationRequests")
          .where("Status", "==", "rejected")
          .get();
        const appointments = snapshot.docs.map((doc) => doc.data());
        setRejectedAppointments(appointments);
      } catch (error) {
        console.error("Error fetching rejected appointments:", error);
      }
    };

    fetchRejectedAppointments();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Rejected Appointments</Text>
      {rejectedAppointments.length === 0 ? (
        <Text style={styles.placeholder}>No rejected appointments found</Text>
      ) : (
        rejectedAppointments.map((appointment, index) => (
          <View style={styles.appointmentContainer} key={index}>
            <Text style={[styles.title, styles.bold]}>Student:</Text>
            <Text style={styles.text}>{appointment.Student}</Text>

            <Text style={[styles.title, styles.bold]}>Module:</Text>
            <Text style={styles.text}>{appointment.Module.id}</Text>

            <Text style={[styles.title, styles.bold]}>Date & Time:</Text>
            <Text style={styles.text}>
              {appointment.Time.toDate().toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            {index < rejectedAppointments.length - 1 && (
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

export default StaffRejectedAppointments;
