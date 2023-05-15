import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data: [],
    total: 0,
    loading: true,
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
})