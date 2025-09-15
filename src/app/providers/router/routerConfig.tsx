import { HomePage } from "@/pages/Home";
import { LoginPage } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import { AppRoutes, routePaths } from "@/shared/config";
import type { RouteProps } from "react-router";



export const routerconfig: RouteProps[] = [
    {
        path: routePaths[AppRoutes.HOME],
        element: <HomePage />
    },
    {
        path: routePaths[AppRoutes.LOGIN],
        element: <LoginPage />
    },
    {
        path: routePaths[AppRoutes.NOT_FOUND],
        element: <NotFound />
    },
]