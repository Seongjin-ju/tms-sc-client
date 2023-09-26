import Root from "./Root";
import { MONITORING_SUB_MENU, RouterMenus, SMART_CROSS_WORK } from "./RouterMenus";

import { Navigate, createBrowserRouter } from "react-router-dom";

const { VITE_BASE_URL } = import.meta.env;

/** router 객체 */
const router = createBrowserRouter(
    [
        {
            element: <Root />,
            children: RouterMenus,
        },
        {
            path: "/",
            element: <Navigate replace to={`${SMART_CROSS_WORK}/${MONITORING_SUB_MENU}`} />,
        },
        {
            path: "*",
            element: <Navigate replace to={`${SMART_CROSS_WORK}/${MONITORING_SUB_MENU}`} />,
        },
    ],
    { basename: VITE_BASE_URL },
);

export default router;
