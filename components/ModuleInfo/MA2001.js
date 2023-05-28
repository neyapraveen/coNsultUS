import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";

const MA2001 = () => {
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

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        MA2001 Teaching Staff
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ma2001.map((ma2001, index) => (
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
              source={{ uri: ma2001.image }}
              style={{ width: 70, height: 70 }}
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {ma2001.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default MA2001;

const styles = StyleSheet.create({});
