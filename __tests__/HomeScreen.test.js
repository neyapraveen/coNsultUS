import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../screens/Student/HomeScreen";

// Test if the component renders without errors
test("HomeScreen component renders without errors", () => {
  render(<HomeScreen />);
});

// Test if the logo image is rendered
test("Logo image is rendered", () => {
  const { getByTestId } = render(<HomeScreen />);
  const logoImage = getByTestId("logo-image");
  expect(logoImage).toBeTruthy();
});

// Test if the search bar is rendered
test("Search bar is rendered", () => {
  const { getByPlaceholderText } = render(<HomeScreen />);
  const searchInput = getByPlaceholderText("Search for staff by name");
  expect(searchInput).toBeTruthy();
});
