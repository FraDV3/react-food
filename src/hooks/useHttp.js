import { useCallback, useEffect, useState } from "react";

// Function to send an HTTP request using fetch API
async function sendHttpRequest(url, config) {
  // Make the fetch request with the given URL and configuration
  const response = await fetch(url, config);

  // Parse the response data as JSON
  const resData = await response.json();

  // Check if the response was not ok, throw an error with message
  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }

  // Return the parsed response data
  return resData;
}

// Custom React hook for handling HTTP requests
export default function useHttp(url, config, initialData) {
  // State to store the response data, initialized with initialData
  const [data, setData] = useState(initialData);
  // State to track loading status of the request
  const [isLoading, setIsLoading] = useState(false);
  // State to store any error message from the request
  const [error, setError] = useState();

  // Function to clear the current data and reset to initialData
  function clearData() {
    setData(initialData);
  }

  // Function to send the HTTP request, wrapped in useCallback to avoid unnecessary re-creations
  const sendRequest = useCallback(
    async function sendRequest(data) {
      // Set loading state to true before starting the request
      setIsLoading(true);
      try {
        // Attempt to send the HTTP request and set the response data
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        // Catch and set any error message from the request
        setError(error.message || "Something went wrong!");
      }
      // Set loading state to false after request completes or fails
      setIsLoading(false);
    },
    [url, config]
  );

  // useEffect to automatically send GET requests when the hook mounts or config changes
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  // Return the state and functions to the consuming component
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
