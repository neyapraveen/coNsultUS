import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { grey, purple, black, yellow, white } from "../../components/Constants";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import ImagePicker from "react-native-image-picker";

// Import profile images
const profileImages = [
  require("../../assets/StudentPhotos/Picture1.png"),
  require("../../assets/StudentPhotos/Picture2.png"),
  require("../../assets/StudentPhotos/Picture3.png"),
  require("../../assets/StudentPhotos/Picture4.png"),
  require("../../assets/StudentPhotos/Picture5.png"),
  require("../../assets/StudentPhotos/Picture6.png"),
  require("../../assets/StudentPhotos/Picture7.png"),
  require("../../assets/StudentPhotos/Picture8.png"),
  require("../../assets/StudentPhotos/Picture9.png"),
  require("../../assets/StudentPhotos/Picture10.png"),
  require("../../assets/StudentPhotos/Picture11.png"),
  require("../../assets/StudentPhotos/Picture12.png"),
];

const StudentProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch the user's data from Firebase
  const currentUser = auth.currentUser;
  const email = currentUser.email;

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .where("Email", "==", email)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const userData = doc.data();
          setName(userData.Name);
          // Assuming the "ProfileImageIndex" field is saved in the database
          setSelectedImageIndex(userData.ProfileImageIndex || 0);
        });
      });

    return () => unsubscribe();
  }, []);

  // // Function to update the user's name in Firebase
  // const updateName = async (newName) => {
  //   try {
  //     await db.collection("users").doc(email).update({
  //       Name: newName,
  //     });
  //   } catch (error) {
  //     console.error("Error updating name:", error);
  //   }
  // };

  // Function to handle the right arrow button press
  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % profileImages.length;
    setSelectedImageIndex(nextIndex);
    updateProfileImageIndex(email, nextIndex);
  };

  // Function to handle the left arrow button press
  const handlePreviousImage = () => {
    const prevIndex =
      selectedImageIndex === 0
        ? profileImages.length - 1
        : selectedImageIndex - 1;
    setSelectedImageIndex(prevIndex);
    updateProfileImageIndex(email, prevIndex);
  };

  // Function to update the user's profile image index in Firebase
  const updateProfileImageIndex = async (email, newIndex) => {
    try {
      // Query the users collection for documents where the Email field matches the provided email
      const querySnapshot = await db
        .collection("users")
        .where("Email", "==", email)
        .get();

      // Loop through the query results and update the ProfileImageIndex field in each matching document
      const batch = db.batch();
      querySnapshot.forEach((doc) => {
        const userRef = db.collection("users").doc(doc.id);
        batch.update(userRef, { ProfileImageIndex: newIndex });
        //console.log(userRef);
      });

      // Commit the batch update
      await batch.commit();
      console.log(
        "Profile image index updated successfully for all matching documents."
      );
    } catch (error) {
      console.error("Error updating profile image index:", error);
    }
  };

  const handleReportIssue = () => {
    navigation.navigate("ReportIssue");
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

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleChooseProfileImage = () => {
    const options = {
      title: "Select Profile Picture",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // Set the selected profile image
        setSelectedImageIndex(response.uri);

        // Update the user's profile image index in Firebase
        updateProfileImageIndex(email, response.uri);
      }
    });
  };

  const handleEditProfile = () => {
    // Here, you can add a form or modal to allow users to edit their name and profile picture.
    // Then, you can save the updated name and profile picture URI to the Firebase database.
    // For example, you can create a form or modal to get the user's updated name and selected profile picture URI
    // and then update the Firebase database with the new data.
    // Sample code to update the Firebase database:
    // db.collection("users").doc(currentUser.uid).update({
    //   Name: updatedName,
    //   ProfileImage: profileImage,
    // }).then(() => {
    //   console.log("Profile updated successfully");
    //   Alert.alert("Profile updated successfully");
    // }).catch((error) => {
    //   console.error("Error updating profile:", error);
    //   Alert.alert("Error updating profile");
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={handlePreviousImage}
          style={styles.arrowButton}
        >
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
        <Image
          source={profileImages[selectedImageIndex]}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={handleNextImage} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.roleText}>Student</Text>

      <TouchableOpacity style={styles.button} onPress={handleReportIssue}>
        <Text style={styles.buttonText}>Report an Issue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: grey,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: purple,
    marginBottom: 5,
  },
  roleText: {
    fontSize: 16,
    color: black,
    marginBottom: 20,
  },
  button: {
    backgroundColor: yellow,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: black,
  },
  logoutButton: {
    backgroundColor: white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: purple,
  },
});

export default StudentProfileScreen;
