import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../url";
import { getHeaders } from "./projectSlice";
 export const fetchTags=createAsyncThunk("fetchtags/tags",async({token})=>{
  
  const response=await axios.get(`${baseUrl}tags/auth`,{
    headers:getHeaders(token)
  })  

  return response.data
})
export const tagSlice=createSlice({
 name:'tags',
 initialState:{
    tags:[],
    status:'idle',
    error:null
},
reducers:{},
extraReducers:(builder)=>{
   builder.addCase(fetchTags.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(fetchTags.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.tags=action.payload
        })
        builder.addCase(fetchTags.rejected,(state,action)=>{
            state.status="error"
            state.error=action.payload
        })
}
})
export default tagSlice.reducer;