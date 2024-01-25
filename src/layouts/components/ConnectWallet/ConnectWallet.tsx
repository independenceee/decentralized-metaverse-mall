"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import classNames from "classnames/bind";
import styles from "./ConnectWallet.module.scss";
import { ArrowDownIcon } from "@/components/Icons";

const cx = classNames.bind(styles);

type Props = {};

const ConnectWallet = function ({}: Props) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = function () {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [window.scrollY]);

    return (
        <div className={cx("wrapper")}>
            <Button RightIcon={ArrowDownIcon} className={cx("connect-wallet", { scrolled: isScrolled })}>
                Connect wallet
                <div className={cx("connect-wallet-short")}>
                    
                </div>
            </Button>
        </div>
    );
};

export default ConnectWallet;
