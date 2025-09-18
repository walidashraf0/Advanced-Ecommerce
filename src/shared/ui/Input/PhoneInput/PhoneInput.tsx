import { cn } from "@/shared/lib"
import { PhoneInput as ReactPhoneInput } from 'react-international-phone'
import type { InputProps } from "../Input"
import styles from '../Input.module.scss'
import { useState } from "react"
import 'react-international-phone/style.css';


const PhoneInput = ({ disabled = false, label, error = false, value, className, onChange, rounded = false, ...rest }: InputProps) => {
    const [focus, setFocus] = useState<boolean>(false);

    const handleChange = (phone: string) => {
        onChange?.(phone);
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

            <ReactPhoneInput inputProps={{ ...rest }} defaultCountry="eg" forceDialCode disableCountryGuess value={value} disabled={disabled} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} inputClassName={
                cn(styles.input, {
                    [styles.disabled]: disabled,
                    [styles.error]: error,
                })
            } className={cn(styles.inputContainer, className, {
                [styles.rounded]: rounded,
                [styles.disabled]: disabled,
                [styles.focus]: focus,
                [styles.error]: error,
            })} />

        </>
    )
}

export default PhoneInput
