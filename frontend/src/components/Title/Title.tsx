import React from "react";
import classNames from "classnames/bind";
import styles from "./Title.module.scss";

type Props = {
    title: string;
    subTitle: string;
};

const cx = classNames.bind(styles);

const Title = function ({ title, subTitle }: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("inner")}>
                    <h2 className={cx("title")}>{title}</h2>
                    <p className={cx("description")}>{subTitle}</p>
                </div>
            </div>
        </div>
    );
};

export default Title;
