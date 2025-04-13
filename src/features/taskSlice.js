import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../url";
import { getHeaders } from "./projectSlice";
export const fetchTasksForProject=createAsyncThunk("fetchtaskProject/tasks",async({token,id})=>{
    const response=await axios.get(`${baseUrl}tasks/projects/auth/${id}`,{
        headers:getHeaders(token)
    })
    console.log(response.data)
    return response.data
})
export const fetchTasks=createAsyncThunk("fetchTasks/tasks",async({token})=>{
    const response=await axios.get(`${baseUrl}tasks/auth`,{
        headers:getHeaders(token)
    })
 
    return response.data
})
export const taskSlice=createSlice({
name:"tasks",
initialState:{
    tasks:[],
    status:'idle',
    error:null
},
reducers:{},
extraReducers:(builder)=>{
builder.addCase(fetchTasksForProject.pending,state=>{
    state.status="loading"
})
builder.addCase(fetchTasksForProject.fulfilled,(state,action)=>{
    state.status="succeeded",
    state.status=action.payload
})
builder.addCase(fetchTasksForProject.rejected,(state,action)=>{
    state.status="error",
    state.error=action.payload
})
builder.addCase(fetchTasks.pending,state=>{
    state.status="loading"
})
builder.addCase(fetchTasks.fulfilled,(state,action)=>{
    state.status="succeeded",
    state.status=action.payload
})
builder.addCase(fetchTasks.rejected,(state,action)=>{
    state.status="error",
    state.error=action.payload
})
}
})