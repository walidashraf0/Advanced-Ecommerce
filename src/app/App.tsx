import { Suspense, useEffect } from "react"

import { AppRouter } from "./providers"
import { useAppDispatch } from "@/shared/lib"
import { refreshsession, userActions } from "@/entities/user"
import { setAuthFailureHandler } from "@/shared/Api"


function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(userActions.initUserData())
    dispatch(refreshsession())
    setAuthFailureHandler(() => {
      dispatch(userActions.clearUserData())
    })
  }, [dispatch])

  return (
    <>
      <Suspense fallback={<></>}>
        <AppRouter />
      </Suspense>
    </>
  )
}

export default App
