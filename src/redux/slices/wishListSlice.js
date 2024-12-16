import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "wishlist",
    initialState:{
        wishlistData:[]
    },

    reducers:{

        wishListToCart(state,action){
            const isItemExist=state.wishlistData.find((item)=>item.id===action.payload._id)
            if (isItemExist) {
                isItemExist.qty+=1
            } else {
                return{
                    wishlistData:[...state.wishlistData,{...action.payload,qty:1}]
                }
            }
        },


        remove(state,action){
            state.wishlistData=state.wishlistData.filter((item)=>item._id !== action.payload)
        }, 

    }
})

export const { wishListToCart, remove } = cartSlice.actions

export const wishlistReducer = cartSlice.reducer