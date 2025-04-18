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

const response=await axios.get(`${baseUrl}projects/auth`,
  {
    'Content-Type': 'application/json',
    'authorization':`${token}`
  }
)
console.log(response)
return response.data
})
export const addProject=createAsyncThunk("addProjects/projects",async({token,postData})=>{
   console.log(token)

      try{
        console.log(postData)
        const response = await axios.post(`${baseUrl}projects/auth`,postData, {
        
            headers:{'Content-Type':'application/json',
                'authorization':`Bearer ${token}`}
          })
        
        console.log(response.data)
        return response.data
      }catch(error){
        console.log(error)
      }
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