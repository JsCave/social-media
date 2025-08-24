import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout";
import MainLayout from "./Layouts/MainLayout";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import FeedPage from "./Pages/FeedPage";
import PostDetailsPage from "./Pages/PostDetailsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import ProtectedAuthRoute from "./ProtectedRoutes/ProtectedAuthRoute";




const router=createBrowserRouter([
{path:'',element:<AuthLayout/>,children:[
  {path:'login',element:<ProtectedAuthRoute><LoginPage/></ProtectedAuthRoute>},
{path:'register',element:<ProtectedAuthRoute><RegisterPage/></ProtectedAuthRoute>},
]},
{path:'',element:<MainLayout/>,children:[
{index:true,element:<ProtectedRoute><FeedPage/></ProtectedRoute>},
{path:'post-details/:id',element:<ProtectedRoute><PostDetailsPage/></ProtectedRoute>},
{path:'*',element:<NotFoundPage/>},
]}
])
export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}
