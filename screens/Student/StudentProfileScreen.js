import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { grey, purple, black, yellow, white } from "../../components/Constants";
import { useNavigation } from "@react-navigation/native";

const StudentProfileScreen = () => {
  const navigation = useNavigation();
  const handleViewPastConsultations = () => {
    navigation.navigate("PastAppointments");
  };

  const handleCancelledAppointments = () => {
    navigation.navigate("RejectedAppointments");
  };

  const handleReportIssue = () => {
    navigation.navigate("ReportIssue");
  };

  const handleResetPassword = () => {
    navigation.navigate("ResetPw");
  };

  const handleLogout = () => {
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.nameText}>Name Here</Text>
      <Text style={styles.roleText}>Student</Text>

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
        <Text style={styles.buttonText}>Cancelled Appointments</Text>
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

export default StudentProfileScreen;
