import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const CartSlice = createSlice({
    name: 'CartSlice',
    initialState,
    reducers: {
        // add to cart
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        removeToCart:(state,action)=>{
           const data =  state.cart.filter((item)=>item.id !== action.payload)  
           state.cart = data;
        },
        clearAll:(state)=>{
            state.cart=[]
        }
    }
});
export const {addToCart,removeToCart,clearAll} = CartSlice.actions;
export default CartSlice.reducer