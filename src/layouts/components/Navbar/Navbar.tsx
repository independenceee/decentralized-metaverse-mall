"use client";

import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import icon from "@/assets/icons";
import styles from "./Navbar.module.scss";
import ConnectWallet from "@/layouts/components/ConnectWallet";
import Image from "next/image";
import { useScroll } from "@/hooks";
import { ModalContextType } from "@/types/contexts/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";
import { usePathname } from "next/navigation";
type Props = {};

const cx = classNames.bind(styles);

const Navbar = function ({}: Props) {
    const pathname = usePathname();

    const [isScrolled] = useScroll({ offset: 0 });

    const { toggleShowingSidebar } = useContext<ModalContextType>(ModalContext);

    return (
        <div
            className={cx("wrapper", {
                scrolled: isScrolled,
            })}
        >
            <div className={cx("left")}>
                <button onClick={toggleShowingSidebar} type="button" className={cx("sidebar-toggle")}>
                    <Image className={cx("image")} src={icon.menuIcon} alt="" />
                </button>
                <h3 className={cx("title")}>Admin</h3>
            </div>
            <div className={cx("right")}>
                <ConnectWallet />
            </div>
        </div>
    );
};

export default Navbar;
