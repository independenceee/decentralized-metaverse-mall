import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./PublicLayout.module.scss";
import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer";
import Banner from "@/components/Banner";
import Faqs from "@/components/Faqs";

type Props = {
    children: ReactNode;
};

const cx = classNames.bind(styles);

const PublicLayout = function ({ children }: Props) {
    return (
        <main className={cx("wrapper")}>
            <Header />
            <div>{children}</div>
            <Faqs />
            <Footer />
        </main>
    );
};

export default PublicLayout;
