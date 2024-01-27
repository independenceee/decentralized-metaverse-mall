import React from "react";
import classNames from "classnames/bind";
import styles from "./Transaction.module.scss";
import { AddIcon } from "@/components/Icons";

type Props = {};

const cx = classNames.bind(styles);

const Transactions = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <h3 className={cx("title")}>All Transaction</h3>
                <button className={cx("button")}>
                    <AddIcon className={cx("icon")} />
                </button>
            </header>
        </div>
    );
};

export default Transactions;
