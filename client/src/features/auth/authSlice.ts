import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { APIError, LoginForm, RegisterForm } from "../../types/auth";

export const loginUser = createAsyncThunk('auth/login', async(formdata:LoginForm, thunkAPI)=>{
    try {
        const response = await api.post('/users/login',formdata);
        return response.data;
    } catch (error:unknown) {
        const err = error as APIError;
        return thunkAPI.rejectWithValue(err?.response?.data?.message || "Login Failed");
    }
});

export const registerUser = createAsyncThunk('auth/register',async(formdata:RegisterForm, thunkAPI)=>{
    try {
        const response = await api.post("/users/register",formdata);
        return response.data;
    } catch (error:unknown) {
        const err = error as APIError;
        return thunkAPI.rejectWithValue(err?.response?.data?.message || "registration Failed")
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null as string | null,
    },
    reducers:{
        logout:(state)=>{
            state.user = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers:(builder)=>{
        builder
            //login thunk
            .addCase(loginUser.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.user = action.payload;
                state.loading= false;
                localStorage.setItem("token",action.payload.token)
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })
            //register thunk
            .addCase(registerUser.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const {logout} = authSlice.actions;
export default  authSlice.reducer;


