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
    const [totalPagesAccounts, setTotalPagesAccounts] = useState<number>(1);
    const [currentPageAccounts, setCurrentPageAccounts] = useState<number>(1);

    useEffect(() => {
        (async function () {
            try {
                const { accounts, totalPage }: any = await get("/account", {
                    params: {
                        page: currentPageAccounts,
                    },
                });
                setAccounts(accounts);
                setTotalPagesAccounts(totalPage);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <aside>
                <Table title="Account" data={accounts} setData={setAccounts} />
            </aside>
        </div>
    );
};

export default AdminAccountPage;
