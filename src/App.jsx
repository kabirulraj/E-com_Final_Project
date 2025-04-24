import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { GlobalStyles } from "./styles/global/GlobalStyles";
import { Toaster } from "sonner"
import { lazy, Suspense } from "react";
import Loader from "./Components/Loader/Loader"
const AuthLayout = lazy(() => import("./layouts/AuthLayout"))
const SignIn = lazy(() => import("./auth/SignIn"))
const SignUp = lazy(() => import("./auth/SignUp"))
const ResetScreen = lazy(() => import("./auth/ResetScreen"))
const MainLayout = lazy(() => import("./layouts/MainLayout"))
const ProductListScreen = lazy(() => import("./screens/product/ProductListScreen"))
const AuthRouter = lazy(() => import("./middleware/AuthRouter"))
const AccountScreen = lazy(() => import("./screens/user/AccountScreen"))
const HomeScreen = lazy(() => import("./screens/home/HomeScreen"))
const CartScreen = lazy(() => import("./screens/cart/CartScreen"))
const WishlistScreen = lazy(() => import("./screens/user/WishListScreen"))
const AddProduct = lazy(() => import("./screens/user/AddProduct"))
const EditProductDetails = lazy(() => import("./components/editProductDetails/Edit"))
import NotFoundScreen from "./screens/error/NotFoundScreen"

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:(<Suspense fallback={<Loader/>}>
        <AuthLayout/>
      </Suspense>),
      children:[
        {
          path:"/sign_in",
          element:
          (<Suspense fallback={<Loader/>}>
            <SignIn/>
          </Suspense>)
        },
        {
          path:"/sign_up",
          element:
          (<Suspense fallback={<Loader/>}>
            <SignUp/>
          </Suspense>)
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
              element:
              (<Suspense fallback={<Loader/>}>
                <HomeScreen/>
              </Suspense>)
            },
            {
              path:"/product",
              element:
              (<Suspense fallback={<Loader/>}>
                <ProductListScreen/>
              </Suspense>)
            },
            {
              path:"/account",
              element:
              (<Suspense fallback={<Loader/>}>
                <AccountScreen/>
              </Suspense>)
            },
            {
              path:"/cart",
              element:
              (<Suspense fallback={<Loader/>}>
               <CartScreen/>
              </Suspense>)
            },
            {
              path:"/wishlist",
              element:
              (<Suspense fallback={<Loader/>}>
                <WishlistScreen/>
               </Suspense>)
            },
            {
              path:"/order",
              element:
              (<Suspense fallback={<Loader/>}>
                <AddProduct/>
               </Suspense>)
            },
            {
              path:"/productDetails/:id",
              element:
              (<Suspense fallback={<Loader/>}>
                <EditProductDetails/>
               </Suspense>)
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
