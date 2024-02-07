"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminCreateVoucher.module.scss";
import Upload from "@/components/Upload";
import Table from "@/components/Table";

type Props = {};

const cx = classNames.bind(styles);
const PAGE_SIZE = 5;

const AdminCreateVoucherPage = function ({}: Props) {
    const [vouchers, setVouchers] = useState<any[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = vouchers ? Math.ceil(vouchers.length / PAGE_SIZE) : 0;
    const currentPageData = vouchers && vouchers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    console.log(currentPage, currentPageData);
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <Upload title="File upload voucher" data={vouchers} setData={setVouchers} />
            </header>
            <aside>
                <Table
                    setStatus={() => null}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    pathname="/admin/voucher/edit"
                    title="Voucher"
                    type="Voucher"
                    setData={setVouchers}
                    data={currentPageData}
                />
            </aside>
        </div>
    );
};

export default AdminCreateVoucherPage;
