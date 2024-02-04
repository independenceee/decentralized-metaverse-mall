import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import React from "react";

const cx = classNames.bind(styles);

interface Props {
    name: string;
    errorMessage: string;
    placeholder: string;
    classNameWrapper?: string;
    classNameInput?: string;
}

function Input({ name, placeholder, errorMessage, classNameWrapper, classNameInput }: Props) {
    return (
        <div className={cx("input-group", classNameWrapper)}>
            <input type="text" name={name} placeholder={placeholder} className={cx("input", classNameInput)} />
            <span className={"input-error-message"}>{errorMessage}</span>
        </div>
    );
}

export default Input;
