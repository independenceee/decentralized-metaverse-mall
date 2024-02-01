"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminHome.module.scss";
import Card from "@/components/Card";
import { privateRoutes } from "@/routes";

type Props = {};

const cx = classNames.bind(styles);

const AdminHomePage = function ({}: Props) {
    const [voucher, setVoucher] = useState<any[] | null>(null);
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                {privateRoutes.map(function (privateRoute, index: number) {
                    return <Card title={privateRoute.name} Icon={privateRoute.Icon} key={index} to={privateRoute.redirect} />;
                })}
            </header>
        </div>
    );
};

export default AdminHomePage;
