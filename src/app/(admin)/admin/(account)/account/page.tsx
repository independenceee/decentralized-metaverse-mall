"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Table from "@/components/Table";
import Upload from "@/components/Upload";
import styles from "./AdminAccount.module.scss";
import { get } from "@/utils/httpRequest";

type Props = {};

const cx = classNames.bind(styles);

const AdminAccountPage = function ({}: Props) {
    const [accounts, setAccounts] = useState<any[] | null>(null);

    useEffect(() => {
        (async function () {
            try {
                const { accounts }: any = await get("/account");
                setAccounts(accounts);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

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

export default AdminAccountPage;
