import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

{
  /*Startup Screens*/
}
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ResetPw from "../screens/ResetScreen";

{
  /*Student Screens*/
}
import TabNavigator from "./TabNavigator";
import BookingScreen from "../screens/Student/BookingScreen";
import StudentProfileScreen from "../screens/Student/StudentProfileScreen";
import PastAppointments from "../screens/Student/PastAppointments";
import RejectedAppointments from "../screens/Student/RejectedAppointments";
import ReportIssue from "../screens/Student/ReportIssue";

{
  /*Staff Screens*/
}
import DashboardScreen from "../screens/Staff/DashboardScreen";
import CalendarViewScreen from "../screens/Staff/CalendarViewScreen";
import OfficeHoursScreen from "../screens/Staff/OfficeHoursScreen";
import RequestsScreen from "../screens/Staff/RequestsScreen";
import AnnouncementsScreen from "../screens/Staff/AnnouncementsScreen";
import StaffProfileScreen from "../screens/Staff/StaffProfileScreen";
import StaffPastAppointments from "../screens/Staff/StaffPastAppointments";
import StaffRejectedAppointments from "../screens/Staff/StaffRejectedAppointments";
import StaffReportIssue from "../screens/Staff/StaffReportIssue";

import { UserContext } from "../components/UserContext";
import BookingContext from "../components/BookingContext";

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
          name="StaffRejected"
          component={StaffRejectedAppointments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StaffPast"
          component={StaffPastAppointments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StaffReportIssue"
          component={StaffReportIssue}
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
          component={ReportIssue}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </BookingContext.Provider>
  );
};

export default StackNavigator;
