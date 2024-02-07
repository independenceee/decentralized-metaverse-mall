import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import React, { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    classNameWrapper?: string;
    classNameInput?: string;
    register?: UseFormRegister<any>;
    rules?: RegisterOptions;
}

function Input({ name, placeholder, errorMessage, classNameWrapper, classNameInput, register, rules, ...restProps }: Props) {
    const registerField = register && name ? register(name, rules) : null;
    return (
        <div className={cx("input-group", classNameWrapper)}>
            <input type="text" name={name} {...registerField} placeholder={placeholder} className={cx("input", classNameInput)} {...restProps} />
            <div className={cx("input-error-message")}>{errorMessage}</div>
        </div>
    );
}

export default Input;
