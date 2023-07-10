import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { grey, purple, yellow, black, white } from "../../components/Constants";
import { db } from "../../firebase";

const RequestsScreen = () => {
  const [consultationRequests, setConsultationRequests] = useState([]);
  const navigation = useNavigation();
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  useEffect(() => {
    const fetchConsultationRequests = async () => {
      try {
        const snapshot = await db
          .collection("consultationRequests")
          .where("Status", "==", "")
          .get();
        const requests = snapshot.docs.map((doc) => ({
          id: doc.id, // Add this line to include the document ID
          ...doc.data(),
        }));
        setConsultationRequests(requests);
      } catch (error) {
        console.error("Error fetching consultation requests:", error);
      }
    };

    fetchConsultationRequests();
  }, []);

  const handleAcceptConsultation = async (request) => {
    try {
      const docRef = db.collection("consultationRequests").doc(request.id);
      const doc = await docRef.get();

      if (!doc.exists) {
        console.log("Consultation request not found", request.id);
        return;
      }

      await docRef.update({
        Status: "accepted",
      });

      const updatedRequests = consultationRequests.filter(
        (r) => r.id !== request.id
      );
      setConsultationRequests(updatedRequests);
      alert("Request Accepted");
    } catch (error) {
      console.error("Error accepting consultation request:", error);
    }
  };

  const handleRejectConsultation = async (request) => {
    try {
      const docRef = db.collection("consultationRequests").doc(request.id);
      const doc = await docRef.get();

      if (!doc.exists) {
        console.log("Consultation request not found");
        return;
      }

      await docRef.update({
        Status: "rejected",
      });

      const updatedRequests = consultationRequests.filter(
        (r) => r.id !== request.id
      );
      setConsultationRequests(updatedRequests);
      alert("Request Rejected");
    } catch (error) {
      console.error("Error rejecting consultation request:", error);
    }
  };

  const renderConsultationRequestItem = ({ item }) => (
    <View style={styles.requestItemContainer}>
      <View>
        <Text style={styles.requestItemText}>Module: {item.Module.id}</Text>
        <Text style={styles.requestItemText}>Student: {item.Student}</Text>
        <Text style={styles.requestItemText}>
          Date & Time:{" "}
          {item.Time.toDate().toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Consultation Requests</Text>
      {consultationRequests.length === 0 ? (
        <Text style={styles.placeholder}>No requests</Text>
      ) : (
        <FlatList
          data={consultationRequests}
          renderItem={renderConsultationRequestItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
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
  buttonsContainer: {
    flexDirection: "column",
  },
  requestAcceptButton: {
    backgroundColor: "teal",
    borderRadius: 30,
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    margin: 7,
  },
  requestRejectButton: {
    backgroundColor: "maroon",
    borderRadius: 30,
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 7,
  },
  buttonText: {
    color: white,
    fontWeight: "bold",
    fontSize: 16,
  },
  placeholder: {
    fontSize: 16,
    color: grey,
    marginBottom: 20,
  },
});

export default RequestsScreen;
