import React from "react";
import { View, Image } from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import { black, purple, yellow } from "../components/Constants.js";

const Home = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
        <View>
          <Image
            source={require("../assets/nameLogo.png")}
            style={{ width: 200, height: 200, marginBottom: 40 }}
          />
        </View>
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

export default Home;
