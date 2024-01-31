import React from "react";
import classNames from "classnames/bind";
import Table from "@/components/Table";
import Balance from "@/components/Balance";
import styles from "./AdminVoucher.module.scss";

type Props = {};

const cx = classNames.bind(styles);

const AdminVoucherPage = function ({}: Props) {
    return (
        <>
            <Balance />
            <Table />
        </>
    );
};

export default AdminVoucherPage;
