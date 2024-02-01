"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminHome.module.scss";
import Card from "@/components/Card";
import Table from "@/components/Table";
import Upload from "@/components/Upload";

type Props = {};

const cx = classNames.bind(styles);

const AdminHomePage = function ({}: Props) {
    const [voucher, setVoucher] = useState<any[] | null>(null);
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <Upload setData={setVoucher} />
            </header>
            <aside>
                <Table data={voucher} />
            </aside>
        </div>
    );
};

export default AdminHomePage;
