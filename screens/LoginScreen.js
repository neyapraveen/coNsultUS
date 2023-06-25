import React from "react";
import {
  View,
  Text,
  Touchable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/Background";
import Button from "../components/Button";
import { black, purple } from "../components/Constants";
import Field from "../components/Field";

const Login = (props) => {
  return (
    <Background style={styles.imageBackground}>
      <View style={{ alignItems: "center", width: 460 }}>
        <Text
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
            marginVertical: 20,
          }}
        >
          Login
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 40, color: black, fontWeight: "bold" }}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={"email-address"}
          />
          <Field placeholder="Password" secureTextEntry={true} />
          <View
            style={{
              alignItems: "flex-end",
              width: "78%",
              paddingRight: 16,
              marginBottom: 200,
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("ResetPw")}
            >
              <Text style={{ color: purple, fontWeight: "bold", fontSize: 16 }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            textColor="white"
            bgColor={purple}
            btnLabel="Login as student"
            Press={() => props.navigation.navigate("Tabs")}
          />
          <Button
            textColor="white"
            bgColor={purple}
            btnLabel="Login as teacher"
            Press={() => props.navigation.navigate("Dashboard")}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Don't have an account ?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text style={{ color: purple, fontWeight: "bold", fontSize: 16 }}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default Login;
