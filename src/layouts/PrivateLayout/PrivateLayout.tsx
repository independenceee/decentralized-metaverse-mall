"use client";

import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./PrivateLayout.module.scss";
import Sidebar from "@/layouts/components/Sidebar";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

const cx = classNames.bind(styles);

type Props = {
    children: ReactNode;
};

const PrivateLayout = function ({ children }: Props) {
    const pathName = usePathname();
    const [selectedRouter, setSelectedRouter] = useState<string>("");

    useEffect(() => {}, []);

    return (
        <main className={cx("wrapper")}>
            <Sidebar selectedRouter={selectedRouter} setSelectedRouter={setSelectedRouter} />
            <div className={cx("main")}>
                <Navbar />
                {children}
            </div>
        </main>
    );
};

export default PrivateLayout;
