import React, { createContext, useState, useEffect } from "react";

export const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [consultationRequests, setConsultationRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("your_api_endpoint");
        const data = await response.json();
        setConsultationRequests(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const updateRequestStatus = (requestId, status) => {
    const updatedRequests = consultationRequests.map((request) => {
      if (request.id === requestId) {
        return { ...request, status };
      }
      return request;
    });

    setConsultationRequests(updatedRequests);
  };

  return (
    <RequestsContext.Provider
      value={{ consultationRequests, updateRequestStatus }}
    >
      {children}
    </RequestsContext.Provider>
  );
};
