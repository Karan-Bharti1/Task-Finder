import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userslice";
import {projectSlice} from "./features/projectSlice";

export default configureStore({reducer:{
    user:userSlice.reducer,
    projects:projectSlice.reducer
}})