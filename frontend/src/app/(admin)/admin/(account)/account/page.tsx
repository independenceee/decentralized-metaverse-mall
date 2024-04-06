"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Table from "@/components/Table";
import styles from "./AdminAccount.module.scss";
import { get } from "@/utils/httpRequest";
import withAuth from "@/HOC/withAuth";

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
                <Table
                    pathname=""
                    type="MANUAL"
                    onDelete={() => {}}
                    onUpdate={() => {}}
                    paginate={false}
                    totalPages={1}
                    currentPage={1}
                    title="Account"
                    data={accounts}
                />
            </aside>
        </div>
    );
};

export default withAuth(AdminAccountPage);
