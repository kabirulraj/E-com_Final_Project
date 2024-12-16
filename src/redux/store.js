import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import { cartReducer } from "../redux/slices/cartSlice";
import { wishlistReducer } from "./slices/wishListSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
