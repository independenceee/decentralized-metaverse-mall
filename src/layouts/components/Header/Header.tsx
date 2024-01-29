"use client";

import React, { useEffect, useState, lazy } from "react";
import classNames from "classnames/bind";
import HeaderOption from "@/layouts/components/Header/HeaderOption";
import { publicRoutes } from "@/routes";
import styles from "./Header.module.scss";
import configs from "@/configs";
import Hamburger from "@/components/Hamburger";
import Logo from "@/components/Logo";
import { useScroll } from "@/hooks";

const ConnectWallet = lazy(() => import("@/layouts/components/ConnectWallet"));

type Props = {};

const cx = classNames.bind(styles);

const Header = function ({}: Props) {
    const [selected, setSelected] = useState<string>(configs.routes.home);
    const [isScrolled] = useScroll({ offset: 0 });

    return (
        <header
            className={cx("header", {
                scrolled: isScrolled,
            })}
        >
            <div className={cx("wrapper")}>
                <div className={cx("wrapper-inner")}>
                    <div className={cx("logo")}>
                        <Logo />
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
                    <div className={cx("nav-right-wrapper")}>
                        <ConnectWallet />
                        <Hamburger />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
