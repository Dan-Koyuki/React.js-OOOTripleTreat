import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  list: [],
  status: null,
  deleteStatus: null,
};

export const userFetch = createAsyncThunk("users/userFetch", async () => {
  try {
    const response = await axios.get(`${url}/users`, setHeaders());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const userDelete = createAsyncThunk("users/userDelete", async (id) => {
  try {
    const response = await axios.delete(`${url}/users/${id}`, setHeaders());

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    toast.error(error.response?.data,{
      position: 'bottom-left',
    })
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(userFetch.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "success";
      })
      .addCase(userFetch.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(userDelete.pending, (state, action) => {
        state.deleteStatus = "pending";
      })
      .addCase(userDelete.fulfilled, (state, action) => {
        const newList = state.list.filter(
          (user) => user._id !== action.payload._id
        );
        state.list = newList;
        state.deleteStatus = "success";
        toast.error("User Deleted!", {
          position: 'bottom-left'
        })
      })
      .addCase(userDelete.rejected, (state, action) => {
        state.deleteStatus = "rejected";
      });
  }
});

export default usersSlice.reducer;


