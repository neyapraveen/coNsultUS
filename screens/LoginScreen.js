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
import { auth, db } from "../firebase";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginStudent = async () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user && !user.emailVerified && email !== "test@u.nus.edu") {
          // Email not verified, prevent sign-in
          alert("Please verify your email before signing in.");
        } else {
          // Check the user's role
          db.collection("users")
            .where("Email", "==", email)
            .get()
            .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const role = userDoc.data().Role;

                if (role === "Student" || role === "TA") {
                  console.log("Logged in as Student");
                  props.navigation.navigate("Tabs");
                } else {
                  alert("Invalid login credentials for a student.");
                }
              } else {
                alert("User not found.");
              }
            })
            .catch((error) => {
              console.error("Error getting user:", error);
            });
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleLoginTeacher = async () => {
    if (email.endsWith("@u.nus.edu")) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          if (user && !user.emailVerified && email !== "test@u.nus.edu") {
            // Email not verified, prevent sign-in
            alert("Please verify your email before signing in.");
          } else {
            // Check the user's role
            db.collection("users")
              .where("Email", "==", email)
              .get()
              .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                  const userDoc = querySnapshot.docs[0];
                  const role = userDoc.data().Role;

                  if (role === "Professor" || role === "TA") {
                    console.log("Logged in as Staff");
                    props.navigation.navigate("Dashboard");
                  } else {
                    alert("Invalid login credentials for staff.");
                  }
                } else {
                  alert("User not found.");
                }
              })
              .catch((error) => {
                console.error("Error getting user:", error);
              });
          }
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Invalid email format. Please enter a valid @u.nus.edu email.");
    }
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
