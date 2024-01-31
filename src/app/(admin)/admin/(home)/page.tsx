import React from "react";
import classNames from "classnames/bind";
import styles from "./AdminHome.module.scss";
import Transactions from "@/components/Transactions";
import Table from "@/components/Table";

type Props = {};

const cx = classNames.bind(styles);

const AdminHomePage = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <Transactions type="transaction" />
                <Transactions type="voucher" />
                <Transactions type="addition" />
                
            </header>
            <aside>
                <Table />
            </aside>
        </div>
    );
};

export default AdminHomePage;
