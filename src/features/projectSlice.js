import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../url";
import axios from "axios";
const headers={
    'Content-Type':'application/json'
}
export const fetchProjects=createAsyncThunk("fetchProjects/projects",async({token})=>{
    
if(token){
    headers.Authorization=`Bearer ${token}`
}
const response=await axios.get(`${baseUrl}projects/auth`,{
    headers:headers
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

    }

})
export default projectSlice.reducer