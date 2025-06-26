import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlice";

const store = configureStore({
    reducer:{
        auth: authSlicer
    }
})

export default store