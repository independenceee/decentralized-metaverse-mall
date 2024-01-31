import React from "react";
import classNames from "classnames/bind";
import styles from "./AdminVoucher.module.scss";
import Table from "@/components/Table";
import Balance from "@/components/Balance";

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
