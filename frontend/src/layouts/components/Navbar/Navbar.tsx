"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import icon from "@/assets/icons";
import styles from "./Navbar.module.scss";
import ConnectWallet from "@/layouts/components/ConnectWallet";
import Image from "next/image";
import { useScroll } from "@/hooks";
import { ModalContextType } from "@/types/contexts/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";

const cx = classNames.bind(styles);

const Navbar = function () {
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
                <ConnectWallet classNameButton={cx("connect-wallet-button")} classNameModal={cx("modal-wallet")} isActive={true} />
            </div>
        </div>
    );
};

export default Navbar;
