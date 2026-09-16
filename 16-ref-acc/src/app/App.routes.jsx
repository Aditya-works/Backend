import {createBrowserRouter} from "react-router"
import Profile from "../modules/auth/pages/profile"
import Register  from "../modules/auth/pages/register"
const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/profile",
        element: <Profile/>
    }
])

export default router