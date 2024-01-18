"use client";

import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import styles from "@/layouts/components/Sidebar/Sidebar.module.scss";
import sidebarDatas from "@/constants/sidebar-data";

const cx = classNames.bind(styles);

type Props = {};

const Sidebar = function ({}: Props) {
    const [selected, setSelected] = useState<number>(0);
    const [expanded, setExpaned] = useState<boolean>(true);

    const sidebarVariants = { true: { left: "0" }, false: { left: "-60%" } };

    return (
        <div>
            <div
                className={cx("bars")}
                style={expanded ? { left: "60%" } : { left: "5%" }}
                onClick={() => setExpaned(!expanded)}
            >
                <UilBars />
            </div>
            <motion.div
                className={cx("wrapper")}
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ""}
            >
                {/* logo-begin */}
                <section className={cx("logo")}>
                    {/* <Image src={} className={cx("logo-image")} /> */}
                    <span className={cx("logo-content")}>
                        Decentralized Metaverse Mall
                    </span>
                </section>
                {/* logo-end */}
                {/* menu-begin */}
                <section className={cx("menu")}>
                    {sidebarDatas.map(function (
                        { icon, heading },
                        index: number,
                    ) {
                        return <div className={cx("")}></div>;
                    })}
                </section>
                {/* menu-end */}
            </motion.div>
        </div>
    );
};

export default Sidebar;
