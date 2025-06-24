import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authslice";

const store = configureStore({
    reducer:{
        auth: authSlicer
    }
})

export default store