"use client";

import React, { ReactNode, useContext } from "react";
import classNames from "classnames/bind";
import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer";
import Notification from "@/layouts/components/Notification";
import { StakeContextType } from "@/types/contexts/StakeContextType";
import StakeContext from "@/contexts/components/StakeContext";
import Form from "@/layouts/components/Form";
import styles from "./PublicLayout.module.scss";

type Props = {
    children: ReactNode;
};

const cx = classNames.bind(styles);

const PublicLayout = function ({ children }: Props) {
    const { stakeInfomation } = useContext<StakeContextType>(StakeContext);
    return (
        <main className={cx("wrapper")}>
            <Header />
            <Form />
            <div>{children}</div>
            <Notification />
            <Footer />
        </main>
    );
};

export default PublicLayout;
