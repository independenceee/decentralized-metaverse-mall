"use client";

import React, { useContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import classNames from "classnames/bind";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./ConnectWallet.module.scss";
import { ArrowDownIcon, RefreshIcon, LogoutIcon, CopyIcon, CloseIcon } from "@/components/Icons";
import wallets from "@/constants/wallets";
import { WalletType } from "@/types/GenericsType";
import Image from "next/image";
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import { useModal } from "@/hooks";
import Modal from "@/components/Modal";
import Link from "next/link";
import WalletContext from "@/contexts/components/WalletContext";
import { WalletContextType } from "@/types/contexts/WalletContextType";

const cx = classNames.bind(styles);

type Props = {};

const ConnectWallet = function ({}: Props) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isOpenShort, setIsOpenShort] = useState<boolean>(false);
    const [isOpenShowWallet, setIsOpenShowWallet] = useState<boolean>(false);
    const { isShowing: isShowingWalletLong, toggle: toggleWalletLong } = useModal();
    const { isShowing: isShowingNotificationDownload, toggle: toggleNotificationDownload } = useModal();
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { wallet, loading, connectWallet, disconnectWallet, refreshWallet } = useContext<WalletContextType>(WalletContext);

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
                toggleNotificationDownload();
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
                        <Image className={cx("wallet-short-image")} src={wallet?.image} alt="" />
                        <span className={cx("wallet-short-name")}>{!loading && wallet?.balance + " ₳"} </span>
                    </div>

                    {isOpenShowWallet && (
                        <div className={cx("show-wallet-wrapper", { scrolled: isScrolled })}>
                            <CopyToClipboard text={String(wallet.address)}>
                                <div className={cx("show-wallet-item")}>
                                    <h3 className={cx("show-wallet-name")}>Address: </h3>
                                    <p className={cx("show-wallet-description")}>{wallet?.address}</p>
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
                            <div onClick={toggleWalletLong} className={cx("wallet-short-container")}>
                                <span className={cx("wallet-short-name")}>View all</span>
                            </div>
                        </div>
                    )}
                </Button>
            )}

            <Modal isShowing={isShowingWalletLong} toggle={toggleWalletLong}>
                <div className={cx("wallet-long-wrapper")}>
                    <header className={cx("wallet-long-header")}>
                        <h2 className={cx("wallet-long-title")}>Select wallet to connect</h2>
                        <div className={cx("wallet-long-close")} onClick={toggleWalletLong}>
                            <CloseIcon />
                        </div>
                    </header>
                    <section className={cx("wallet-long-list")}>
                        {wallets.map(function (wallet: WalletType, index: number) {
                            return (
                                <div
                                    key={index}
                                    className={cx("wallet-long-item")}
                                    onClick={() => {
                                        handleConnectWallet(wallet);
                                        toggleWalletLong();
                                    }}
                                >
                                    <div className={cx("wallet-long-content")}>
                                        <Image src={wallet.image} alt="" className={cx("wallet-long-image")} />
                                        <div className={cx("wallet-long-name")}>{wallet.name} wallet</div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </div>
            </Modal>

            <Modal isShowing={isShowingNotificationDownload} toggle={toggleNotificationDownload}>
                <div className={cx("wallet-download")}>
                    <section className={cx("nowallet-content")}>
                        <p>The selected ({wallet?.name}) wallet has not been installed. Do you want to visit Chrome Web Store and install it now?</p>
                    </section>
                    <div className={cx("nowallet-button")}>
                        <Button className={cx("button-ok")} onClick={toggleNotificationDownload}>
                            CANCEL
                        </Button>
                        <Link target="_blank" href={String(wallet?.downloadApi)} className={cx("button-cancel")} rel="noopener noreferrer">
                            OK
                        </Link>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ConnectWallet;
