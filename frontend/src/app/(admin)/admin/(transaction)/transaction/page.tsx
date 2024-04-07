"use client";

import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminTransaction.module.scss";
import Upload from "@/components/Upload";
import Table from "@/components/Table";
import { TransactionContextType } from "@/types/contexts/TransactionContextType";
import TransactionContext from "@/contexts/components/TransactionContext";
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";

const cx = classNames.bind(styles);

const AdminTransactionPage = function () {
    const [accounts, setAccounts] = useState<any>(null!);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { sendNativeTokens } = useContext<TransactionContextType>(TransactionContext);

    const handleSendToken = async function () {
        const tx = await sendNativeTokens({ lucid: lucid, accounts: accounts });
        if (tx) setAccounts(null!);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <Upload title="File uploader transaction" setData={setAccounts} />
            </div>
            <aside>
                <Table
                    type="IMPORT"
                    onSend={handleSendToken}
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
