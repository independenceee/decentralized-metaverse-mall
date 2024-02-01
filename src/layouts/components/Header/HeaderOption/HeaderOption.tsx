import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderOption.module.scss";
import { Link } from "react-scroll";

const cx = classNames.bind(styles);

type Props = {
    redirect: string;
    name: string;
    isActive: boolean;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const HeaderOption = function ({ redirect, name, isActive, setSelected }: Props) {
    const handleClickNavItem = function (redirect: string) {
        setSelected(redirect);
        console.log(redirect);
    };

    return (
        <li className={cx("nav-item")}>
            <Link
                to={redirect}
                className={cx("nav-item-link", { "nav-item-link-active": isActive })}
                spy={true}
                smooth={true}
                offset={-105}
                onSetActive={handleClickNavItem}
                duration={1000}
            >
                {name}
            </Link>
        </li>
    );
};

export default HeaderOption;
