import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { grey, white } from "../../components/Constants";
import { useNavigation } from "@react-navigation/native";

const RequestsScreen = () => {
  const [consultationRequests, setConsultationRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Sample data
    const data = [
      {
        id: "1",
        name: "John Doe",
        date: "2023-09-21",
        time: "10:00 AM",
      },
      {
        id: "2",
        name: "Jane Smith",
        date: "2023-08-22",
        time: "02:00 PM",
      },
      {
        id: "3",
        name: "Max Lee",
        date: "2023-07-19",
        time: "2:00 PM",
      },
      {
        id: "4",
        name: "Andy Williams",
        date: "2023-07-25",
        time: "12:00 PM",
      },
      {
        id: "5",
        name: "Jonathan Song",
        date: "2023-07-5",
        time: "5:00 PM",
      },
      {
        id: "6",
        name: "Phyllis Key",
        date: "2023-08-05",
        time: "10:00 AM",
      },
      {
        id: "7",
        name: "Fairy Gomez",
        date: "2023-08-20",
        time: "2:00 PM",
      },
    ];
    setConsultationRequests(data);
  }, []);

  const renderConsultationRequestItem = ({ item }) => (
    <View
      style={[
        styles.requestItemContainer,
        item.status === "rejected" && styles.rejectedRequestContainer,
      ]}
    >
      <View>
        <Text style={styles.requestItemText}>{item.name}</Text>
        <Text style={styles.requestItemText}>{item.date}</Text>
        <Text style={styles.requestItemText}>{item.time}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.requestAcceptButton}
          onPress={() => handleAcceptConsultation(item)}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.requestRejectButton}
          onPress={() => handleRejectConsultation(item)}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleRejectConsultation = (item) => {
    // Mark the consultation request as rejected
    console.log("Rejected");
    item.status = "rejected";
  };

  const handleAcceptConsultation = (item) => {
    // Mark the consultation request as rejected
    console.log("Accepted");
    item.status = "accepted";
    setAcceptedRequests([...acceptedRequests, item]);
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <>
        <View
          style={{
            flexDirection: "row",
            padding: 5,
            marginTop: 10,
            backgroundColor: grey,
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 50, height: 50 }}
          />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>coNsultUS</Text>
            <Text>SYNC, THINK & LINK</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Dashboard")}
            style={{ marginLeft: "auto", marginRight: 7, marginTop: 5 }}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://e7.pngegg.com/pngimages/703/597/png-clipart-logo-house-home-house-angle-building.png",
              }}
            />
          </Pressable>
        </View>
      </>

      <>
        <Text style={styles.heading}>Consultation Requests</Text>
        <Text style={{ fontSize: 15, color: "darkgrey", marginBottom: 10 }}>
          Once requests are rejected they cannot be accepted again. Students
          must send in another request.{" "}
        </Text>
      </>

      <FlatList
        data={consultationRequests}
        renderItem={renderConsultationRequestItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  list: {
    marginBottom: 20,
  },
  requestItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  requestItemText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  rejectedRequestText: {
    color: grey,
  },
  requestAcceptButton: {
    backgroundColor: "teal",
    borderRadius: 30,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  requestRejectButton: {
    backgroundColor: "maroon",
    borderRadius: 30,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: white,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default RequestsScreen;
