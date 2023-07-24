import React from "react";
import { StyleSheet } from "react-native";
import { View, Image } from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import { black, purple, yellow } from "../components/Constants.js";

const Welcome = (props) => {
  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={require("../assets/nameLogo.png")}
          style={styles.logoImage}
        />
        <Button
          bgColor={purple}
          textColor={black}
          btnLabel="Login"
          Press={() => props.navigation.navigate("Login")}
        />
        <Button
          bgColor={black}
          textColor={yellow}
          btnLabel="Signup"
          Press={() => props.navigation.navigate("Signup")}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
    marginVertical: 100,
  },
  logoImage: {
    width: 350, // Adjust the width to make the image larger
    height: 350, // Adjust the height to make the image larger
    marginBottom: 40,
  },
});

export default Welcome;
