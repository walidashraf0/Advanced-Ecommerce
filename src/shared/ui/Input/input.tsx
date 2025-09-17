import { useState, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from "react"

import HideIcon from '@/shared/assets/icons/Hide.svg?react'
import ShowIcon from '@/shared/assets/icons/Show.svg?react'
import { cn } from "@/shared/lib";

import Button from "../Button/Button";

import styles from "./Input.module.scss"

type HTMlInputType = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

interface InputProps extends HTMlInputType {
  className?: string;
  disabled?: boolean;
  rounded?: boolean;
  Icon?: ReactNode;
  onChange?: (value: string) => void;
  error?: boolean;
  label?: string;
}
const Input = ({ disabled = false, label, error = false, value, className, onChange, Icon, rounded = false, type = "text", ...rest }: InputProps) => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  }

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleFocus = () => {
    setFocus(true);
  }
  const handleBlur = () => {
    setFocus(false);
  }

  return (
    <>
      {label && <label className={cn(styles.label, { [styles.error]: error })}>{label}</label>}
      <div className={cn(styles.inputContainer, className, {
        [styles.rounded]: rounded,
        [styles.disabled]: disabled,
        [styles.focus]: focus,
        [styles.error]: error,
      })}>
        {Icon}
        <input {...rest} value={value} disabled={disabled} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} type={showPassword && type === 'password' ? 'text' : type} className={cn(styles.input, {
          [styles.disabled]: disabled,
          [styles.error]: error,
        })} />
        {type === "password" && (
          <Button theme="ghost" type="button" className="styles.toggleVisability" onClick={toggleShowPassword}>
            {showPassword ? <HideIcon /> : <ShowIcon />}
          </Button>
        )}
      </div>
    </>
  )
}

export default Input
