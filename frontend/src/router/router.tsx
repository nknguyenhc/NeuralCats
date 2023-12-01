import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Upload from "../components/upload/upload";
import Qna from "../components/qna/qna";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Requests from "../components/requests/requests";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/upload",
                element: <Upload />,
            },
            {
                path: "/",
                element: <Qna />,
            },
            {
                path: "/user/login",
                element: <Login />
            },
            {
                path: "/user/register",
                element: <Register />,
            },
            {
                path: "/requests",
                element: <Requests />,
            },
        ],
    },
]);

const AppRouter = () => (
    <RouterProvider router={router} />
);

export default AppRouter;
