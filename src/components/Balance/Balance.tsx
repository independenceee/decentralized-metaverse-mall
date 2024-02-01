import React from "react";
import classNames from "classnames/bind";
import styles from "./Balance.module.scss";
import { converToSocialNumber } from "@/helpers/utils";

const cx = classNames.bind(styles);

function Balance() {
    return (
        <div className={cx("balance-wrapper")}>
            <div className={cx("balance-header")}>
                <h2 className={cx("balance-title")}>Your Balance</h2>
                <div className={cx("balance-content")}>
                    <button className={cx("wrapper-button")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={cx("icon-ellipsis")}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={cx("balance-body")}>
                <div>
                    <div className={cx("balance-info")}>
                        <p className={cx("wallet-address")}>0x9CDBC28F0A6C13BB42ACBD3A3B366BFCAB07B8B1</p>
                        <button className={cx("copy-button")}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={cx("icon-copy")} viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                            </svg>
                        </button>
                    </div>
                    <div className={cx("wallet-money")}>$5,566.00</div>
                    <p className={cx("token-amount")}>{converToSocialNumber(2000000000)} C2E</p>
                </div>
                <div className={cx("balance-statistics")}>
                    <div>
                        <p className={cx("statistics-title")}>Income</p>
                        <div className={cx("statistics-content")}>
                            <div className={cx("icon-wrapper", "flex size-7 items-center justify-center rounded-full bg-black/20 text-white")}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={cx("icon-updown")}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                </svg>
                            </div>
                            <p className={cx("total-money", "text-base font-medium text-white")}>$2,225.22</p>
                        </div>
                        <button
                            className={cx(
                                "action-button",
                                "btn mt-3 w-full border border-white/10 bg-white/20 text-white hover:bg-white/30 focus:bg-white/30",
                            )}
                        >
                            Receive
                        </button>
                    </div>
                    <div>
                        <p className={cx("statistics-title")}>Expense</p>
                        <div className={cx("statistics-content")}>
                            <div className={cx("icon-wrapper", "flex size-7 items-center justify-center rounded-full bg-black/20 text-white")}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={cx("icon-updown")}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                </svg>
                            </div>
                            <p className={cx("total-money")}>$225.22</p>
                        </div>
                        <button
                            className={cx(
                                "action-button",
                                "btn mt-3 w-full border border-white/10 bg-white/20 text-white hover:bg-white/30 focus:bg-white/30",
                            )}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Balance;
