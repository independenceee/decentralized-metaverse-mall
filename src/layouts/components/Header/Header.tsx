"use client";
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "@/assets/images";
import Image from "next/image";
import HeaderOptions from "./HeaderOptions/HeaderOptions";

type Props = {};

const cx = classNames.bind(styles);

const Header = function ({}: Props) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
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
                    <div className="logo">
                        <Image src={images.logo} alt="crytoz-logo" />
                    </div>
                    <nav>
                        <HeaderOptions />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
