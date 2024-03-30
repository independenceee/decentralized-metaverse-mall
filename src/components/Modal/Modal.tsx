"use client";

import React, { ReactNode, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";

const cx = classNames.bind(styles);
type Props = {
    children: ReactNode;
    isShowing: boolean;
    toggle: () => void;
    transparent?: boolean;
};

const Modal: React.FC<Props> = function ({ isShowing, toggle, children }: Props) {
    useEffect(() => {
        document.body.style.overflowY = isShowing ? "hidden" : "auto";
    }, [isShowing]);

    if (!isShowing) return;
    return createPortal(
        <main className={cx("wrapper")}>
            <section className={cx("modal")} onClick={toggle}></section>
            {children}
        </main>,
        document.body,
    );
};

export default Modal;
