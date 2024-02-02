"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./AdminVoucher.module.scss";
import Table from "@/components/Table";
import { AddressCardIcon, AddIcon } from "@/components/Icons";

import vouchers from "@/tests/vouchers";
import Card from "@/components/Card";

type Props = {};

const cx = classNames.bind(styles);

const AdminVoucherPage = function ({}: Props) {
    return (
        <div>
            <div className={cx("header")}>
                <Card title="Analytics Voucher" Icon={AddressCardIcon} to="#" />
                <Card title="Create Voucher" Icon={AddressCardIcon} type="add" to="/admin/voucher/create" />
            </div>
            <Table title="Vouchers" data={vouchers} />
        </div>
    );
};

export default AdminVoucherPage;
