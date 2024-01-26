"use client";

import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import images from "@/assets/images";
import { privateRoutes } from "@/routes";
import SidebarOption from "./SidebarOption";
import ModalContext from "@/contexts/components/ModalContextType";
import { ModalContextType } from "@/types/contexts/ModalContextType";

const cx = classNames.bind(styles);

type Props = {
    selectedRouter: string;
    setSelectedRouter: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar = function ({ selectedRouter, setSelectedRouter }: Props) {
    const { isShowingSidebar } = useContext<ModalContextType>(ModalContext);

    return (
        <main className={cx("wrapper", { open: isShowingSidebar })}>
            <div className={cx("logo")}>
                <Image className={cx("logo-image")} src={images.logo} alt="Logo" />
            </div>

            <nav className={cx("navbar")}>
                <ul className={cx("navbar-list")}>
                    {privateRoutes.map(function (route, index: number) {
                        return (
                            <SidebarOption
                                key={index}
                                name={route.name}
                                redirect={route.redirect}
                                isActive={Boolean(selectedRouter === route.name)}
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
