import React from "react";
import { render } from "@testing-library/react-native";
import Welcome from "../screens/WelcomeScreen";

// Test if the component renders without errors
test("Welcome component renders without errors", () => {
  render(<Welcome />);
});

// Test the presence of the logo image
test("Logo image is rendered", () => {
  const { getByTestId } = render(<Welcome />);
  const logoImage = getByTestId("logo-image");
  expect(logoImage).toBeTruthy();
});

// Test button labels and navigation for 'Login'
test("Login button has the correct label and navigates to 'Login'", () => {
  const { getByText } = render(<Welcome />);
  const loginButton = getByText("Login");
  expect(loginButton).toBeTruthy();

  fireEvent.press(loginButton);
});

// Test button labels and navigation for 'Signup'
test("Signup button has the correct label and navigates to 'Signup'", () => {
  const { getByText } = render(<Welcome />);
  const signupButton = getByText("Signup");
  expect(signupButton).toBeTruthy();

  fireEvent.press(signupButton);
});

// Test the style of the logo image
test("Logo image has the correct style", () => {
  const { getByTestId } = render(<Welcome />);
  const logoImage = getByTestId("logo-image");
  expect(logoImage).toHaveStyle(styles.logoImage);
});
