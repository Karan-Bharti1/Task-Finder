import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, userUrl } from "../url";
import { getHeaders } from "./projectSlice";
export const signUpUser=createAsyncThunk("signUp/user",async(data)=>{
    const response=await axios.post(userUrl,data,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        }
    })
    return response.data
})
export const fetchUsers=createAsyncThunk("fetchEmails/user",async()=>{
const response=await axios.get(`${baseUrl}users`)
return response.data
})
export const fetchAllUsers=createAsyncThunk("fetchusers/user",async({token})=>{
    const response=await axios.get(`${baseUrl}users/auth`,{
        headers:  getHeaders(token)
    })
    return response.data
    })
export const userSlice=createSlice({
    name:"user",
   initialState:{
    user:[],
     status:"idle",
    error:null
} ,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,state=>{
            state.status="loading"
        })
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.status="succeeded"
            console.log(action.payload)
            state.user=action.payload.emailIds
            
        })
        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.status="error"
            state.error=action.payload
        })

        builder.addCase(signUpUser.pending,state=>{
            state.status="loading"
        })
        builder.addCase(signUpUser.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.user.push(action.payload);
            
            
        })
        builder.addCase(signUpUser.rejected,(state,action)=>{
            state.status="error"
            state.error=action.payload
        })
        builder.addCase(fetchAllUsers.pending,state=>{
            state.status="loading"
        })
        builder.addCase(fetchAllUsers.fulfilled,(state,action)=>{
            state.status="succeeded"
           
            state.user=action.payload
            
        })
        builder.addCase(fetchAllUsers.rejected,(state,action)=>{
            state.status="error"
            state.error=action.payload
        })
    }
})
export default userSlice.reducer