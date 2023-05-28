import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";

const IS1108 = () => {
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

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        IS1108 Teaching Staff
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {is1108.map((is1108, index) => (
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
              source={{ uri: is1108.image }}
              style={{ width: 70, height: 70 }}
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {is1108.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default IS1108;

const styles = StyleSheet.create({});
