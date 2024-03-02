"use client";

import classNames from "classnames/bind";
import React, { useState } from "react";
import styles from "./HotDeal.module.scss";
import Image from "next/image";
import images from "@/assets/images";
import icons from "@/assets/icons";
import { Link } from "react-scroll";
import routes from "@/configs/routes";

const cx = classNames.bind(styles);

const HotDeal = function () {
    const [open, setOpen] = useState<boolean>(true);

    const closeHotDeal = function (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
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
                    <div className={cx("close-button")} aria-hidden onClick={closeHotDeal}>
                        <Image src={icons.closeIcon} alt="" />
                    </div>

                    <Image src={images.hotDeal} alt="hot deal" className={cx("image")} />
                </Link>
            </div>
        </div>
    );
};

export default HotDeal;
