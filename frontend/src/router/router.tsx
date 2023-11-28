import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Upload from "../components/upload/upload";
import Qna from "../components/qna/qna";

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
        ],
    },
]);

const AppRouter = () => (
    <RouterProvider router={router} />
);

export default AppRouter;
