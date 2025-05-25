// src/store/homeScreenSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { homeScreenApi } from "api/homeScreenApi";
import Toast from "react-native-toast-message";

// Existing thunks for OTP
export const getTripList = createAsyncThunk(
 "api/trips",
 async (any, { rejectWithValue }: any) => {
  try {
   const response = await homeScreenApi.homeScreenTripList();

   if (!response || !response.data) throw new Error("Invalid response");
   
   return response;
  } catch (error: any) {
   console.log(error, "error in getTripList");
   return rejectWithValue(error.message || "Failed to getTripList");
  } finally {
   console.log("check 6");
  }
 }
);

export const getFilteredTripList = createAsyncThunk(
 "api/search",
 async (filters: any = {}, { rejectWithValue }) => {
  try {
    console.log(filters,"filtersfilters")
   const response = await homeScreenApi.filteredTripSearch(filters);
       console.log("filtersfilters",response, response.data?.trips)
   if (!response?.success) throw new Error("Invalid response");

   if( response.data?.trips?.length<0){
    navigator.navigate("homescreen")
   }
   return response.data;
  } catch (error: any) {
    console.log(error,"filtersfiltersfiltersfilters")
   return rejectWithValue(error.message || "Failed to search trips");
  }
 }
);
const homeScreenSlice = createSlice({
 name: "auth",
 initialState: {
  loading: false,
  tripList: [],
  searchTrips: {},
  selectedTrip: {},
  phoneNumber: "",
  otp: "",
  verifyOtp: "",
  showOTP: false,
  timeLeft: 60,

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
   .addCase(getTripList.pending, (state: any) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getTripList.fulfilled, (state: any, action: any) => {
    state.loading = false;

    state.tripList = action.payload.data;
   })
   .addCase(getTripList.rejected, (state: any, action: any) => {
    state.loading = false;
    state.error = action.payload;
    Toast.show({
     type: "error",
     text1: "Error",
     text2: action.payload,
    });
   })
   .addCase(getFilteredTripList.pending, (state: any) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getFilteredTripList.fulfilled, (state: any, action: any) => {
    state.loading = false;
    state.searchTrips = action.payload;
   })
   .addCase(getFilteredTripList.rejected, (state: any, action: any) => {
    state.loading = false;
    state.error = action.payload;
    Toast.show({
     type: "error",
     text1: "Search Error",
     text2: action.payload,
    });
   });
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
