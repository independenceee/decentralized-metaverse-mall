import React from "react";
import classNames from "classnames/bind";
import styles from "./Transaction.module.scss";
import { AddIcon } from "@/components/Icons";

type Props = {
    transactions: any;
};

const cx = classNames.bind(styles);

const Transactions = function ({ transactions }: Props) {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <h3 className={cx("title")}>All Transaction</h3>
                <button className={cx("button")}>
                    <AddIcon className={cx("icon")} />
                </button>
            </header>
            <aside className="grid-content">
                <div className="grid-items">
                    {transactions.map((transaction: any) => (
                        <div className="grid-item" key={transaction.id}>
                            <div className="grid-item-l">
                                <div className="avatar img-fit-cover">
                                    <img src={transaction.image} alt="" />
                                </div>
                                <p className="text">
                                    {transaction.name} <span>{transaction.date}</span>
                                </p>
                            </div>
                            <div className="grid-item-r">
                                <span className="text-scarlet">$ {transaction.amount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
};

export default Transactions;
