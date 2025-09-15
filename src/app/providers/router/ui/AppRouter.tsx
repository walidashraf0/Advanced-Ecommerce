import { Route, Routes } from "react-router"
import { routerconfig } from "../routerConfig"
import { Suspense } from "react"
import { PageLoader } from "@/widgets/PageLoader"

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