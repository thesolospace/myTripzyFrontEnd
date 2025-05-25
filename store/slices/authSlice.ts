// src/store/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "api/authApi";
import Toast from "react-native-toast-message";


// Existing thunks for OTP
export const requestOtp = createAsyncThunk(
 "auth/requestOtp",
 async (phoneNumber: any, { rejectWithValue }) => {
  try {
   const response = await authApi.requestOtp(phoneNumber);
   if (!response || !response.data) throw new Error("Invalid response");
   return response;
  } catch (error: any) {
   console.log(error, "error in requestOtp");
   return rejectWithValue(error.message || "Failed to request OTP");
  }
 }
);

export const verifyUserOtp = createAsyncThunk(
 "auth/verifyOtp",
 async (otpData: any, { rejectWithValue }) => {
  try {
   const response = await authApi.verifyOtp(otpData);

   if (!response || !response.data) throw new Error("Invalid response");
   return response;
  } catch (error: any) {
   return rejectWithValue(error.message || "Failed to verify OTP");
  }
 }
);

// New registration thunk
export const registerUser = createAsyncThunk(
 "auth/register",
 async (userData, { rejectWithValue }) => {
  try {
   const response = await authApi.register(userData);
   console.log(response, "responseresponseresponse");
   if (!response || !response.data) throw new Error("Invalid response");
   return response;
  } catch (error: any) {
   console.log(error, "error in registerUser");
   return rejectWithValue(error.message || "Failed to register");
  }
 }
);

const  initialState = {
  phoneNumber: "",
  otp: "",
  verifyOtp: "",
  showOTP: false,
  timeLeft: 60,
  loading: false,
  isChecked: false,
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    userType: "",
    gender: "",
  },
  token: "",
  error: null,
  isNewUser: false,
};

const authSlice = createSlice({
 name: "auth",
 initialState: {
  phoneNumber: "",
  otp: "",
  verifyOtp: "",
  showOTP: false,
  timeLeft: 60,
  loading: false,
  isChecked: false,
  user: {
   id: "",
   firstName: "",
   lastName: "",
   email: "",
   phoneNumber: "",
   userType: "",
   gender: "",
  },
  token: "",
  error: null,
  isNewUser: false,
 },
 reducers: {
  setPhoneNumber: (state, action) => {
   state.phoneNumber = action.payload;
  },
  setOtp: (state, action) => {
   state.otp = action.payload;
  },
  setShowOTP: (state, action) => {
   state.showOTP = action.payload;
  },
  setTimeLeft: (state, action) => {
   state.timeLeft = action.payload;
  },
  setIsChecked: (state, action) => {
   state.isChecked = action.payload;
  },
  resetAuth: (state) => {
   state.phoneNumber = "";
   state.otp = "";
   state.verifyOtp = "";
   state.showOTP = false;
   state.timeLeft = 60;
   state.isChecked = false;
   state.error = null;
  },
  logout: () => initialState,
 },
 extraReducers: (builder) => {
  builder
   .addCase(requestOtp.pending, (state: any) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(requestOtp.fulfilled, (state: any, action: any) => {
    state.loading = false;
    state.showOTP = true;
    state.verifyOtp = action.payload.data.otp;
    Toast.show({
     type: "success",
     text1: "OTP Sent",
     text2: "Check your messages",
    });
   })
   .addCase(requestOtp.rejected, (state: any, action: any) => {
    state.loading = false;
    state.error = action.payload;
    Toast.show({
     type: "error",
     text1: "Error",
     text2: action.payload,
    });
   })
   .addCase(verifyUserOtp.pending, (state: any) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(verifyUserOtp.fulfilled, (state: any, action: any) => {
    state.loading = false;
    const { newUser, token, user, phoneNumber } = action.payload.data;
    if (newUser) {
     state.isNewUser = newUser;
     state.phoneNumber = phoneNumber;
    } else {
     state.token = token;
     state.user = user;
    }
    Toast.show({
     type: "success",
     text1: newUser ? "Verification Successful" : "Login Successful",
     text2: newUser
      ? "Please complete your registration"
      : `Welcome back, ${user.firstName}!`,
    });
   })
   .addCase(verifyUserOtp.rejected, (state: any, action: any) => {
    state.loading = false;
    state.error = action.payload;
    Toast.show({
     type: "error",
     text1: "Verification Error",
     text2: action.payload,
    });
   })
   .addCase(registerUser.pending, (state: any) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(registerUser.fulfilled, (state: any, action: any) => {
    state.loading = false;
    const { token, user } = action.payload.data;
    state.token = token;
    state.user = user;
    Toast.show({
     type: "success",
     text1: "Registration Successful",
     text2: `Welcome, ${user.firstName}!`,
    });
   })
   .addCase(registerUser.rejected, (state: any, action: any) => {
    state.loading = false;
    state.error = action.payload;
    Toast.show({
     type: "error",
     text1: "Registration Error",
     text2: action.payload,
    });
   });
 },
});

export const {
 setPhoneNumber,
 setOtp,
 setShowOTP,
 setTimeLeft,
 setIsChecked,
 resetAuth,
 logout
} = authSlice.actions;

export default authSlice.reducer;
