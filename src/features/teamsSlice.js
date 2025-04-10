import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHeaders } from "./projectSlice";
import axios from "axios";
import { baseUrl } from "../url";
export const fetchTeams=createAsyncThunk("fetchTeams/teams",async(token)=>{
const headers=getHeaders(token)
const response=await axios.get(`${baseUrl}teams/auth`,{
    headers:headers
})
return response.data
})
 export const addTeams=createAsyncThunk("addTeams/teams",async({token,postData})=>{
    try {
        const response=await axios.post(`${baseUrl}teams/auth`,postData,{
            headers:getHeaders(token)
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
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
        builder.addCase(addTeams.pending,state=>{
              state.status="loading"
        })
        builder.addCase(addTeams.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.teams=action.payload
        })
        builder.addCase(addTeams.rejected,(state,action)=>{
            state.status="error"
            state.error=action.payload
        })
    }
})
export default teamSlice.reducer