import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";

const CS2040S = () => {
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

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        CS2040S Teaching Staff
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cs2040s.map((cs2040s, index) => (
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
              source={{ uri: cs2040s.image }}
              style={{ width: 70, height: 70 }}
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {cs2040s.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default CS2040S;

const styles = StyleSheet.create({});
