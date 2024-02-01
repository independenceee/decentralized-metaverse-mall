"use client";

import classNames from "classnames/bind";
import styles from "./Notification.module.scss";
import Popper from "@/components/Popper/Popper";
import Logo from "@/components/Logo";
import { useModal } from "@/hooks";

const cx = classNames.bind(styles);

type Props = {
    isPending: boolean;
};

function Notification({ isPending }: Props) {
    const { isShowing, toggle } = useModal();

    return (
        <Popper
            placement="top-end"
            hideOnClick={isShowing}
            content={
                <div className={cx("content-wrapper")}>
                    <div className={cx("notification-header")}>
                        <div className={cx("logo-wrapper")}>
                            {/* <Logo /> */}
                            DMM
                        </div>
                        <button className={cx("close-button")} onClick={toggle}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className={cx("icon-minus")}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                            </svg>
                        </button>
                    </div>

                    <div className={cx("conent-body")}>
                        {!isPending ? (
                            <>
                                <h3 className={cx("title")}>You need enough 4 epoches to be received the first voucher</h3>
                                <button className={cx("stake-button", "button")}>Stake now</button>
                            </>
                        ) : (
                            <>
                                <h3 className={cx("title")}>You have voucher unused</h3>
                                <div className={cx("voucher-info")}>
                                    <span>Voucher code:&nbsp;</span>
                                    <span>0x93fk3l2had844jh643262h64</span>
                                </div>
                                <div className={cx("product-link")}>
                                    <span>Product:&nbsp;</span>
                                    <a href="https://google.com" target="_blank">
                                        https://google.com
                                    </a>
                                </div>
                                <button className={cx("shop-button", "button")}>Shop now</button>
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <button className={cx("notification-button")}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={cx("icon-notification")}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                </svg>
                <div className={cx("dot")} />
            </button>
        </Popper>
    );
}

export default Notification;
