import React from "react";
import classNames from "classnames/bind";
import styles from "./AdminTransaction.module.scss";

type Props = {};

const cx = classNames.bind(styles);

// TODO Import theo lô (cvs: số lượng token cần chuyển + địa chỉ ví)

const AdminTransactionPage = function ({}: Props) {
    return <div className={cx("wrapper")}></div>;
};

export default AdminTransactionPage;
