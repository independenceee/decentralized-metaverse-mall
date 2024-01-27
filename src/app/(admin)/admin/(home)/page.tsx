import React from "react";
import classNames from "classnames/bind";
import styles from "./AdminHome.module.scss";
import Transactions from "@/components/Transactions";

type Props = {};

const cx = classNames.bind(styles);

const AdminHomePage = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Transactions />
            </div>
        </div>
    );
};

export default AdminHomePage;
