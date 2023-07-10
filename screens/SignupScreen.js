import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import { purple, yellow } from "../components/Constants";
import Field from "../components/Field";
import { auth, db } from "../firebase";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const createUser = async (userData) => {
    try {
      await db.collection("users").add(userData);
      console.log("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleSignup = async () => {
    if (email.endsWith("@u.nus.edu")) {
      // Email ends with "@u.nus.edu", proceed with account creation
      if (email === "" || password === "" || confirmPassword === "") {
        alert("All fields are required");
        return;
      }
      if (password === confirmPassword) {
        // Passwords match, create the account
        alert("Account created");
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("User registered with" & user.email);
            user.sendEmailVerification().then(() => {
              console.log("Confirmation email sent");
            });
          })
          .catch((error) => alert(error.message));

        createUser({
          Name: name,
          Email: email,
          Role: "Student",
          Modules: ["CS2030S, CS1101S"],
        });

        console.log("Signed up as", name);
        props.navigation.navigate("Login");
      } else {
        // Passwords do not match, show error message
        alert("Passwords do not match");
      }
    } else {
      // Email does not end with "@u.nus.edu", show error message
      alert("Invalid email format. Please enter a valid @u.nus.edu email.");
    }
  };
  return (
    <Background>
      <SafeAreaView
        style={{
          alignItems: "center",
          width: 460,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Register
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: yellow,
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: "center",
          }}
        >
          <Field
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
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
          <Field
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "78%",
              paddingRight: 16,
            }}
          >
            <Text style={{ color: "grey", fontSize: 16 }}>
              By signing in, you agree to our{" "}
            </Text>
            <Text
              style={{
                color: purple,
                fontWeight: "bold",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "78%",
              paddingRight: 16,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "grey", fontSize: 15 }}>and </Text>
            <Text
              style={{
                color: purple,
                fontWeight: "bold",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Privacy Policy
            </Text>
          </View>
          <View style={{ marginTop: 100 }}></View>
          <Button
            textColor="white"
            bgColor={purple}
            btnLabel="Signup"
            Press={handleSignup}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Already have an account ?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={{ color: purple, fontWeight: "bold", fontSize: 16 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Signup;
