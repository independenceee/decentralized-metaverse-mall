"use client";

import React, { useContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import classNames from "classnames/bind";
import styles from "./ConnectWallet.module.scss";
import { ArrowDownIcon } from "@/components/Icons";
import wallets from "@/constants/wallets";
import { WalletType } from "@/types/GenericsType";
import Image from "next/image";
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";

const cx = classNames.bind(styles);

type Props = {};

const ConnectWallet = function ({}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    const { loading, connectWallet, lucid, wallet } = useContext<LucidContextType>(LucidContext);

    useEffect(() => {
        const handleScroll = function () {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const handleOpenWallet = function () {
        setIsOpen(!isOpen);
    };

    const handleConnectWallet = async function (wallet: WalletType) {
        try {
            if (!(await wallet.checkApi())) {
            }
            connectWallet({
                api: wallet.api,
                checkApi: wallet.checkApi,
                name: wallet.name,
                image: wallet.image,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx("wrapper", { open: isOpen })}>
            {lucid ? (
                <Button
                    loading={loading}
                    onClick={handleOpenWallet}
                    RightIcon={ArrowDownIcon}
                    className={cx("connect-wallet", { scrolled: isScrolled })}
                >
                    <div className={cx("connected-wallet-container")}>
                        <Image className={cx("wallet-short-image")} src={wallet.image} alt="" />
                        <span className={cx("wallet-short-name")}>{wallet.balance} ₳</span>
                    </div>
                </Button>
            ) : (
                <Button
                    loading={loading}
                    onClick={handleOpenWallet}
                    RightIcon={ArrowDownIcon}
                    className={cx("connect-wallet", { scrolled: isScrolled })}
                >
                    {!loading && "Connect wallet"}
                    {isOpen && (
                        <div className={cx("wallet-short", { scrolled: isScrolled })}>
                            {wallets.slice(0, 5).map(function (wallet: WalletType, index: number) {
                                return (
                                    <div onClick={() => handleConnectWallet(wallet)} key={index} className={cx("wallet-short-container")}>
                                        <Image className={cx("wallet-short-image")} src={wallet.image} alt="" />
                                        <span className={cx("wallet-short-name")}>{wallet.name}</span>
                                    </div>
                                );
                            })}
                            <div className={cx("wallet-short-container")}>
                                <span className={cx("wallet-short-name")}>View all</span>
                            </div>
                        </div>
                    )}
                </Button>
            )}
        </div>
    );
};

export default ConnectWallet;
