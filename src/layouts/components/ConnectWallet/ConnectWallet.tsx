"use client";

import React, { useContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import classNames from "classnames/bind";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./ConnectWallet.module.scss";
import { ArrowDownIcon, RefreshIcon, LogoutIcon, CopyIcon } from "@/components/Icons";
import wallets from "@/constants/wallets";
import { WalletType } from "@/types/GenericsType";
import Image from "next/image";
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import { useModal } from "@/hooks";
import Modal from "@/components/Modal";

const cx = classNames.bind(styles);

type Props = {};

const ConnectWallet = function ({}: Props) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isOpenShort, setIsOpenShort] = useState<boolean>(false);
    const [isOpenShowWallet, setIsOpenShowWallet] = useState<boolean>(false);

    const { isShowing, toggle } = useModal();
    const { loading, connectWallet, refreshWallet, disconnectWallet, lucid, wallet } = useContext<LucidContextType>(LucidContext);

    useEffect(() => {
        const handleScroll = function () {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const handleOpenShowWallet = function () {
        setIsOpenShowWallet(!isOpenShowWallet);
    };

    const handleOpenWallet = function () {
        setIsOpenShort(!isOpenShort);
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
        <div className={cx("wrapper", { open: isOpenShort })}>
            {lucid ? (
                <Button
                    loading={loading}
                    onClick={handleOpenShowWallet}
                    RightIcon={ArrowDownIcon}
                    className={cx("connect-wallet", { scrolled: isScrolled })}
                >
                    <div className={cx("connected-wallet-container")}>
                        <Image className={cx("wallet-short-image")} src={wallet.image} alt="" />
                        <span className={cx("wallet-short-name")}>{!loading && wallet.balance + " ₳"} </span>
                    </div>

                    {isOpenShowWallet && (
                        <div className={cx("show-wallet-wrapper", { scrolled: isScrolled })}>
                            <CopyToClipboard text={String(wallet.address)}>
                                <div className={cx("show-wallet-item")}>
                                    <h3 className={cx("show-wallet-name")}>Address: </h3>
                                    <p className={cx("show-wallet-description")}>{wallet.address}</p>
                                    <h3 className={cx("show-wallet-name")}>
                                        <CopyIcon className={cx("show-wallet-icon")} />
                                    </h3>
                                </div>
                            </CopyToClipboard>
                            <div onClick={refreshWallet} className={cx("show-wallet-item")}>
                                <h3 className={cx("show-wallet-name")}>
                                    <RefreshIcon className={cx("show-wallet-icon")} />
                                </h3>
                                <p className={cx("show-wallet-description")}>Refresh</p>
                            </div>
                            <div onClick={disconnectWallet} className={cx("show-wallet-item")}>
                                <h3 className={cx("show-wallet-name")}>
                                    <LogoutIcon className={cx("show-wallet-icon")} />
                                </h3>
                                <p className={cx("show-wallet-description")}>Disconnect</p>
                            </div>
                        </div>
                    )}
                </Button>
            ) : (
                <Button
                    loading={loading}
                    onClick={handleOpenWallet}
                    RightIcon={ArrowDownIcon}
                    className={cx("connect-wallet", { scrolled: isScrolled })}
                >
                    {!loading && "Connect wallet"}
                    {isOpenShort && (
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

            <Modal isShowing={isShowing} toggle={toggle}></Modal>
        </div>
    );
};

export default ConnectWallet;
