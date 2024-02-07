"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminTransaction.module.scss";
import Upload from "@/components/Upload";
import Table from "@/components/Table";

type Props = {};

const cx = classNames.bind(styles);

const AdminTransactionPage = function ({}: Props) {
    const [accounts, setAccounts] = useState<any[] | null>(null);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <Upload title="File uploader transaction" data={accounts} setData={setAccounts} />
            </div>
            <aside>
                <Table totalPages={1} currentPage={1} setStatus={null!} title="Transaction" data={accounts} setData={setAccounts} />
            </aside>
        </div>
    );
};

export default AdminTransactionPage;
