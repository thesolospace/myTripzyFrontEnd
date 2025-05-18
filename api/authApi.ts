// src/api/authApi.js

import apiClient from ".";


export const authApi = {
  requestOtp: async (phoneNumber) => {
    return apiClient.post("/auth/request-otp", { phoneNumber });
    
  },

  verifyOtp: async ({ phoneNumber, otp, verifyOtp, deviceId, fcmToken }) => {
    return apiClient.post("/auth/verify-otp", {
      phoneNumber,
      otp,
      verifyOtp,
      deviceId,
      fcmToken,
    });
  },

  register: async (userData:any ) => {
    return apiClient.post("/auth/register", userData);
  },
};