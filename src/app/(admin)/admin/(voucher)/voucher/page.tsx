"use client";

import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import { parse } from "papaparse";
import styles from "./AdminVoucher.module.scss";
import Table from "@/components/Table";
import Balance from "@/components/Balance";
import vouchers from "@/tests/vouchers";

type Props = {};

const cx = classNames.bind(styles);

const AdminVoucherPage = function ({}: Props) {
    return (
        <div>
            <Balance />
            <Table data={vouchers} />
        </div>
    );
};

export default AdminVoucherPage;
