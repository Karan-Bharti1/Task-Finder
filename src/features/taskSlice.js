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
export const fetchTasksForTeams=createAsyncThunk("fetchtaskTeams/tasks",async({token,id})=>{
    const response=await axios.get(`${baseUrl}tasks/teams/auth/${id}`,{
        headers:getHeaders(token)
    })
    console.log(response.data)
    return response.data
})
export const fetchTasks=createAsyncThunk("fetchTasks/tasks",async({token,key,value,key1,value1,key2,value2,key3,value3,key4,value4})=>{
    console.log(token)
    console.log(getHeaders(token))
    const response=await axios.get(`${baseUrl}tasks/auth?${key}=${value}&${key1}=${value1}&${key2}=${value2}&${key3}=${value3}&${key4}=${value4}`,{
        headers:getHeaders(token)
    })

    return response.data
})
export const editTasks=createAsyncThunk("edittasks/tasks",async({token,id,task})=>{
    const response=await axios.put(`${baseUrl}tasks/auth/${id}`,task,{headers:getHeaders(token)})
    return response.data
})
export const addTasks=createAsyncThunk("addTasks/tasks",async({token,postData})=>{
    const response=await axios.post(`${baseUrl}tasks/auth`,postData,{
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
    state.tasks=action.payload
})
builder.addCase(fetchTasksForProject.rejected,(state,action)=>{
    state.status="error",
    state.error=action.payload
})
builder.addCase(fetchTasksForTeams.pending,state=>{
    state.status="loading"
})
builder.addCase(fetchTasksForTeams.fulfilled,(state,action)=>{
    state.status="succeeded",
    state.tasks=action.payload
})
builder.addCase(fetchTasksForTeams.rejected,(state,action)=>{
    state.status="error",
    state.error=action.payload
})
builder.addCase(fetchTasks.pending,state=>{
    state.status="loading"
})
builder.addCase(fetchTasks.fulfilled,(state,action)=>{
    state.status="succeeded",
    state.tasks=action.payload
})
builder.addCase(fetchTasks.rejected,(state,action)=>{
    state.status="error",
    state.error=action.payload
})
builder.addCase(addTasks.pending,state=>{
              state.status="loading"
        })
        builder.addCase(addTasks.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.tasks.push(action.payload)
        })
        builder.addCase(addTasks.rejected,(state,action)=>{
            state.status="error"
            state.error=action.payload
        })
        builder.addCase(editTasks.pending,state=>{
            state.status="loading"
        })
        builder.addCase(editTasks.fulfilled,(state,action)=>{
            state.status="succeeded"
            const index=state.tasks.findIndex(task=>task._id===action.payload._id)
            console.log("Before Update:", state.tasks[index]);
            if(index!=-1){
        state.tasks[index]=action.payload
            }   
            console.log("After Update:", state.tasks[index]);
        })
        builder.addCase(editTasks.rejected,(state,action)=>{
            state.status="error"
            state.error=action.payload
        })
}
})
export default taskSlice.reducer