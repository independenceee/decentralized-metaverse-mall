"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminCreateVoucher.module.scss";
import Upload from "@/components/Upload";
import Table from "@/components/Table";
import Guide from "@/components/Guide";

type Props = {};

const cx = classNames.bind(styles);

const AdminCreateVoucherPage = function ({}: Props) {
    const [accounts, setAccounts] = useState<any[] | null>(null);
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <Upload setData={setAccounts} />
                <Guide
                    title="Voucher"
                    description="Request your data . Upload .JSON files containing images, metadata, and your mint to collectors through the Mint Service."
                />
            </header>
            <aside>
                <Table data={accounts} />
            </aside>
        </div>
    );
};

export default AdminCreateVoucherPage;
