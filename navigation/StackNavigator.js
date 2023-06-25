import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import BookingScreen from "../screens/Student/BookingScreen";
import StudentProfileScreen from "../screens/Student/StudentProfileScreen";
import DashboardScreen from "../screens/Staff/DashboardScreen";
import OfficeHoursScreen from "../screens/Staff/OfficeHoursScreen";
import CalendarViewScreen from "../screens/Staff/CalendarViewScreen";
import RequestsScreen from "../screens/Staff/RequestsScreen";
import StaffProfileScreen from "../screens/Staff/StaffProfileScreen";
import AnnouncementsScreen from "../screens/Staff/AnnouncementsScreen";
import ResetPw from "../screens/ResetScreen";
import PastAppointments from "../screens/PastAppointments";
import RejectedAppointments from "../screens/RejectedAppointments";
import ReportIssueScreen from "../screens/ReportIssue";

import BookingContext from "../components/BookingContext";
import { RequestsProvider } from "../components/RequestsContext";

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
          name="StudentProfile"
          component={StudentProfileScreen}
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
        <Stack.Screen
          name="StaffProfile"
          component={StaffProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CalendarView"
          component={CalendarViewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Announcements"
          component={AnnouncementsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPw"
          component={ResetPw}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PastAppointments"
          component={PastAppointments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RejectedAppointments"
          component={RejectedAppointments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReportIssue"
          component={ReportIssueScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </BookingContext.Provider>
  );
};

export default StackNavigator;
