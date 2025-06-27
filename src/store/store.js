import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";

const store = configureStore({
    reducer:{
        auth: authSlice,
        // post: postSlice could be added for better optimization
    }
})

export default store