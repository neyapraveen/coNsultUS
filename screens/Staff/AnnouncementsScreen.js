import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Background from "../../components/Background";
import { grey, yellow, white } from "../../components/Constants";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import axios from "axios";
import firebase from "firebase/compat";

const AnnouncementsScreen = () => {
  const [announcement, setAnnouncement] = useState("");
  const navigation = useNavigation();
  const currentUser = firebase.auth().currentUser;
  const userEmailAddress = currentUser ? currentUser.email : "";

  useEffect(() => {
    fetchProfessorModules();
  }, []);

  const [professorModules, setProfessorModules] = useState([]);

  const fetchProfessorModules = async () => {
    try {
      const modulesRef = db.collection("modules");
      const snapshot = await modulesRef
        .where("Professors", "array-contains", userEmailAddress)
        .get();
  
      const modulesData = snapshot.docs.map((doc) => doc.data());
      setProfessorModules(modulesData);
  
      console.log("Professor Modules:", modulesData);
  
      // Additional logging to check the complete "Students" array for each module
      modulesData.forEach((module) => {
        console.log("Students for Module:", module.Students);
      });
    } catch (error) {
      console.error("Error fetching professor modules:", error);
    }
  };
  
  

  const handleSendAnnouncement = async () => {
    try {
      // Create an empty Set to store unique recipients (student emails)
      const uniqueRecipients = new Set();

      // Iterate over each module and add the students' emails to the Set
      professorModules.forEach((module) => {
        module.Students.forEach((studentEmail) => {
          uniqueRecipients.add(studentEmail);
        });
      });

      // Convert the Set back to an array
      const recipientsArray = Array.from(uniqueRecipients);

      console.log("Recipients:", recipientsArray); // Check the recipients array

      // Send email to each unique student in the recipientsArray
      const sendPromises = recipientsArray.map((recipient) =>
        sendEmail(recipient, announcement)
          .then((response) => ({ status: "fulfilled", value: response }))
          .catch((error) => ({ status: "rejected", reason: error }))
      );

      //console.log("Send Promises:", sendPromises); // Check the sendPromises array

      // Wait for all emails to be sent
      const results = await Promise.all(sendPromises);

      //console.log("Results:", results); // Check the results of email sending

      // Reset the input field
      setAnnouncement("");
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("Error sending announcement:", error);
    }
  };

  const sendEmail = async (recipient, body) => {
    const apiKey = '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';
    const baseUrl = 'https://api.sendinblue.com/v3/smtp/email';

    const data = {
      to: [{ email: recipient }],
      subject: "Important Announcement",
      htmlContent: body,
      sender: { email: 'consultusnus@gmail.com' }, 
    };

    const config = {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(baseUrl, data, config);
      console.log('Email sent successfully:', response.data);
      return response.data; // Return the email response
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Throw the error to be caught by the promise
    }
  };

  const isSendButtonDisabled = announcement.trim() === "";

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.heading}>Send Announcement</Text>
        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.input}
            placeholder="Type your announcement here"
            value={announcement}
            onChangeText={(text) => setAnnouncement(text)}
          />
        </View>
        <Pressable
          style={[
            styles.sendButton,
            { backgroundColor: isSendButtonDisabled ? grey : yellow },
          ]}
          onPress={handleSendAnnouncement}
          disabled={isSendButtonDisabled}
        >
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 37,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 10,
    color: yellow,
    padding: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: grey,
    borderRadius: 20,
  },
  input: {
    height: 200,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    height: 600,
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: yellow,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 375,
  },
  buttonText: {
    color: white,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AnnouncementsScreen;
