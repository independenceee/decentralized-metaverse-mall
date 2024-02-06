"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminVoucher.module.scss";
import Table from "@/components/Table";
import { AddressCardIcon } from "@/components/Icons";

import Card from "@/components/Card";
import { get } from "@/utils/httpRequest";

type Props = {};

const cx = classNames.bind(styles);

const AdminVoucherPage = function ({}: Props) {
    const [vouchers, setVouchers] = useState<any[] | null>(null);
    const [totalPagesVouchers, setTotalPagesVouchers] = useState<number>(1);
    const [currentPageVouchers, setCurrentPageVouchers] = useState<number>(1);
    const [statusVouchers, setStatusVouchers] = useState<string>("FREE");

    useEffect(() => {
        (async function () {
            const { vouchers, totalPage }: any = await get("/voucher", {
                params: {
                    page: currentPageVouchers,
                    status: statusVouchers,
                },
            });
            setVouchers(vouchers);
            setTotalPagesVouchers(totalPage);
        })();
    }, [currentPageVouchers, statusVouchers]);

    return (
        <div>
            <div className={cx("header")}>
                <Card title="Create Voucher" Icon={AddressCardIcon} type="add" to="/admin/voucher/create" />
            </div>
            {vouchers?.length ? (
                <Table
                    setCurrentPage={setCurrentPageVouchers}
                    totalPages={totalPagesVouchers}
                    currentPage={currentPageVouchers}
                    pathname="/admin/voucher/edit"
                    title="Vouchers"
                    type="Vouchers"
                    data={vouchers}
                    setData={setVouchers}
                    setStatus={setStatusVouchers}
                />
            ) : null}
        </div>
    );
};

export default AdminVoucherPage;
