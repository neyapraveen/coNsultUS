import React from "react";
import { TextInput } from "react-native";
import { black, purple } from "../components/Constants.js";

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: purple,
        paddingHorizontal: 10,
        width: "78%",
        height: 50,
        backgroundColor: "rgb(220,220, 220)",
        marginVertical: 10,
      }}
      placeholderTextColor='grey'
    ></TextInput>
  );
};

export default Field;
