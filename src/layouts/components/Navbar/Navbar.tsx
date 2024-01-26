"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import icon from "@/assets/icons";
import styles from "./Navbar.module.scss";
import ConnectWallet from "@/layouts/components/ConnectWallet";
import Image from "next/image";
type Props = {};

const cx = classNames.bind(styles);

const Navbar = function ({}: Props) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = function () {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });
    return (
        <div
            className={cx("wrapper", {
                scrolled: isScrolled,
            })}
        >
            <div className={cx("left")}>
                <button type="button" className={cx("sidebar-toggle")}>
                    <Image className={cx("image")} src={icon.menuIcon} alt="" />
                </button>
                <h3 className={cx("title")}>Home</h3>
            </div>
            <div className={cx("right")}>
                <ConnectWallet />
            </div>
        </div>
    );
};

export default Navbar;
