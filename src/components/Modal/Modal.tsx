import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);
type Props = {
    children: ReactNode;
    isShowing: boolean;
    toggle: () => void;
    transparent?: boolean;
};

const Modal: React.FC<Props> = function ({ isShowing, toggle, children, transparent }: Props) {
    if (isShowing) {
        return (
            <main className={cx("wrapper")}>
                <section className={cx("modal")} onClick={toggle}></section>
                {children}
            </main>
        );
    }

    return null;
};

export default Modal;
