"use client";

import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Link from "next/link";
import configs from "@/configs";
import { publicRoutes } from "@/routes";
import styles from "./Menu.module.scss";
import Modal from "../Modal";
import useGSAP from "@/hooks/useGSAP";

const cx = classNames.bind(styles);

type Props = {
    isShowing: boolean;
    toggle: () => void;
};

function Menu({ isShowing, toggle }: Props) {
    const [selected, setSelected] = useState<string>(configs.routes.home);
    const { handleScrollPy } = useGSAP();
    const handleRedirect = (redirect: string) => {
        setSelected(redirect);
        toggle();
        handleScrollPy(redirect);
    };

    return (
        <Modal isShowing={isShowing} toggle={toggle}>
            <nav className={cx("menu-wrapper") + " gsap-slider"} data-aos="fade-right">
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
        </Modal>
    );
}

export default Menu;
