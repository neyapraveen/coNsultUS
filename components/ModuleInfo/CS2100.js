import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";

const CS2100 = () => {
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

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        CS2100 Teaching Staff
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cs2100.map((cs2100, index) => (
          <Pressable
            style={{
              margin: 10,
              backgroundColor: "beige",
              padding: 20,
              borderRadius: 7,
            }}
            key={index}
          >
            <Image
              source={{ uri: cs2100.image }}
              style={{ width: 70, height: 70 }}
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {cs2100.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default CS2100;

const styles = StyleSheet.create({});
