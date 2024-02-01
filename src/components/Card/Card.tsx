import React from "react";
import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import { IconType } from "react-icons";
import Link from "next/link";
import { AddIcon } from "../Icons";

type Props = {
    title: string;
    Icon?: IconType;
    to: string;
    type?: string;
};

const cx = classNames.bind(styles);

const Card = function ({ title, Icon, to, type }: Props) {
    return (
        <Link href={to} className={cx("wrapper")}>
            <header className={cx("header")}>
                <h3 className={cx("title")}>{title}</h3>
                <button className={cx("button")}>{Icon && <Icon className={cx("icon")} />}</button>
            </header>
            {type === "add" && (
                <aside className={cx("add-content")}>
                    <div className={cx("add-left")}>Add voucher using import file .csv</div>
                    <div className={cx("add-right")}>
                        <AddIcon className={cx("add-icon")} />
                    </div>
                </aside>
            )}
        </Link>
    );
};

export default Card;
