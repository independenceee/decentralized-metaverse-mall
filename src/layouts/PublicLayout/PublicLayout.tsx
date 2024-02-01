import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./PublicLayout.module.scss";
import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer";
import Notification from "../components/Notification";

type Props = {
    children: ReactNode;
};

const cx = classNames.bind(styles);

const PublicLayout = function ({ children }: Props) {
    return (
        <main className={cx("wrapper")}>
            <Header />
            <div>{children}</div>
            <Notification isPending={true} />
            <Footer />
        </main>
    );
};

export default PublicLayout;
