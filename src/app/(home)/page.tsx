import React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import PublicLayout from "@/layouts/PublicLayout";

type Props = {};

const cx = classNames.bind(styles);

const HomePage = function ({}: Props) {
    return (
        <PublicLayout>
            <div>123</div>
        </PublicLayout>
    );
};

export default HomePage;
