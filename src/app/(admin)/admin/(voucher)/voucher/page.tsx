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
    useEffect(() => {
        (async function () {
            const { vouchers }: any = await get("/voucher");
            setVouchers(vouchers);
        })();
    }, []);
    return (
        <div>
            <div className={cx("header")}>
                <Card title="Create Voucher" Icon={AddressCardIcon} type="add" to="/admin/voucher/create" />
            </div>
            <Table pathname="/admin/voucher/edit" title="Vouchers" type="Vouchers" data={vouchers} setData={setVouchers} />
        </div>
    );
};

export default AdminVoucherPage;
