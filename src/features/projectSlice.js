import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../url";
import axios from "axios";
export const getHeaders = (token) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return headers;
  };

export const fetchProjects=createAsyncThunk("fetchProjects/projects",async({token})=>{
console.log(token)
const response=await axios.get(`${baseUrl}projects/auth`,{
    headers:getHeaders(token)
})
return response.data
})
export const addProject=createAsyncThunk("addProject/projects",async({token,postData})=>{
   
    console.log(getHeaders(token))
    const response = await axios.post(`${baseUrl}projects/auth`,postData, {
        headers: getHeaders(token)
      })

    return response.data
})
export const projectSlice=createSlice({
    name:"projects",
    initialState:{
        projects:[],
        status:"Idle",
        error:null
    },
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(fetchProjects.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(fetchProjects.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.projects=action.payload
        })
        builder.addCase(fetchProjects.rejected,(state,action)=>{
            state.status="error"
            state.error=action.payload
        })
        builder.addCase(addProject.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(addProject.fulfilled,(state,action)=>{
            state.status="succeeded"
         
            state.projects.push(action.payload)
            console.log(action.payload,"Karan")
        })
        builder.addCase(addProject.rejected,(state,action)=>{
            state.status="error"
            state.error=action.payload
        })

    }

})
export default projectSlice.reducer