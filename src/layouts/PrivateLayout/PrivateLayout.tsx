import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./PrivateLayout.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: ReactNode;
};

const PrivateLayout = function ({ children }: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>{children}</div>
        </main>
    );
};

export default PrivateLayout;
