import React from "react";
import classNames from "classnames/bind";
import { FaQuestion as QuestionIcon } from "react-icons/fa6";
import styles from "./Guide.module.scss";

const cx = classNames.bind(styles);

type Props = {
    title: string;
    description: string;
};

const Guide = function ({ title, description }: Props) {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <h3 className={cx("title")}>{title}</h3>
                <button className={cx("button")}>
                    <QuestionIcon className={cx("icon")} />
                </button>
            </header>
            <aside className={cx("content")}>{description}</aside>
        </div>
    );
};

export default Guide;
