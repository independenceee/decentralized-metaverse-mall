"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { privateRoutes } from "@/routes";
import SidebarOption from "./SidebarOption";
import ModalContext from "@/contexts/components/ModalContext";
import { ModalContextType } from "@/types/contexts/ModalContextType";
import Logo from "@/components/Logo";
import ConnectWallet from "@/layouts/components/ConnectWallet";
import Image from "next/image";
import images from "@/assets/images";

const cx = classNames.bind(styles);

type Props = {
    selectedRouter: string;
    setSelectedRouter: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar = function ({ selectedRouter, setSelectedRouter }: Props) {
    const { isShowingSidebar } = useContext<ModalContextType>(ModalContext);

    return (
        <main className={cx("wrapper", { open: isShowingSidebar })}>
            <Logo className={cx("sidebar-logo")} />
            <Image src={images.logoWithoutSlogan} className={cx("logo-no-slogan")} alt="logo-without-slogan" />
            <nav className={cx("navbar")}>
                <ul className={cx("navbar-list")}>
                    {privateRoutes.map(function (route, index: number) {
                        return (
                            <SidebarOption
                                key={index}
                                name={route.name}
                                redirect={route.redirect}
                                isActive={Boolean(selectedRouter === route.name.toLowerCase())}
                                Icon={route.Icon}
                                setSelected={setSelectedRouter}
                            />
                        );
                    })}
                </ul>
            </nav>
        </main>
    );
};

export default Sidebar;
