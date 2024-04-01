"use client";

import React, { ChangeEvent, memo, useContext, useEffect, useRef, useState } from "react";
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
import { useGetCategoriesQuery } from "@/redux/services/categories.api";
import { Category } from "@/redux/services/types";
import { useRecieveVoucherMutation } from "@/redux/services/vouchers.api";
import { post } from "@/utils/httpRequest";

const cx = classNames.bind(styles);

type Props = {};

const Notification = function ({}: Props) {
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { wallet } = useContext<WalletContextType>(WalletContext);
    const [receive, setReceive] = useState<boolean>(false);
    const { stakeInfomation, registerStakeKey, waiting, vouchers, setVouchers } = useContext<StakeContextType>(StakeContext);
    const { data: categories } = useGetCategoriesQuery();
    const [mounted, setMounted] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(0);

    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (mounted) {
            timer.current = setInterval(handleStartCountdown, 1000);
        }
        return () => {
            timer.current && clearInterval(timer.current);
        };
    }, [mounted, countdown]);

    const handleStartCountdown = function () {
        setMounted(true);
        if (stakeInfomation) {
            const currentTime = new Date().getTime();
            const startTime = new Date(stakeInfomation.block_time * 1000 + Number(process.env.EXPIRED_TIME!)).getTime();
            const remainingTime = startTime - currentTime;
            setCountdown(remainingTime);
        }
    };

    const handleStopCountdown = function () {
        setMounted(false);
        timer.current && clearInterval(timer.current);
    };

    const [category, setCategory] = useState<string>("");

    const handleRecieveVoucher = async function () {
        const data = await post("/voucher/recieve", {
            walletAddress: wallet?.address,
            categoryName: category,
            epoch: stakeInfomation?.epochs.length,
        });
        console.log(data);
        setVouchers(data);
    };

    const days: number = Math.floor((countdown / (1000 * 60 * 60 * 24)) % 24);
    const hours: number = Math.floor((countdown / (1000 * 60 * 60)) % 24);
    const minutes: number = Math.floor((countdown / (1000 * 60)) % 60);
    const seconds: number = Math.floor((countdown / 1000) % 60);

    return (
        <Popper
            placement="top-end"
            onHide={handleStopCountdown}
            onShow={() => {
                handleStartCountdown();
            }}
            content={
                <main className={cx("notification-wrapper")}>
                    <header className={cx("notification-header")}>
                        <div className={cx("notification-logo-wrapper")}>
                            <Logo />
                        </div>
                    </header>

                    {lucid && wallet && vouchers.length !== 0 ? (
                        <>
                            <div className={cx("notification-container")}>
                                <section className={cx("notification-content")}>
                                    <div className={cx("amount-voucher")}>
                                        <h3 className={cx("amount-title")}>You receive a voucher or click on each voucher to get to the product</h3>
                                    </div>
                                    <ul className={cx("notification-voucher-list")}>
                                        <li className={cx("notification-voucher-item")}>
                                            <Link className={cx("notification-voucher-link")} href={""}>
                                                <div className={cx("voucher-notification-content")}>
                                                    <p className={cx("voucher-notification-content-link")}>Category:</p>
                                                    <h3 className={cx("voucher-notification-content-code")}>{vouchers[0]?.categoryName}</h3>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className={cx("notification-voucher-item")}>
                                            <Link className={cx("notification-voucher-link")} href={""}>
                                                <div className={cx("voucher-notification-content")}>
                                                    <p className={cx("voucher-notification-content-link")}>Code:</p>
                                                    <h3 className={cx("voucher-notification-content-code")}>{vouchers[0]?.code}</h3>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className={cx("notification-voucher-item")}>
                                            <Link className={cx("notification-voucher-link")} target="_blank" href={vouchers[0]?.link}>
                                                <div className={cx("voucher-notification-content")}>
                                                    <p className={cx("voucher-notification-content-link")}>Link:</p>
                                                    <h3 className={cx("voucher-notification-content-code")}>{vouchers[0]?.link}</h3>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className={cx("notification-voucher-item")}>
                                            <Link className={cx("notification-voucher-link")} href={""}>
                                                <div className={cx("voucher-notification-content")}>
                                                    <p className={cx("voucher-notification-content-link")}>Status:</p>
                                                    <h3 className={cx("voucher-notification-content-code")}>{vouchers[0]?.status}</h3>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        </>
                    ) : (
                        <>
                            {receive ? (
                                <div className={cx("notification-container")}>
                                    <section className={cx("notification-content")}>
                                        <div className={cx("amount-voucher")}>
                                            <h3 className={cx("amount-title")}>Select the category for which you want to get the voucher</h3>
                                        </div>
                                        <ul className={cx("notification-voucher-list")}>
                                            {categories &&
                                                categories.map(function (category: Category, index: number) {
                                                    return (
                                                        <li key={index} className={cx("notification-voucher-item")}>
                                                            <input
                                                                value={category.name}
                                                                onChange={(event) => setCategory(event.target.value)}
                                                                name="category"
                                                                type="radio"
                                                                className={cx("")}
                                                            />
                                                            <label htmlFor="category" className={cx("voucher-notification-content-link")}>
                                                                {category.name}
                                                            </label>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </section>
                                </div>
                            ) : (
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
                                                                                stakeInfomation?.block_time +
                                                                                    Number(process.env.EXPIRED_TIME!) / 1000,
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

                                            {lucid && stakeInfomation?.epochs.length == 0 && (
                                                <div className={cx("notification-timer")}>
                                                    <div className={cx("notification-timer-content")}>
                                                        <span className={cx("notification-timer-number")}>
                                                            {days ? days.toString().padStart(2, "0") : "00"}
                                                        </span>
                                                        <span className={cx("notification-timer-text")}>days</span>
                                                    </div>
                                                    <div className={cx("notification-timer-content")}>
                                                        <span className={cx("notification-timer-number")}>
                                                            {hours ? hours.toString().padStart(2, "0") : "00"}
                                                        </span>
                                                        <span className={cx("notification-timer-text")}>hours</span>
                                                    </div>
                                                    <div className={cx("notification-timer-content")}>
                                                        <span className={cx("notification-timer-number")}>
                                                            {minutes ? minutes.toString().padStart(2, "0") : "00"}
                                                        </span>
                                                        <span className={cx("notification-timer-text")}>minutes</span>
                                                    </div>
                                                    <div className={cx("notification-timer-content")}>
                                                        <span className={cx("notification-timer-number")}>
                                                            {seconds ? seconds.toString().padStart(2, "0") : "00"}
                                                        </span>
                                                        <span className={cx("notification-timer-text")}>seconds</span>
                                                    </div>
                                                </div>
                                            )}
                                        </section>
                                    )}

                                    {!lucid && !wallet && <section className={cx("notification-content")}></section>}
                                </div>
                            )}

                            {!lucid && (
                                <Button onClick={null!} className={cx("shop-button", "button")}>
                                    Connect Wallet
                                </Button>
                            )}
                            {lucid && stakeInfomation?.epochs.length > 0 && !receive && (
                                <Button onClick={() => setReceive(!receive)} className={cx("shop-button", "button")}>
                                    Receive voucher
                                </Button>
                            )}

                            {receive && (
                                <Button onClick={handleRecieveVoucher} className={cx("shop-button", "button")}>
                                    Receive Voucher With Category
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
                        </>
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
