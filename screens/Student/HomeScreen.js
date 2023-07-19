import {
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BookingContext from "../../components/BookingContext";
import { db } from "../../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [staffData, setStaffData] = useState([]);

  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedStaff,
    setSelectedStaff,
    selectedModule,
    setSelectedModule,
  } = useContext(BookingContext);

  const [selectedID, setSelectedID] = useState([]);

  useEffect(() => {
    // Fetch staff data from Firestore and update the staffData state
    db.collection("staff")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setStaffData(data);
      })
      .catch((error) => {
        console.error("Error fetching staff data: ", error);
      });
  }, []);

  const handlePressStaff = (item) => {
    if (selectedID.includes(item.id)) {
      // Staff is already selected, unselect it
      setSelectedID([]);
      setSelectedModule("");
      setSelectedStaff("");
    } else {
      // Staff is not selected, select it
      setSelectedID([item.id]);
      setSelectedModule(item.module.id);
      setSelectedStaff(item.name);
    }
  };

  const filterStaffByName = (staffData, query) => {
    if (!query) return staffData;
    return staffData.filter((staff) =>
      staff.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const renderStaffRow = (module, staffList) => {
    return (
      <View key={module} style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
          {module} Teaching Staff
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {staffList.map((item) => (
            <Pressable
              onPress={() => handlePressStaff(item)}
              style={
                selectedID.includes(item.id)
                  ? {
                      margin: 10,
                      backgroundColor: "#7072d5",
                      padding: 20,
                      borderRadius: 7,
                    }
                  : {
                      margin: 10,
                      backgroundColor: "beige",
                      padding: 20,
                      borderRadius: 7,
                    }
              }
              key={item.id}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 70, height: 70 }}
              />
              <Text
                style={
                  selectedID.includes(item.id)
                    ? { color: "white", textAlign: "center", marginTop: 10 }
                    : { color: "black", textAlign: "center", marginTop: 10 }
                }
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };

  const filteredStaffData = filterStaffByName(staffData, searchQuery);

  const renderContinuationPrompt = () => {
    if (selectedID.length > 0 && selectedStaff) {
      return (
        <Pressable
          style={{
            backgroundColor: "#F4D79A",
            padding: 10,
            marginBottom: 30,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#7072d5" }}
            >
              Meeting with {selectedStaff} ({selectedModule})
            </Text>
          </View>

          <Pressable
            onPress={() => {
              navigation.navigate("Booking");
              setSelectedID([]);
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>
              Continue
            </Text>
          </Pressable>
        </Pressable>
      );
    }
    return null;
  };

  return (
    <>
      {/* Top Section */}
      <ScrollView style={{ flex: 1, marginTop: 30 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
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
            onPress={() => navigation.navigate("StudentProfile")}
            style={{ marginLeft: "auto", marginRight: 7 }}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
              }}
            />
          </Pressable>
        </View>

        {/* Search bar */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            borderWidth: 0.8,
            borderColor: "grey",
            borderRadius: 7,
          }}
        >
          <TextInput
            placeholder="Search for staff by name"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons
            style={{ marginLeft: "auto", marginRight: 7 }}
            name="search"
            size={24}
            color="#F4D79A"
          />
        </View>

        {/* Render staff rows grouped by module */}
        {Object.entries(
          filteredStaffData.reduce((acc, staff) => {
            if (!acc[staff.module.id]) acc[staff.module.id] = [];
            acc[staff.module.id].push(staff);
            return acc;
          }, {})
        ).map(([module, staffList]) => renderStaffRow(module, staffList))}
      </ScrollView>

      {/* Continuation Prompt */}
      {renderContinuationPrompt()}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
