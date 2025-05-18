import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";
const getDevHost = () => {
 // If you’re running under Expo (go/client), grab the LAN IP from the bundler
 const debuggerHost = Constants.manifest?.debuggerHost;
 if (debuggerHost) {
  return debuggerHost.split(":")[0]; // e.g. "192.168.1.6"
 }
 // Fallbacks:
 // - Android emulator → 10.0.2.2
 // - iOS simulator & bare RN iOS → localhost
 // - Physical devices without Expo → you’ll need your LAN IP here
 return Platform.OS === "android" ? "10.0.2.2" : "localhost";
};

const API_BASE_URL = `http://${getDevHost()}:7777/api`;

const apiClient = axios.create({
 baseURL: API_BASE_URL,
 timeout: 10000,
 headers: {
  "Content-Type": "application/json",
  'x-auth-token':
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlODE5ODQwYjBkNGM0YjU0ZWUwMDkzIn0sImlhdCI6MTc0NTA1OTkzMiwiZXhwIjoxNzQ1MDYzNTMyfQ.-FfC9bFEnvSGPCiwNuW-q4e40z9si1vDFntrwVrVXmc",
 },
});

apiClient.interceptors.request.use(
 (config) => {
  // You can modify the request config here, e.g., add auth token
  // const token = await getTokenFromStorage(); // Example: AsyncStorage or SecureStore
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
 },
 (error) => {
  return Promise.reject(error);
 }
);

apiClient.interceptors.response.use(
 (response) => {
  return response.data;
 },
 (error) => {
  console.log(error, "error in API");
  const errorMessage =
   error.response?.data?.message ||
   error.message ||
   "Something went wrong. Please try again.";
  if (error.response) {
   switch (error.response.status) {
    case 400:
     console.error("Bad Request:", errorMessage);
     break;
    case 401:
     console.error("Unauthorized:", errorMessage);
     break;
    case 403:
     console.error("Forbidden:", errorMessage);
     break;
    case 404:
     console.error("Not Found:", errorMessage);
     break;
    case 500:
     console.error("Server Error:", errorMessage);
     break;
    default:
     console.error("API Error:", errorMessage);
   }
  } else if (error.request) {
   // No response received (e.g., network error)
   console.error("Network Error:", "No response received from server.", error);
  } else {
   // Error setting up the request
   console.error("Request Setup Error:", errorMessage);
  }

  return Promise.reject(errorMessage);
 }
);

export default apiClient;
