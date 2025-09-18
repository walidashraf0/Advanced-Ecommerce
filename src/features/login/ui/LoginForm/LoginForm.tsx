import MailIcon from "@/shared/assets/icons/Mail.svg?react"
import PhoneIcon from "@/shared/assets/icons/Phone.svg?react"
import ArrowRight from "@/shared/assets/icons/ArrowRight.svg?react"

import { AppIcon, Button, Input, PhoneInput, Tabs } from "@/shared/ui"
import styles from "./loginForm.module.scss"
import { AuthMethod, routePaths } from "@/shared/config"
import type { FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { selectLoginEmail } from "../../model/selectors/selectLoginEmail/selectLoginEmail"
import { selectLoginPhone } from "../../model/selectors/selectLoginPhone/selectLoginPhone"
import { selectLoginPassword } from "../../model/selectors/selectLoginPassword/selectLoginPassword"
import { selectLoginMethod } from "../../model/selectors/selectLoginMethod/selectLoginMethod"
import { loginActions } from "../../model/slice/loginSlice"
import { login } from "../../model/services/login"
import { useNavigate } from "react-router"
import { selectLoginIsLoading } from "../../model/selectors/selectLoginIsLoading/selectLoginIsLoading"
import { selectLoginError } from "../../model/selectors/selectLoginError/selectLoginError"


const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const email = useAppSelector(selectLoginEmail);
    const phone = useAppSelector(selectLoginPhone);
    const password = useAppSelector(selectLoginPassword);
    const method = useAppSelector(selectLoginMethod);
    const isLoading = useAppSelector(selectLoginIsLoading);
    const error = useAppSelector(selectLoginError);

    const handleChangeEmail = (value: string) => {
        dispatch(loginActions.setEmail(value))
    }
    const handleChangePhone = (value: string) => {
        dispatch(loginActions.setPhone(value))
    }
    const handleChangePassword = (value: string) => {
        dispatch(loginActions.setPassword(value))
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await dispatch(login({ email, phone, password }))
        if (login.fulfilled.match(result)) {
            navigate(routePaths.home)
        }
    }

    const handleTabChange = () => {
        dispatch(loginActions.setMethod(method === AuthMethod.EMAIL ? AuthMethod.PHONE : AuthMethod.EMAIL))
        dispatch(loginActions.resetForm())
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Tabs onChange={handleTabChange} defaultValue={method}>
                <Tabs.List>
                    <Tabs.Trigger value={AuthMethod.EMAIL}>
                        <AppIcon Icon={MailIcon} />
                        Email
                    </Tabs.Trigger>
                    <Tabs.Trigger value={AuthMethod.PHONE}>
                        <AppIcon Icon={PhoneIcon} />
                        Phone
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value={AuthMethod.EMAIL}>
                    <Input error={!!error} label="Email" onChange={handleChangeEmail} value={email} type="email" className={styles.input} placeholder="Enter Your Email" />
                </Tabs.Content>
                <Tabs.Content value={AuthMethod.PHONE}>
                    <PhoneInput label="Phone" onChange={handleChangePhone} value={phone} className={styles.input} placeholder="Enter Your Phone" />
                </Tabs.Content>
            </Tabs>
            <Input label="Password" onChange={handleChangePassword} value={password} type="password" className={styles.input} placeholder="Enter Your Password" />
            {error && (
                <div className={styles.error}>{error}</div>
            )}
            <Button isLoading={isLoading} fullWidth type="submit" className={styles.button} size="md">
                Login <AppIcon Icon={ArrowRight} />
            </Button>
        </form>
    )
}

export default LoginForm
