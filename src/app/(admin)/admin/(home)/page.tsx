"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminHome.module.scss";
import Card from "@/components/Card";
import { privateRoutes } from "@/routes";
import { useGetFounderListQuery, useGetFounderQuery } from "@/redux/api/founders.api";

type Props = {};

const cx = classNames.bind(styles);

const ID_TEST = "719fb6d7-7dd8-4115-8a5e-e7c3196b4452";

const AdminHomePage = function ({}: Props) {
    const [voucher, setVoucher] = useState<any[] | null>(null);
    const founder = useGetFounderQuery(ID_TEST, {
        skip: !ID_TEST,
    });
    const founders = useGetFounderListQuery();

    console.log(founders);
    console.log(founder);

    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                {privateRoutes.map(function (privateRoute, index: number) {
                    if (privateRoute.name !== "Home") {
                        return <Card title={privateRoute.name} Icon={privateRoute.Icon} key={index} to={privateRoute.redirect} />;
                    }
                })}
            </header>
        </div>
    );
};

export default AdminHomePage;
