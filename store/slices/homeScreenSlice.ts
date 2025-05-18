// src/store/homeScreenSlice.js


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { homeScreenApi } from "api/homeScreenApi";
import Toast from "react-native-toast-message";

// Existing thunks for OTP
export const getTripList = createAsyncThunk(
  "api/trips",
  async (any, { rejectWithValue }:any) => {
    console.log("check 1")
    try {
      console.log("check 2")
      const response = await homeScreenApi.homeScreenTripList();
      console.log("check 3")
      console.log(response,"response")
      if (!response || !response.data) throw new Error("Invalid response");
      console.log("check 4")
      return response;
    } catch (error:any) {
      console.log("check 5")
      console.log(error,"error in getTripList")
      return rejectWithValue(error.message || "Failed to getTripList");

    }
    finally{
      console.log("check 6")
    }
  }
);


const homeScreenSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    tripList:[],
    selectedTrip: {},    
    phoneNumber: "",
    otp: "",
    verifyOtp: "",
    showOTP: false,
    timeLeft: 60,

    isChecked: false,
    user: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      userType: '',
      gender: ''

    },
    token: "",
    error: null,
    isNewUser: false,
  },
  reducers: {
    setSelectedTrip(state, action) {
      state.selectedTrip = action.payload;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTripList.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTripList.fulfilled, (state:any, action:any) => {
        state.loading = false;
       
        state.tripList = action.payload.data
       
      })
      .addCase(getTripList.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.payload;
        Toast.show({
          type: "error",
          text1: "Error",
          text2: action.payload,
        });
      })
     
   
  },
});

export const {
  setSelectedTrip,
  setOtp,
  setShowOTP,
  setTimeLeft,
  setIsChecked,
  resetAuth,
} = homeScreenSlice.actions;

export default homeScreenSlice.reducer;
