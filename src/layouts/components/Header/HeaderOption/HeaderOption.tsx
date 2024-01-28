import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderOption.module.scss";

import Link from "next/link";
import useGSAP from "@/hooks/useGSAP";

const cx = classNames.bind(styles);

type Props = {
    redirect: string;
    name: string;
    isActive: boolean;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const HeaderOption = function ({ redirect, name, isActive, setSelected }: Props) {
    const { handleScrollPy } = useGSAP();
    const handleClickNavItem = function (redirect: string) {
        setSelected(redirect);
        handleScrollPy(redirect);
    };

    return (
        <li className={cx("nav-item")}>
            <Link onClick={() => handleClickNavItem(redirect)} href={redirect} className={cx("nav-item-link", { "nav-item-link-active": isActive })}>
                {name}
            </Link>
        </li>
    );
};

export default HeaderOption;
