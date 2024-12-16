import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        cartData:[]
    },

    reducers:{
        addToCart(state,action){
            const isItemExist=state.cartData.find((item)=>item._id===action.payload._id)
            if (isItemExist) {
                isItemExist.qty+=1
            } else {
                return{
                    cartData:[...state.cartData,{...action.payload,qty:1}]
                }
            }
        },


        remove(state,action){
            state.cartData=state.cartData.filter((item)=>item._id !== action.payload)
        }, 

        
        Inc(state,action){
            state.cartData.filter((item)=>{
                return (
                    item._id===action.payload ? item.qty+=1: item 
                )
            })
        },

        Dec(state,action){
            state.cartData.filter((item)=>{
                return (
                    item._id===action.payload ? item.qty-=1: item 
                )
            })
        }

    }
})

export const {addToCart  , remove, Inc, Dec} = cartSlice.actions

export const cartReducer = cartSlice.reducer