import React from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

type Props = {};

const Sidebar = function ({}: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}></div>
        </main>
    );
};

export default Sidebar;
