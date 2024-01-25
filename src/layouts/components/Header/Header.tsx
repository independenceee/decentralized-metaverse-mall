"use client";

import React, { useEffect, useState, lazy } from "react";
import classNames from "classnames/bind";
import images from "@/assets/images";
import Image from "next/image";
import HeaderOption from "@/layouts/components/Header/HeaderOption";
import { publicRoutes } from "@/routes";
import styles from "./Header.module.scss";
import configs from "@/configs";

const ConnectWallet = lazy(() => import("@/layouts/components/ConnectWallet"));

type Props = {};

const cx = classNames.bind(styles);

const Header = function ({}: Props) {
    const [selected, setSelected] = useState<string>(configs.routes.home);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = function () {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <header
            className={cx("header", {
                scrolled: isScrolled,
            })}
        >
            <div className={cx("wrapper")}>
                <div className={cx("wrapper-inner")}>
                    <div className={cx("logo")}>
                        <Image className={cx("logo-image")} src={images.logo} alt="crytoz-logo" />
                    </div>
                    <nav className={cx("navbar")}>
                        <ul className={cx("nav-list")}>
                            {publicRoutes.map(function ({ name, redirect }, index: number) {
                                return (
                                    <HeaderOption
                                        key={index}
                                        name={name}
                                        redirect={redirect}
                                        isActive={Boolean(selected === redirect)}
                                        setSelected={setSelected}
                                    />
                                );
                            })}
                        </ul>
                    </nav>
                    <ConnectWallet />
                </div>
            </div>
        </header>
    );
};

export default Header;
