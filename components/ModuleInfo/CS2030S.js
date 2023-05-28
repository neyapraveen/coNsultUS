import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";

const CS2030S = () => {
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
    },
    {
      id: "20303",
      image: "https://cdn-icons-png.flaticon.com/512/354/354641.png",
      name: "Dr. Pink",
    },
    {
      id: "20304",
      image: "https://cdn-icons-png.flaticon.com/512/194/194935.png",
      name: "Prof. Collar",
    },
    {
      id: "20305",
      image: "https://img.freepik.com/free-icon/man_318-157501.jpg?w=360",
      name: "Guy",
    },
  ];

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        CS2030S Teaching Staff
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cs2030s.map((cs2030s, index) => (
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
              source={{ uri: cs2030s.image }}
              style={{ width: 70, height: 70 }}
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {cs2030s.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default CS2030S;

const styles = StyleSheet.create({});
