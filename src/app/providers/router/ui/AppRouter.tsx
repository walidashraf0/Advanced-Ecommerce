import { Suspense } from "react"
import { Route, Routes } from "react-router"

import { PageLoader } from "@/widgets/PageLoader"

import { routerconfig } from "../routerConfig"

export const AppRouter = () => {
    return (
        <Routes>
            {routerconfig.map(({ path, element }) => (
                <Route key={path} path={path} element={<Suspense key={path} fallback={<PageLoader />}>
                    {element}
                </Suspense>} />
            ))}
        </Routes>
    )
}