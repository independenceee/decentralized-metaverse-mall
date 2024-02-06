"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminCreateVoucher.module.scss";
import Upload from "@/components/Upload";
import Table from "@/components/Table";

type Props = {};

const cx = classNames.bind(styles);

const AdminCreateVoucherPage = function ({}: Props) {
    const [vouchers, setVouchers] = useState<any[] | null>(null);
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <Upload title="File upload voucher" data={vouchers} setData={setVouchers} />
            </header>
            <aside>
                <Table pathname="/admin/voucher/edit" title="Voucher" type="Voucher" setData={setVouchers} data={vouchers} />
            </aside>
        </div>
    );
};

export default AdminCreateVoucherPage;
