import { Button, Input, Tabs } from "@/shared/ui"
import styles from "./loginForm.module.scss"
import { AuthMethod } from "@/shared/config"
const LoginForm = () => {
    return (
        <form className={styles.form}>
            <Tabs defaultValue={AuthMethod.EMAIL}>
                <Tabs.List>
                    <Tabs.Trigger value={AuthMethod.EMAIL}>
                        Email
                    </Tabs.Trigger>
                    <Tabs.Trigger value={AuthMethod.PHONE}>
                        Phone
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value={AuthMethod.EMAIL}>
                    <label className={styles.label}>Email</label>
                    <Input type="email" className={styles.input} placeholder="Enter Your Email" />
                </Tabs.Content>
                <Tabs.Content value={AuthMethod.PHONE}>
                    <label className={styles.label}>Phone</label>
                    <Input className={styles.input} placeholder="Enter Your Phone" />
                </Tabs.Content>
            </Tabs>
            <label className={styles.label}>Password</label>
            <Input type="password" className={styles.input} placeholder="Enter Your Password" />
            <Button fullWidth type="submit" className={styles.button} size="md">Login</Button>
        </form>
    )
}

export default LoginForm
