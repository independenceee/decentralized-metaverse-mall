import React from "react";
import classNames from "classnames/bind";
import styles from "./Transaction.module.scss";
import { AddIcon } from "@/components/Icons";
import images from "@/assets/images";
import Image from "next/image";

type Props = {
    type: string;
};

const cx = classNames.bind(styles);

const Transactions = function ({ type }: Props) {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <h3 className={cx("title")}>All Transaction</h3>
                <button className={cx("button")}>
                    <AddIcon className={cx("icon")} />
                </button>
            </header>
            {type === "transaction" && (
                <aside className={cx("transaction-wrapper")}>
                    <div className={cx("transaction-container")}>
                        {[1, 2, 3].map((transaction, index: number) => (
                            <div className={cx("transaction-item")} key={index}>
                                <div className={cx("transaction-left")}>
                                    <div className={cx("image-wrapper")}>
                                        <Image className={cx("image")} src={images.user} alt="USER" />
                                    </div>
                                    <div className={cx("transaction-infomation")}>
                                        <p className={cx("transaction-name")}>Admin Nguyen</p>
                                        <p className={cx("transaction-datetime")}>17/11/2003</p>
                                    </div>
                                </div>
                                <div className={cx("transaction-right")}>$2000</div>
                            </div>
                        ))}
                    </div>
                </aside>
            )}

            {type === "voucher" && (
                <div className={cx("voucher")}>
                    <p>Amout</p>
                    <div className={cx("amount")}>22,000</div>
                    <div className={cx("voucher-wrapper")}>
                        <span className={cx("hidden")}>**** **** **** </span>
                        <span> 1234</span>
                    </div>
                    <div className={cx("card-logo-wrapper")}>
                        <div>
                            <p>Expires</p>
                            <p>{Date.now()}</p>
                        </div>
                        <div className={cx("card-logo")}>
                            <div className={cx("logo-shape1")}></div>
                            <div className={cx("logo-shape2")}></div>
                        </div>
                    </div>
                </div>
            )}
            {type === "addition" && (
                <p className={cx("addition")}>You want to transaction</p>
            )}
        </div>
    );
};

export default Transactions;
