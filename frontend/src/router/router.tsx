import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

const AppRouter = () => (
    <RouterProvider router={router} />
);

export default AppRouter;
