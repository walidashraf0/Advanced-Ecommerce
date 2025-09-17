import { cn } from "@/shared/lib";
import styles from "./Spinner.module.scss";

// type SpinnerSize = 'lg' | 'md' | 'sm';
type SpinnerTheme = 'primary' | 'secondary';

interface SpinnerProps {
    // size?: SpinnerSize,
    theme?: SpinnerTheme,
}

const Spinner = ({ theme = 'primary' }: SpinnerProps) => {

    return (
        <div className={cn(styles.wrapper, styles[theme])}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.shadow}></div>
            <div className={styles.shadow}></div>
            <div className={styles.shadow}></div>
        </div>
    )
}

export default Spinner
