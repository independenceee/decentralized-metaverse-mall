"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminTransaction.module.scss";
import Upload from "@/components/Upload";
import Table from "@/components/Table";
import { get } from "@/utils/httpRequest";

type Props = {};

const cx = classNames.bind(styles);

const AdminTransactionPage = function ({}: Props) {
    const [accounts, setAccounts] = useState<any[] | null>(null);

   
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <Upload data={accounts} setData={setAccounts} />
            </div>
            <aside>
                <Table title="Transaction" data={accounts} setData={setAccounts} />
            </aside>
        </div>
    );
};

export default AdminTransactionPage;
