"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer";
import Notification from "@/layouts/components/Notification";
import { StakeContextType } from "@/types/contexts/StakeContextType";
import StakeContext from "@/contexts/components/StakeContext";
import Form from "@/layouts/components/Form";
import styles from "./PublicLayout.module.scss";
import HotDeal from "@/components/HotDeal";
import Loading from "@/app/(loading)/loading";

type Props = {
    children: ReactNode;
};

const cx = classNames.bind(styles);
const LOADING_TIME = 3000;
const PublicLayout = function ({ children }: Props) {
    const [pageLoading, setPageLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, LOADING_TIME);
    }, []);

    return (
        <main className={cx("wrapper")}>
            <Header />
            <Form />
            <div>{children}</div>
            <Notification />
            <HotDeal />
            <Footer />
            {pageLoading && <Loading />}
        </main>
    );
};

export default PublicLayout;
