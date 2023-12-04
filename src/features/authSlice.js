import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  token: localStorage.getItem("token"),
  name: '',
  email: '',
  _id: '',
  registerStatus: '',
  registerError: '',
  loginStatus: '',
  loginError: '',
  userLoad: false
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, {rejectWithValue}) => {
    try {
      const token = await axios.post("http://localhost:5000/api/register", {
        name: values.name,
        email: values.email,
        password: values.password
      });
      
      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return {...state, registerStatus: "pending"};
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload){

        const user = jwtDecode(action.payload);

        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: "success"
        }
      } else return state
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return{
        ...state,
        registerStatus: "rejected",
        registerError: action.payload
      };
    });
  },
});

export default authSlice.reducer;