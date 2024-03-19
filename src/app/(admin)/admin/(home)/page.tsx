"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminHome.module.scss";
import Card from "@/components/Card";
import { privateRoutes } from "@/routes";
import { useGetFounderListQuery, useGetFounderQuery } from "@/redux/api/founders.api";
import Link from "next/link";

const cx = classNames.bind(styles);

const AdminHomePage = function () {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <span className={cx("box-icon")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={cx("icon")}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                        />
                    </svg>
                </span>
                <div className={cx("header-title")}>Decentralized Metaverse Mall</div>
                <div className={cx("header-subtitle")}>Management</div>
            </header>
            <main>
                <ul className={cx("body")}>
                    {privateRoutes.map(function (privateRoute, index: number) {
                        if (privateRoute.name !== "Home") {
                            return (
                                <li key={index} className={cx("card")}>
                                    <div>
                                        <span className={cx("body-icon-wrapper")}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className={cx("icon")}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className={cx("card-title")}>{privateRoute.name}</h2>
                                        <p className={cx("card-desc")}>Lineone prebuilt Messaging UI kit includes designs for social chat.</p>
                                    </div>
                                    <Link href={privateRoute.redirect} className={cx("route-link")}>
                                        View {privateRoute.name}
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            </main>
        </div>
    );
};

export default AdminHomePage;
