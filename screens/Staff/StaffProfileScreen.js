import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { grey, purple, black, yellow, white } from "../../components/Constants";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase";

const StaffProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");

  const resetConsultationRequestStatus = async () => {
    try {
      const consultationRequestsRef = db.collection("consultationRequests");
      const batch = db.batch();

      const snapshot = await consultationRequestsRef.get();
      snapshot.forEach((doc) => {
        batch.update(doc.ref, { Status: "" });
      });

      await batch.commit();
      console.log("Consultation request statuses reset successfully");
    } catch (error) {
      console.error("Error resetting consultation request statuses:", error);
    }
  };

  const handleViewPastConsultations = () => {
    navigation.navigate("StaffPast");
  };

  const handleCancelledAppointments = () => {
    navigation.navigate("StaffRejected");
  };

  const handleReportIssue = () => {
    navigation.navigate("StaffReportIssue");
  };

  const currentUser = auth.currentUser;
  const email = currentUser.email;

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .where("Email", "==", email)
      .where("Role", "in", ["Professor", "TA"])
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const staffData = doc.data();
          setName(staffData.Name);
        });
      });

    return () => unsubscribe();
  }, []);

  const handleResetPassword = async () => {
    // Request password reset email
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent successfully
        console.log("Password reset email sent");
        alert("Password reset email sent.");
      })
      .catch((error) => {
        // An error occurred while sending the password reset email
        alert(error.message);
      });
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      resetConsultationRequestStatus();
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-icon/man_318-157595.jpg",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.roleText}>Staff</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleViewPastConsultations}
      >
        <Text style={styles.buttonText}>View Past Consultations</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCancelledAppointments}
      >
        <Text style={styles.buttonText}>Rejected Appointments</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleReportIssue}>
        <Text style={styles.buttonText}>Report an Issue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: grey,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: purple,
    marginBottom: 5,
  },
  roleText: {
    fontSize: 16,
    color: black,
    marginBottom: 20,
  },
  button: {
    backgroundColor: yellow,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: black,
  },
  logoutButton: {
    backgroundColor: white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: purple,
  },
});

export default StaffProfileScreen;
