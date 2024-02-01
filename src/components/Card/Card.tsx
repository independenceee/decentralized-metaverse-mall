import React from "react";
import classNames from "classnames/bind";
import { AddIcon } from "@/components/Icons";
import images from "@/assets/images";
import Image from "next/image";
import styles from "./Card.module.scss";

type Props = {
    title: string;
    description: string;
    content: string;
    note: string;
    action: string;
};

const cx = classNames.bind(styles);

const Card = function ({ title, description, note, action, content }: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("image-wrapper")}>
                <Image className={cx("image")} src={images.logo} alt="" />
            </div>
            <h3 className={cx("title")}>{title}</h3>
            <p className={cx("description")}>{description}</p>
            <p className={cx("content")}>{content}</p>
            <p className={cx("note")}>{note}</p>
            <button className={cx("button")}>{action}</button>
        </div>
    );
};

export default Card;
