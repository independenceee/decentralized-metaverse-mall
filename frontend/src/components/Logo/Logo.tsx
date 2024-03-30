import classNames from "classnames/bind";
import Image from "next/image";
import React from "react";
import images from "@/assets/images";
import Link from "next/link";
import styles from "./Logo.module.scss";

const cx = classNames.bind(styles);

function Logo() {
    return (
        <Link href={"/"}>
            <Image className={cx("logo-image")} src={images.logo} alt="crytoz-logo" />
        </Link>
    );
}

export default Logo;
