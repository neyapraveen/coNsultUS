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
import { purple, yellow } from "../components/Constants";
import Field from "../components/Field";
import { auth, db } from "../firebase";

const Signup = (props) => {
  // State variables to store form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to create a new user document in Firestore
  const createUser = async (userData) => {
    try {
      await db.collection("users").add(userData);
      console.log("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Function to check if a user with the provided email already exists in Firestore
  const checkIfUserExistsAndCreate = async (name, email) => {
    try {
      const usersRef = db.collection("users");
      const querySnapshot = await usersRef.where("Email", "==", email).get();

      if (querySnapshot.empty) {
        // No matching documents found, so create a new user document with the "Student" role
        const randomProfileImageIndex = Math.floor(Math.random() * 12);
        await createUser({
          Name: name,
          Email: email,
          Role: "Student",
          Modules: ["CS2030S", "CS1101S"],
          ProfileImageIndex: randomProfileImageIndex,
        });

        console.log("User created successfully!");

        // Add the user's email to the "Students" array in the modules collection
        const modulesRef = db.collection("modules");
        const modulesSnapshot = await modulesRef
          .where("id", "in", ["CS2030S", "CS1101S"])
          .get();

        if (!modulesSnapshot.empty) {
          modulesSnapshot.forEach((doc) => {
            const moduleData = doc.data();
            const studentsArray = moduleData.Students || []; // If Students array doesn't exist, create an empty array
            if (!studentsArray.includes(email)) {
              studentsArray.push(email);
              doc.ref.update({ Students: studentsArray });
            }
          });
        }

        return false; // Return false to indicate user does not exist
      } else {
        // User exists, check the role of the user
        let userRole = "";

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          userRole = userData.Role;
        });

        if (userRole === "Student") {
          console.log("User already exists as a student!");
          props.navigate; // You may need to update this to navigate somewhere
        } else if (userRole === "TA" || userRole === "Professor") {
          console.log("User already exists as a TA or Professor!");
          return true; // Return true to indicate user exists
        } else {
          // Add logic here if there are other roles to handle
        }

        return true; // Return true to indicate user exists
      }
    } catch (error) {
      console.error("Error checking if user exists:", error);
      return true; // Return true to indicate error occurred (or handle error differently)
    }
  };


  // Function to handle the signup process
  const handleSignup = async () => {
    if (email.endsWith("@u.nus.edu")) {
      // Email ends with "@u.nus.edu", proceed with account creation
      if (email === "" || password === "" || confirmPassword === "") {
        alert("All fields are required");
        return;
      }
      if (password === confirmPassword) {
        try {
          // Passwords match, create the account
          const userCredentials = await auth.createUserWithEmailAndPassword(
            email,
            password
          );

          const user = userCredentials.user;
          console.log("User registered with", user.email);

          // Send verification email and wait for it to complete
          await user.sendEmailVerification();
          console.log("Confirmation email sent");

          // Check if the user exists and handle based on the role
          const userExists = await checkIfUserExistsAndCreate(name, email);
          console.log("Signed up as", name);

          // Show the "Account created" alert after successful email sending
          alert("Account created. Please verify your account through your email before logging in.");

          props.navigation.navigate("Login"); // You may need to update this to navigate somewhere
        } catch (error) {
          alert(error.message);
        }
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
        {/* Title */}
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
        {/* Subtitle */}
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
          {/* Input fields */}
          <Field
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Field
            placeholder="NUSNET Email"
            keyboardType={"email-address"}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Field
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCapitalize="none"
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
            {/* Terms and Conditions */}
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
            {/* Privacy Policy */}
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
          {/* Signup Button */}
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
            {/* "Already have an account?" text and Login button */}
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