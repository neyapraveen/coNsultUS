import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Background from "../../components/Background";
import { grey, yellow, white } from "../../components/Constants";
import { useNavigation } from "@react-navigation/native";

const AnnouncementsScreen = () => {
  const [announcement, setAnnouncement] = useState("");
  const navigation = useNavigation();
  const handleSendAnnouncement = () => {
    // Handle sending the announcement logic here
    console.log("Sending announcement:", announcement);
    // Reset the input field
    setAnnouncement("");
    navigation.navigate("Dashboard");
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
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: white,
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
