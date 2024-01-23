import React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import ServiceContainer from "@/components/ServiceContainer";

type Props = {};

const cx = classNames.bind(styles);

const HomePage = function ({}: Props) {
    return <ServiceContainer />;
};

export default HomePage;
