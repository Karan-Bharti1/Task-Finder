import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userslice";
import {projectSlice} from "./features/projectSlice";
import { teamSlice } from "./features/teamsSlice";
import { taskSlice } from "./features/taskSlice";

export default configureStore({reducer:{
    user:userSlice.reducer,
    projects:projectSlice.reducer,
    teams:teamSlice.reducer,
    tasks:taskSlice.reducer
}})