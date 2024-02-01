import React from "react";
import classNames from "classnames/bind";
import { AddIcon } from "@/components/Icons";
import images from "@/assets/images";
import Image from "next/image";
import styles from "./Transaction.module.scss";

type Props = {
    type: string;
};

const cx = classNames.bind(styles);

const Transactions = function ({ type }: Props) {
    return <div></div>;
};

export default Transactions;
