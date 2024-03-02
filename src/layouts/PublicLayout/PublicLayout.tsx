"use client";

import React, { ReactNode, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./PublicLayout.module.scss";
import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer";
import Notification from "../components/Notification";
import { StakeContextType } from "@/types/contexts/StakeContextType";
import StakeContext from "@/contexts/components/StakeContext";
import HotDeal from "@/components/HotDeal";

type Props = {
    children: ReactNode;
};

const cx = classNames.bind(styles);

const PublicLayout = function ({ children }: Props) {
    const { stakeInfomation } = useContext<StakeContextType>(StakeContext);
    return (
        <main className={cx("wrapper")}>
            <Header />
            <div>{children}</div>
            <Notification />
            {/* <HotDeal /> */}
            <Footer />
        </main>
    );
};

export default PublicLayout;
