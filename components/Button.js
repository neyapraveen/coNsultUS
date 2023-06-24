import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({ bgColor, btnLabel, textColor, Press }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        width: 350,
        paddingVertical: 10,
        marginVertical: 5,
      }}
    >
      <Text style={{ color: textColor, fontSize: 25, fontWeight: "bold" }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
