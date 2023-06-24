import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import BookingScreen from "../screens/BookingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BookingContext from "../components/BookingContext";
import OfficeHoursScreen from "../screens/Staff/OfficeHoursScreen";
import RequestsScreen from "../screens/Staff/RequestsScreen";
import DashboardScreen from "../screens/Staff/DashboardScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState([]);
  const [selectedStaff, setSelectedStaff] = React.useState([]);
  const [selectedModule, setSelectedModule] = React.useState([]);
  return (
    <BookingContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedStaff,
        setSelectedStaff,
        selectedModule,
        setSelectedModule,
      }}
    >
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Requests"
          component={RequestsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OfficeHours"
          component={OfficeHoursScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </BookingContext.Provider>
  );
};

export default StackNavigator;
