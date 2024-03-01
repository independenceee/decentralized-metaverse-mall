"use client";

import classNames from "classnames/bind";
import React, { useState } from "react";
import styles from "./HotDeal.module.scss";
import Image from "next/image";
import images from "@/assets/images";
import { Link } from "react-scroll";
import routes from "@/configs/routes";

const cx = classNames.bind(styles);

const HotDeal = function () {
    const [open, setOpen] = useState<boolean>(true);

    const closeHotDeal = function (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();
        setOpen(false);
    };

    return (
        <div
            className={cx("overlay", {
                open,
            })}
        >
            <div className={cx("wrapper")}>
                <Link onClick={() => setOpen(false)} to={routes.home} spy={true} smooth={true} duration={1000} className={cx("image-wrapper")}>
                    <button className={cx("close-button")} onClick={closeHotDeal}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className={cx("icon-close")}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <Image src={images.hotDeal} alt="hot deal" className={cx("image")} />
                </Link>
            </div>
        </div>
    );
};

export default HotDeal;
