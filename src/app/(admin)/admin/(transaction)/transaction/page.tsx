"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminTransaction.module.scss";
import Upload from "@/components/Upload";
import Table from "@/components/Table";

const cx = classNames.bind(styles);

const AdminTransactionPage = function () {
    const [accounts, setAccounts] = useState<any>(null!);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <Upload title="File uploader transaction" setData={setAccounts} />
            </div>
            <aside>
                <Table
                    type="IMPORT"
                    onDelete={() => {}}
                    onUpdate={() => {}}
                    totalPages={1}
                    currentPage={1}
                    title="Transaction"
                    data={accounts}
                    pathname=""
                />
            </aside>
        </div>
    );
};

export default AdminTransactionPage;
