"use client";

import React, { useEffect } from "react";
import classNames from "classnames/bind";
import Popper from "@/components/Popper/Popper";
import Logo from "@/components/Logo";
import { CloseIcon, TransactionIcon } from "@/components/Icons";
import styles from "./Notification.module.scss";
import Link from "next/link";

const cx = classNames.bind(styles);

type Props = {
    isPending: boolean;
};

const Notification = function ({ isPending }: Props) {
    useEffect(() => {}, []);
    return (
        <Popper
            placement="top-end"
            content={
                <main className={cx("notification-wrapper")}>
                    <header className={cx("notification-header")}>
                        <div className={cx("notification-logo-wrapper")}>
                            <Logo />
                        </div>
                        <div className={cx("notification-icon")}>
                            <CloseIcon />
                        </div>
                    </header>

                    <div className={cx("notification-container")}>
                        {isPending ? (
                            <section className={cx("notification-content")}>
                                <div className={cx("amount-voucher")}>
                                    <h3 className={cx("amount-title")}>You need enough 4 epoches to be received the first voucher</h3>
                                </div>

                                <div className={cx("notification-timer")}>
                                    <div className={cx("notification-timer-content")}>
                                        <span className={cx("notification-timer-number")}>00</span>
                                        <span className={cx("notification-timer-text")}>days</span>
                                    </div>
                                    <div className={cx("notification-timer-content")}>
                                        <span className={cx("notification-timer-number")}>00</span>
                                        <span className={cx("notification-timer-text")}>hours</span>
                                    </div>
                                    <div className={cx("notification-timer-content")}>
                                        <span className={cx("notification-timer-number")}>00</span>
                                        <span className={cx("notification-timer-text")}>minutes</span>
                                    </div>
                                    <div className={cx("notification-timer-content")}>
                                        <span className={cx("notification-timer-number")}>00</span>
                                        <span className={cx("notification-timer-text")}>seconds</span>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <section className={cx("notification-content")}>
                                <div className={cx("amount-voucher")}>
                                    <h3 className={cx("amount-title")}>You have</h3>
                                    <h3 className={cx("amount-title")}>
                                        <span>1 Voucher</span>
                                    </h3>
                                </div>

                                <ul className={cx("notification-voucher-list")}>
                                    <li className={cx("notification-voucher-item")}>
                                        <Link className={cx("notification-voucher-link")} href={""}>
                                            <div className={cx("notification-voucher-image")}>
                                                <TransactionIcon />
                                            </div>
                                            <div className={cx("voucher-notification-content")}>
                                                <h3 className={cx("voucher-notification-content-code")}>AKJSGDJGASJFDJHGASD</h3>
                                                <p className={cx("voucher-notification-content-link")}>http://localhost:5000</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={cx("notification-voucher-item")}>
                                        <Link className={cx("notification-voucher-link")} href={""}>
                                            <div className={cx("notification-voucher-image")}>
                                                <TransactionIcon />
                                            </div>
                                            <div className={cx("voucher-notification-content")}>
                                                <h3 className={cx("voucher-notification-content-code")}>AKJSGDJGASJFDJHGASD</h3>
                                                <p className={cx("voucher-notification-content-link")}>http://localhost:5000</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={cx("notification-voucher-item")}>
                                        <Link className={cx("notification-voucher-link")} href={""}>
                                            <div className={cx("notification-voucher-image")}>
                                                <TransactionIcon />
                                            </div>
                                            <div className={cx("voucher-notification-content")}>
                                                <h3 className={cx("voucher-notification-content-code")}>AKJSGDJGASJFDJHGASD</h3>
                                                <p className={cx("voucher-notification-content-link")}>http://localhost:5000</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={cx("notification-voucher-item")}>
                                        <Link className={cx("notification-voucher-link")} href={""}>
                                            <div className={cx("notification-voucher-image")}>
                                                <TransactionIcon />
                                            </div>
                                            <div className={cx("voucher-notification-content")}>
                                                <h3 className={cx("voucher-notification-content-code")}>AKJSGDJGASJFDJHGASD</h3>
                                                <p className={cx("voucher-notification-content-link")}>http://localhost:5000</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={cx("notification-voucher-item")}>
                                        <Link className={cx("notification-voucher-link")} href={""}>
                                            <div className={cx("notification-voucher-image")}>
                                                <TransactionIcon />
                                            </div>
                                            <div className={cx("voucher-notification-content")}>
                                                <h3 className={cx("voucher-notification-content-code")}>AKJSGDJGASJFDJHGASD</h3>
                                                <p className={cx("voucher-notification-content-link")}>http://localhost:5000</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={cx("notification-voucher-item")}>
                                        <Link className={cx("notification-voucher-link")} href={""}>
                                            <div className={cx("notification-voucher-image")}>
                                                <TransactionIcon />
                                            </div>
                                            <div className={cx("voucher-notification-content")}>
                                                <h3 className={cx("voucher-notification-content-code")}>AKJSGDJGASJFDJHGASD</h3>
                                                <p className={cx("voucher-notification-content-link")}>http://localhost:5000</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={cx("notification-voucher-item")}>
                                        <Link className={cx("notification-voucher-link")} href={""}>
                                            <div className={cx("notification-voucher-image")}>
                                                <TransactionIcon />
                                            </div>
                                            <div className={cx("voucher-notification-content")}>
                                                <h3 className={cx("voucher-notification-content-code")}>AKJSGDJGASJFDJHGASD</h3>
                                                <p className={cx("voucher-notification-content-link")}>http://localhost:5000</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={cx("notification-voucher-item")}>
                                        <Link className={cx("notification-voucher-link")} href={""}>
                                            <div className={cx("notification-voucher-image")}>
                                                <TransactionIcon />
                                            </div>
                                            <div className={cx("voucher-notification-content")}>
                                                <h3 className={cx("voucher-notification-content-code")}>AKJSGDJGASJFDJHGASD</h3>
                                                <p className={cx("voucher-notification-content-link")}>http://localhost:5000</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={cx("notification-voucher-item")}>
                                        <Link className={cx("notification-voucher-link")} href={""}>
                                            <div className={cx("notification-voucher-image")}>
                                                <TransactionIcon />
                                            </div>
                                            <div className={cx("voucher-notification-content")}>
                                                <h3 className={cx("voucher-notification-content-code")}>AKJSGDJGASJFDJHGASD</h3>
                                                <p className={cx("voucher-notification-content-link")}>http://localhost:5000</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={cx("notification-voucher-item")}>
                                        <Link className={cx("notification-voucher-link")} href={""}>
                                            <div className={cx("notification-voucher-image")}>
                                                <TransactionIcon />
                                            </div>
                                            <div className={cx("voucher-notification-content")}>
                                                <h3 className={cx("voucher-notification-content-code")}>AKJSGDJGASJFDJHGASD</h3>
                                                <p className={cx("voucher-notification-content-link")}>http://localhost:5000</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={cx("notification-voucher-item")}>
                                        <Link className={cx("notification-voucher-link")} href={""}>
                                            <div className={cx("notification-voucher-image")}>
                                                <TransactionIcon />
                                            </div>
                                            <div className={cx("voucher-notification-content")}>
                                                <h3 className={cx("voucher-notification-content-code")}>AKJSGDJGASJFDJHGASD</h3>
                                                <p className={cx("voucher-notification-content-link")}>http://localhost:5000</p>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </section>
                        )}
                    </div>
                    <Link href={""} className={cx("shop-button", "button")}>
                        Shop now
                    </Link>
                </main>
            }
        >
            <button className={cx("notification-button")}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={cx("icon-notification")}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                </svg>
                <div className={cx("dot")} />
            </button>
        </Popper>
    );
};

export default Notification;
