"use client";

import classNames from "classnames/bind";
import { useState } from "react";
import Link from "next/link";
import configs from "@/configs";
import { publicRoutes } from "@/routes";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function Menu() {
    const [selected, setSelected] = useState<string>(configs.routes.home);
    const handleRedirect = (redirect: string) => {
        setSelected(redirect);
    };

    const onClickOutside = () => {
        
    };

    return (
        <div className={cx("menu")} onClick={onClickOutside}>
            <div className={cx("menu-overlay")} />
            <nav className={cx("menu-wrapper")}>
                <ul className={cx("nav-list")}>
                    {publicRoutes.map(function ({ name, redirect }, index: number) {
                        return (
                            <li className={cx("nav-item")} key={index}>
                                <Link
                                    href={redirect}
                                    className={cx("nav-item-link", {
                                        "nav-item-link-active": redirect === selected,
                                    })}
                                    onClick={() => handleRedirect(redirect)}
                                >
                                    {name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            ;
        </div>
    );
}

export default Menu;
