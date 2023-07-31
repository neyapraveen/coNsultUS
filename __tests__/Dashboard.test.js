import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import DashboardScreen from "../screens/Staff/DashboardScreen";

// Mocking the navigation prop
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mocking the Firebase database
jest.mock("../../firebase", () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({}),
    doc: jest.fn().mockReturnThis(),
    update: jest.fn().mockResolvedValue({}),
  },
}));

describe("DashboardScreen", () => {
  test("navigates to CalendarView screen on Calendar View button press", async () => {
    const { getByTestId } = render(<DashboardScreen />);
    const calendarViewButton = getByTestId("calendar-view-button");

    await act(async () => {
      fireEvent.press(calendarViewButton);
      await waitFor(() =>
        expect(navigation.navigate).toHaveBeenCalledWith("CalendarView")
      );
    });
  });

  test("navigates to OfficeHours screen on Select/Edit Office Hours button press", async () => {
    const { getByTestId } = render(<DashboardScreen />);
    const officeHoursButton = getByTestId("office-hours-button");

    await act(async () => {
      fireEvent.press(officeHoursButton);
      await waitFor(() =>
        expect(navigation.navigate).toHaveBeenCalledWith("OfficeHours")
      );
    });
  });

  test("calls handleRequestsScreen function on View Consultation Requests button press", async () => {
    const { getByTestId } = render(<DashboardScreen />);
    const viewRequestsButton = getByTestId("view-requests-button");

    await act(async () => {
      fireEvent.press(viewRequestsButton);
      await waitFor(() =>
        expect(db.collection).toHaveBeenCalledWith("consultationRequests")
      );
      await waitFor(() => expect(db.where).toHaveBeenCalledTimes(2));
      await waitFor(() => expect(db.get).toHaveBeenCalledTimes(1));
    });
  });
});
