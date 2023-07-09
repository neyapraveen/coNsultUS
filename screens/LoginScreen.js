import React, { useState } from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import { black, purple, yellow } from "../components/Constants";
import Field from "../components/Field";
import OfficeHoursScreen from "./Staff/OfficeHoursScreen";
import { auth } from "../firebase";
// import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginStudent = async () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user.email === "test@u.nus.edu") {
          console.log("Logged in with", user.email);
          props.navigation.navigate("Tabs");
        } else if (user && !user.emailVerified) {
          // Email not verified, prevent sign-in
          alert("Please verify your email before signing in.");
        } else {
          console.log("Logged in with", user.email);
          props.navigation.navigate("Tabs");
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleResetPassword = async () => {
    // Request password reset email
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent successfully
        console.log("Password reset email sent");
        alert("Password reset email sent.");
      })
      .catch((error) => {
        // An error occurred while sending the password reset email
        alert(error.message);
      });
  };

  const handleLoginTeacher = () => {
    if (email.endsWith("@u.nus.edu")) {
      // Email ends with "@u.nus.edu", proceed with login
      // You can perform the login logic here
      props.navigation.navigate("OfficeHours");
      alert("Logged In as Teacher");
    } else {
      // Email does not end with "@u.nus.edu", show error message
      alert("Invalid email format. Please enter a valid @u.nus.edu email.");
    }
  };

  return (
    <Background>
      <SafeAreaView style={{ alignItems: "center", width: 460 }}>
        <Text
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
            marginVertical: 20,
            textAlign: "center",
          }}
        >
          Login
        </Text>
        <View
          style={{
            backgroundColor: yellow,
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: black,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Welcome Back
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Login to your account
          </Text>
          <Field
            placeholder="NUSNET Email"
            keyboardType={"email-address"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View
            style={{
              alignItems: "flex-end",
              width: "78%",
              paddingRight: 16,
              marginBottom: 200,
            }}
          >
            <TouchableOpacity onPress={handleResetPassword}>
              <Text style={{ color: purple, fontWeight: "bold", fontSize: 16 }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: -75 }}></View>
          <Button
            textColor="white"
            bgColor={purple}
            btnLabel="Login as student"
            Press={handleLoginStudent}
          />
          <Button
            textColor="white"
            bgColor={purple}
            btnLabel="Login as teacher"
            Press={handleLoginTeacher}
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
      </SafeAreaView>
    </Background>
  );
};

export default Login;
