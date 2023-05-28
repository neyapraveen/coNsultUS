// BookingContext.js - Create and export the BookingContext

import React, { createContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedModule, setSelectedModule] = useState("");

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
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
