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
import React, { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import BookingContext from "../components/BookingContext";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
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
  const handlePressStaff = (item) => {
    if (selectedID.includes(item.id)) {
      // Staff is already selected, unselect it
      setSelectedID(selectedID.filter((id) => id !== item.id));
      setSelectedModule("");
      setSelectedStaff("");
    } else {
      // Staff is not selected, select it
      setSelectedID([item.id]);
      setSelectedModule(item.module);
      setSelectedStaff(item.name);
    }
  };

  const cs2100 = [
    {
      id: "21001",
      image: "https://img.freepik.com/free-icon/man_318-157595.jpg",
      name: "Dr. Orange",
      module: "CS2100",
    },
    {
      id: "21002",
      image: "https://img.freepik.com/free-icon/user_318-219669.jpg?w=360",
      name: "Prof. Teal",
      module: "CS2100",
    },
    {
      id: "21003",
      image: "https://img.freepik.com/free-icon/user_318-219676.jpg",
      name: "Dr. Navy",
      module: "CS2100",
    },
    {
      id: "21004",
      image: "https://cdn-icons-png.flaticon.com/512/194/194933.png",
      name: "Prof. Vest",
      module: "CS2100",
    },
    {
      id: "21005",
      image: "https://img.freepik.com/free-icon/man_318-157501.jpg?w=360",
      name: "Guy",
      module: "CS2100",
    },
  ];
  const cs2030s = [
    {
      id: "20301",
      image: "https://cdn-icons-png.flaticon.com/512/1089/1089129.png",
      name: "Prof. Green",
      module: "CS2030S",
    },
    {
      id: "20302",
      image: "https://cdn-icons-png.flaticon.com/512/206/206897.png",
      name: "Prof. Yellow",
      module: "CS2030S",
    },
    {
      id: "20303",
      image: "https://cdn-icons-png.flaticon.com/512/354/354641.png",
      name: "Dr. Pink",
      module: "CS2030S",
    },
    {
      id: "20304",
      image: "https://cdn-icons-png.flaticon.com/512/194/194935.png",
      name: "Prof. Collar",
      module: "CS2030S",
    },
    {
      id: "20305",
      image: "https://img.freepik.com/free-icon/man_318-157501.jpg?w=360",
      name: "Guy",
      module: "CS2030S",
    },
  ];
  const cs2040s = [
    {
      id: "20401",
      image:
        "https://cdn.esquimaltmfrc.com/wp-content/uploads/2015/09/flat-faces-icons-circle-man-9.png",
      name: "Dr. Tree",
      module: "CS2040S",
    },
    {
      id: "20402",
      image:
        "https://cdn.esquimaltmfrc.com/wp-content/uploads/2015/09/flat-faces-icons-circle-man-6.png",
      name: "Prof. Sam",
      module: "CS2040S",
    },
    {
      id: "20403",
      image:
        "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png",
      name: "Dr. Kurtis",
      module: "CS2040S",
    },
    {
      id: "20404",
      image: "https://cdn-icons-png.flaticon.com/512/4128/4128253.png",
      name: "Prof. Lily",
      module: "CS2040S",
    },
    {
      id: "20405",
      image: "https://img.freepik.com/free-icon/man_318-157501.jpg?w=360",
      name: "Guy",
      module: "CS2040S",
    },
  ];
  const ma1521 = [
    {
      id: "15211",
      image: "https://cdn-icons-png.flaticon.com/512/201/201634.png",
      name: "Dr. Turquoise",
      module: "MA1521",
    },
    {
      id: "15212",
      image: "https://cdn-icons-png.flaticon.com/512/4128/4128176.png",
      name: "Prof. Jack",
      module: "MA1521",
    },
    {
      id: "15213",
      image: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png",
      name: "Dr. Will",
      module: "MA1521",
    },
    {
      id: "15214",
      image: "https://cdn-icons-png.flaticon.com/512/6833/6833605.png",
      name: "Prof. Sky",
      module: "MA1521",
    },
    {
      id: "15215",
      image: "https://img.freepik.com/free-icon/man_318-157501.jpg?w=360",
      name: "Guy",
      module: "MA1521",
    },
  ];
  const ma2001 = [
    {
      id: "20011",
      image: "https://cdn-icons-png.flaticon.com/512/2726/2726000.png",
      name: "Dr. Purple",
      module: "MA2001",
    },
    {
      id: "20012",
      image:
        "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-black-6-512.png",
      name: "Prof. Sal",
      module: "MA2001",
    },
    {
      id: "20013",
      image: "https://cdn-icons-png.flaticon.com/512/1870/1870038.png",
      name: "Prof. Red",
      module: "MA2001",
    },
    {
      id: "20014",
      image:
        "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-4-512.png",
      name: "Dr. Harp",
      module: "MA2001",
    },
    {
      id: "20015",
      image: "https://img.freepik.com/free-icon/man_318-157501.jpg?w=360",
      name: "Guy",
      module: "MA2001",
    },
  ];
  const is1108 = [
    {
      id: "11081",
      image:
        "https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_female_woman_person_people_white_tone_icon_159360.png",
      name: "Dr. Orange",
      module: "IS1108",
    },
    {
      id: "11082",
      image: "https://cdn-icons-png.flaticon.com/512/4974/4974985.png",
      name: "Prof. Sun",
      module: "IS1108",
    },
    {
      id: "11083",
      image: "https://cdn-icons-png.flaticon.com/256/345/345636.png",
      name: "Dr. Tie",
      module: "IS1108",
    },
    {
      id: "11084",
      image: "https://cdn-icons-png.flaticon.com/256/1317/1317331.png",
      name: "Prof. Blue",
      module: "IS1108",
    },
    {
      id: "11085",
      image: "https://img.freepik.com/free-icon/man_318-157501.jpg?w=360",
      name: "Guy",
      module: "IS1108",
    },
  ];

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

          <Pressable onPress={() => navigation.navigate("Booking")}>
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
            source={require("../assets/logo.png")}
            style={{ width: 50, height: 50 }}
          />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>coNsultUS</Text>
            <Text>SYNC, THINK & LINK</Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("Profile")}
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
          <TextInput placeholder="Search for staff by name" />
          <Ionicons
            style={{ marginLeft: "auto", marginRight: 7 }}
            name="search"
            size={24}
            color="#F4D79A"
          />
        </View>

        {/* Sample Mod Views */}

        {/* CS2100 */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
            CS2100 Teaching Staff
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cs2100.map((item, index) => (
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
                key={index}
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

        {/* CS2030S */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
            CS2030S Teaching Staff
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cs2030s.map((item, index) => (
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
                key={index}
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

        {/* CS2040S */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
            CS2040S Teaching Staff
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cs2040s.map((item, index) => (
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
                key={index}
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

        {/* MA1521 */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
            MA1521 Teaching Staff
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ma1521.map((item, index) => (
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
                key={index}
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

        {/* MA2001 */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
            MA2001 Teaching Staff
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ma2001.map((item, index) => (
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
                key={index}
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

        {/* IS1108 */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
            IS1108 Teaching Staff
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {is1108.map((item, index) => (
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
                key={index}
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
      </ScrollView>

      {/* Continuation Prompt */}
      {/*
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
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#7072d5" }}>
            {selectedStaff}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "grey",
              marginVertical: 6,
            }}
          >
            {selectedModule}
          </Text>
        </View>

        <Pressable onPress={() => navigation.navigate("Booking")}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>
            Continue
          </Text>
        </Pressable>
      </Pressable>
      */}
      {renderContinuationPrompt()}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
