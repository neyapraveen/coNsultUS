import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";

const MA1521 = () => {
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

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        MA1521 Teaching Staff
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ma1521.map((ma1521, index) => (
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
              source={{ uri: ma1521.image }}
              style={{ width: 70, height: 70 }}
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {ma1521.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default MA1521;

const styles = StyleSheet.create({});
