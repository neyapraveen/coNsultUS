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
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={styles.input}
          placeholder="Type your announcement here"
          value={announcement}
          onChangeText={(text) => setAnnouncement(text)}
        />
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
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: white,
    textAlign: "center",
  },
  input: {
    height: 500,
    padding: 10,
    backgroundColor: grey,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: "grey",
    borderWidth: 0.7,
    margin: 10,
    textAlignVertical: "top",
  },
  sendButton: {
    borderRadius: 30,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: white,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default AnnouncementsScreen;
