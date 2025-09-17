import type { ButtonHTMLAttributes, ReactNode } from "react"

import { cn } from "@/shared/lib";

import styles from './Button.module.scss';
import Spinner from "../Spinner/Spinner";

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
type ButtonForm = 'rounded' | 'pill' | 'circle';
type ButtonTheme = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode,
    className?: string,
    size?: ButtonSize,
    form?: ButtonForm,
    theme?: ButtonTheme,
    disabled?: boolean,
    fullWidth?: boolean,
    isLoading?: boolean,
}
const Button = ({ children, className, isLoading = false, fullWidth = false, size = 'sm', form = 'pill', theme = 'primary', disabled = false, ...rest }: ButtonProps) => {
    return (
        <button {...rest} disabled={disabled} className={cn(styles.button, className, styles[size], styles[form], styles[theme], { [styles.disabled]: disabled, [styles.fullWidth]: fullWidth, [styles.isLoading]: isLoading, })}>
            {isLoading ? <Spinner theme="secondary" /> : children}
        </button>
    )
}

export default Button 
