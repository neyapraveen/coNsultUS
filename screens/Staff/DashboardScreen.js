import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { black, purple, yellow, white, grey } from "../../components/Constants";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      {/* Top Section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          marginTop: 40,
          backgroundColor: purple,
          borderRadius: 100,
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 50, height: 50 }}
        />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", color: white }}>
            coNsultUS
          </Text>
          <Text>SYNC, THINK & LINK</Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate("StaffProfile")}
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

      {/* Button Section */}
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CalendarView")}
          >
            <Image
              style={{ width: 120, height: 120 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1787/1787029.png",
              }}
            />
            <Text style={styles.buttonText}>Calendar View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("OfficeHours")}
          >
            <Image
              style={{ width: 120, height: 120 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/4305/4305432.png",
              }}
            />
            <Text style={styles.buttonText}>Select/Edit Office Hours</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Requests")}
          >
            <Image
              style={{ width: 120, height: 120 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/4712/4712907.png",
              }}
            />
            <Text style={styles.buttonText}>View Consultation Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Announcements")}
          >
            <Image
              style={{ width: 120, height: 120 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5256/5256870.png",
              }}
            />
            <Text style={styles.buttonText}>Send out an Announcement</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 325,
    backgroundColor: "#eaeaea",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    borderColor: yellow,
    borderWidth: 5,
    marginTop: 10,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DashboardScreen;
