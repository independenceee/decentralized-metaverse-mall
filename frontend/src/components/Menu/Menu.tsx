"use client";

import classNames from "classnames/bind";
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-scroll";
import configs from "@/configs";
import { publicRoutes } from "@/routes";
import styles from "./Menu.module.scss";
import Modal from "../Modal";
import ConnectWallet from "@/layouts/components/ConnectWallet";

const cx = classNames.bind(styles);

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

function Menu({ open, setOpen }: Props) {
    const [selected, setSelected] = useState<string>(configs.routes.home);
    const handleRedirect = (redirect: string) => {
        setSelected(redirect);
        setOpen(false);
    };

    const hideOnClickOutside = () => {
        setOpen(false);
    };

    return (
        <div
            className={cx("menu-overlay", {
                open,
            })}
            onClick={hideOnClickOutside}
        >
            <nav
                className={cx("menu-wrapper", {
                    open,
                })}
                onClick={(e) => e.stopPropagation()}
            >
                <ul className={cx("nav-list")}>
                    {publicRoutes.map(function ({ name, redirect }, index: number) {
                        return (
                            <li className={cx("nav-item")} key={index}>
                                <Link
                                    to={redirect}
                                    className={cx("nav-item-link", {
                                        "nav-item-link-active": redirect === selected,
                                    })}
                                    spy={true}
                                    smooth={true}
                                    offset={-104}
                                    onSetActive={handleRedirect}
                                    duration={1000}
                                >
                                    {name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <ConnectWallet className={cx("connect-wallet")} />
            </nav>
        </div>
    );
}

export default Menu;
