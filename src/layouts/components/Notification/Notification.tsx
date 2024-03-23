"use client";

import React, { memo, useContext } from "react";
import classNames from "classnames/bind";
import Popper from "@/components/Popper/Popper";
import Logo from "@/components/Logo";
import styles from "./Notification.module.scss";
import Link from "next/link";
import { StakeContextType } from "@/types/contexts/StakeContextType";
import StakeContext from "@/contexts/components/StakeContext";
import { WalletContextType } from "@/types/contexts/WalletContextType";
import WalletContext from "@/contexts/components/WalletContext";
import convertDatetime from "@/helpers/convert-datetime";
import Button from "@/components/Button";
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import { BeatLoader } from "react-spinners";

const cx = classNames.bind(styles);

type Props = {};

const Notification = function ({}: Props) {
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { wallet } = useContext<WalletContextType>(WalletContext);
    const { stakeInfomation, registerStakeKey, waiting } = useContext<StakeContextType>(StakeContext);

    return (
        <Popper
            placement="top-end"
            content={
                <main className={cx("notification-wrapper")}>
                    <header className={cx("notification-header")}>
                        <div className={cx("notification-logo-wrapper")}>
                            <Logo />
                        </div>
                    </header>

                    <div className={cx("notification-container")}>
                        {lucid && wallet && (
                            <section className={cx("notification-content")}>
                                <div className={cx("amount-voucher")}>
                                    <h3 className={cx("amount-title")}>You need enough 4 epoches to be received the first voucher</h3>
                                </div>
                                {wallet && (
                                    <ul className={cx("notification-voucher-list")}>
                                        <li className={cx("notification-voucher-item")}>
                                            <Link className={cx("notification-voucher-link")} href={""}>
                                                <div className={cx("voucher-notification-content")}>
                                                    <p className={cx("voucher-notification-content-link")}>Stake address:</p>
                                                    <h3 className={cx("voucher-notification-content-code")}>{wallet.stakeKey}</h3>
                                                </div>
                                            </Link>
                                        </li>

                                        {wallet?.poolId && stakeInfomation && (
                                            <>
                                                <li className={cx("notification-voucher-item")}>
                                                    <Link className={cx("notification-voucher-link")} href={""}>
                                                        <div className={cx("voucher-notification-content")}>
                                                            <p className={cx("voucher-notification-content-link")}>Pool id:</p>
                                                            <h3 className={cx("voucher-notification-content-code")}>{wallet.poolId}</h3>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className={cx("notification-voucher-item")}>
                                                    <Link className={cx("notification-voucher-link")} href={""}>
                                                        <div className={cx("voucher-notification-content")}>
                                                            <p className={cx("voucher-notification-content-link")}>Register date:</p>
                                                            <h3 className={cx("voucher-notification-content-code")}>
                                                                {convertDatetime(stakeInfomation?.block_time)}
                                                            </h3>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className={cx("notification-voucher-item")}>
                                                    <Link className={cx("notification-voucher-link")} href={""}>
                                                        <div className={cx("voucher-notification-content")}>
                                                            <p className={cx("voucher-notification-content-link")}>Expired date:</p>
                                                            <h3 className={cx("voucher-notification-content-code")}>
                                                                {convertDatetime(
                                                                    stakeInfomation?.block_time + Number(process.env.EXPIRED_TIME!) / 1000,
                                                                )}
                                                            </h3>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className={cx("notification-voucher-item")}>
                                                    <Link className={cx("notification-voucher-link")} href={""}>
                                                        <div className={cx("voucher-notification-content")}>
                                                            <p className={cx("voucher-notification-content-link")}>Number of Epoch:</p>
                                                            <h3 className={cx("voucher-notification-content-code")}>
                                                                {stakeInfomation?.epochs.length}
                                                            </h3>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                )}
                            </section>
                        )}

                        {!lucid && !wallet && <section className={cx("notification-content")}></section>}
                    </div>
                    {!lucid && (
                        <Button onClick={null!} className={cx("shop-button", "button")}>
                            Connect Wallet
                        </Button>
                    )}
                    {lucid && stakeInfomation && (
                        <Button onClick={null!} className={cx("shop-button", "button")}>
                            Receive voucher
                        </Button>
                    )}

                    {lucid && !wallet?.poolId && (
                        <Button
                            
                            onClick={() =>
                                registerStakeKey({
                                    lucid: lucid,
                                    poolId: "pool1mvgpsafktxs883p66awp7fplj73cj6j9hqdxzvqw494f7f0v2dp",
                                })
                            }
                            className={cx("shop-button", "button")}
                        >
                            {waiting ? <BeatLoader size={7} color="#fff" /> : "Stake ADA to VLAI Pool"}
                        </Button>
                    )}
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

export default memo(Notification);
