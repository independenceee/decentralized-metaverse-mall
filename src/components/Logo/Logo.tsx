import classNames from "classnames/bind";
import Image from "next/image";
import React from "react";
import styles from "./Logo.module.scss";
import images from "@/assets/images";

const cx = classNames.bind(styles);

function Logo() {
    return <Image className={cx("logo-image")} src={images.logo} alt="crytoz-logo" />;
}

export default Logo;
