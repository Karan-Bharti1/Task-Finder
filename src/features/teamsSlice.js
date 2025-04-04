import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHeaders } from "./projectSlice";
import axios from "axios";
import { baseUrl } from "../url";
export const fetchTeams=createAsyncThunk("fetchTeams/teams",async({token})=>{
const headers=getHeaders(token)
const response=await axios.get(`${baseUrl}teams/auth`,{
    headers:headers
})
return response.data
})
export const teamSlice=createSlice({
    name:"teams",
    initialState:{
        teams:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
  builder.addCase(fetchTeams.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(fetchTeams.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.teams=action.payload
        })
        builder.addCase(fetchTeams.rejected,(state,action)=>{
            state.status="error"
            state.error=action.payload
        })
    }
})
export default teamSlice.reducer