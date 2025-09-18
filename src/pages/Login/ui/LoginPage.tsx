import { LoginForm, loginReducer } from "@/features/login";
import styles from "./LoginPage.module.scss";
import { DynamicModuleLoader } from "@/shared/lib";

const LoginPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <h1 className={styles.title}>Sign In</h1>
          <DynamicModuleLoader reducers={{ loginForm: loginReducer }} removeAfterUnmount>
            <LoginForm />
          </DynamicModuleLoader>
        </div>
      </div>
    </>
  )
}

export default LoginPage
