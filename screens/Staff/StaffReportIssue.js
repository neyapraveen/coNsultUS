import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Background from "../../components/Background";
import { purple, grey, yellow, black, white } from "../../components/Constants";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../../firebase";
import axios from "axios";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const StaffReportIssueScreen = () => {
  const [issue, setIssue] = useState("");
  const [name, setName] = useState(""); // Move useState inside the component
  const navigation = useNavigation();

  // Get the current user's email
  const currentUser = auth.currentUser;
  const email = currentUser ? currentUser.email : null;

  // Function to get the current user's name from Firestore
  const getCurrentUserName = async () => {
    if (currentUser) {
      try {
        const userDoc = await db
          .collection("users")
          .where("Email", "==", email)
          .get();
        if (!userDoc.empty) {
          userDoc.forEach((doc) => {
            const data = doc.data();
            setName(data.Name);
          });
        } else {
          setName("Unknown"); // Return a default name if the user's name is not found
        }
      } catch (error) {
        console.error("Error getting user name:", error);
        setName("Unknown"); // Return a default name in case of an error
      }
    } else {
      setName("Unknown"); // Return a default name if the current user is not authenticated
    }
  };

  useEffect(() => {
    getCurrentUserName(); // Call the function to get the user's name
  }, []);

  const handleReportIssue = async () => {
    // Handle reporting the issue logic here
    const userName = name;
    const issueData = {
      issue: issue.trim(),
    };
    await db.collection("feedback").add(issueData);
    console.log("Issue reported successfully:", issueData);
    const emailContent = `Issue: ${issueData.issue}<br><br>Reported by: ${userName}`;

    // Get the current timestamp and format it to a readable string
    const currentTimestamp = new Date().toLocaleString();

    // Send the issue as an email
    try {
      const apiKey =
        "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";
      const baseUrl = "https://api.sendinblue.com/v3/smtp/email";

      const data = {
        to: [{ email: "consultusnus@gmail.com" }],
        subject: `Reported Issue in coNsultUS App - ${currentTimestamp}`, // Include the timestamp in the subject
        htmlContent: emailContent,
        sender: { email: "consultusnus@gmail.com" },
      };

      const config = {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(baseUrl, data, config);
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }

    // Reset the input field
    alert("Feedback sent!");
    setIssue("");
    navigation.navigate("StaffProfile");
  };

  const isSubmitButtonDisabled = issue.trim() === "";

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.heading}>Report an Issue</Text>
        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.input}
            placeholder="Type your issue here"
            value={issue}
            onChangeText={(text) => setIssue(text)}
          />
        </View>
        <Pressable
          style={[
            styles.submitButton,
            { backgroundColor: isSubmitButtonDisabled ? grey : yellow },
          ]}
          onPress={handleReportIssue}
          disabled={isSubmitButtonDisabled}
        >
          <Text style={styles.buttonText}>Submit</Text>
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
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 40,
    color: yellow,
    padding: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 75,
    backgroundColor: grey,
    borderRadius: 20,
    marginLeft: 10,
  },
  input: {
    height: 400,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top",
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: yellow,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginLeft: 10,
  },
  buttonText: {
    color: white,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default StaffReportIssueScreen;
