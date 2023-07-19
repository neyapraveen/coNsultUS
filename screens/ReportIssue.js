import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Background from "../components/Background";
import { purple, grey, yellow, black, white } from "../components/Constants";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";

const ReportIssueScreen = () => {
  const [issue, setIssue] = useState("");
  const navigation = useNavigation();

  const handleReportIssue = async () => {
    // Handle reporting the issue logic here
    const issueData = {
      issue: issue.trim(),
    };
    await db.collection("feedback").add(issueData);
    console.log("Issue reported successfully:", issueData);
    // Reset the input field
    alert("feedback sent!")
    setIssue("");
    navigation.navigate("Dashboard");
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

export default ReportIssueScreen;
