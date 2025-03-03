import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import ResetScreen from "./auth/ResetScreen"
import { GlobalStyles } from "./styles/global/GlobalStyles";
import MainLayout from "./layouts/MainLayout"
import ProductListScreen from "./screens/product/ProductListScreen"
import AuthRouter from "./middleware/AuthRouter"
import { Toaster } from "sonner"
import AccountScreen from "./screens/user/AccountScreen"
import HomeScreen from "./screens/Home/HomeScreen"
import CartScreen from "./screens/cart/CartScreen"
import WishListScreen from "./screens/user/WishListScreen"
import AddProduct from "./screens/user/AddProduct"
import EditProductDetails from "./components/editProductDetails/Edit"
import NotFoundScreen from "./screens/error/NotFoundScreen"

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<AuthLayout/>,
      children:[
        {
          path:"/sign_in",
          element:<SignIn/>,
        },
        {
          path:"/sign_up",
          element:<SignUp/>
        },  
        {
          path:"/reset",
          element:<ResetScreen/>
        },
      ]
    },
    {
      element:<AuthRouter/>,
      children:[
        {
          path:"/",
          element:<MainLayout/>,
          children:[
            {
              path:"/home",
              element:<HomeScreen/>,
            },
            {
              path:"/product",
              element:<ProductListScreen/>,
            },
            {
              path:"/account",
              element:<AccountScreen/>
            },
            {
              path:"/cart",
              element:<CartScreen/>,
            },
            {
              path:"/wishlist",
              element:<WishListScreen/>
            },
            {
              path:"/order",
              element:<AddProduct/>
            },
            {
              path:"/productDetails/:id",
              element:<EditProductDetails/>
            }
          ]
        }
      ]
    },
    {
      path:"*",
      element:<NotFoundScreen/>
    }
  ])

  return (
    <>
    <GlobalStyles/>
    <Toaster position="top-right" richColors   toastOptions={{
    style: { height:'60px', width:'350px', paddingLeft:'10px' },
    className: 'my-toast',
  }}/>
    <RouterProvider router={router} />
    </>
  )
}

export default App
