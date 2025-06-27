import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlice.js";

const store = configureStore({
    reducer:{
        auth: authSlicer
    }
})

export default store