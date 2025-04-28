import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../url";
import { getHeaders } from "./projectSlice";
export const fetchTotalTasksClosedInLastWeek=createAsyncThunk("fetchtasks/reports",async({token})=>{
const response=await axios.get(`${baseUrl}report/lastweek`,{
    headers:getHeaders(token)
})
return response.data
})
export const reportsSlice=createSlice({
    name:"reports",
    initialState:{
tasks:[],
status:"idle",
error:null
    },
 reducers:{},
extraReducers:(builder)=>{
builder.addCase(fetchTotalTasksClosedInLastWeek.pending,(state)=>{
    state.status="loading"
})
 builder.addCase(fetchTotalTasksClosedInLastWeek.fulfilled,(state,action)=>{
            state.status="succeeded"
           
            state.tasks=action.payload
            
        })
  builder.addCase(fetchTotalTasksClosedInLastWeek.rejected,(state,action)=>{
            state.status="error"
            state.error=action.payload
        })
}
})
export default reportsSlice.reducer