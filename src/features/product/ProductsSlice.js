import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    products:[],
}

export const getProducts = createAsyncThunk('product/getProduct', async()=>{
    const response = await axios.get('http://localhost:4200/product');
    return response.data;
});

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:{
        [getProducts.fulfilled]: (state,action) =>{
            state.products = action.payload;
        }
    }
});

export const { } = productSlice.actions;
export default productSlice.reducer;