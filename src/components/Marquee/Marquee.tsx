import classNames from "classnames/bind";
import React from "react";

import styles from "./Marquee.module.scss";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
const cx = classNames.bind(styles);
type Props = {
    repeat?: number;
    className?: string;
    classNameWrapper?: string;
    reverse?: boolean;
    duration?: number;
    images: (string | StaticImport)[];
};

const Marquee = function ({ images, repeat = 12, className, classNameWrapper, reverse = false, duration = 10000 }: Props) {
    return (
        <div
            className={cx("wrapper", classNameWrapper)}
            style={
                {
                    "--duration": `${duration}ms`,
                    "--direction": reverse ? "reverse" : "normal",
                } as Record<string, string>
            }
        >
            <div className={cx("wrapper-inner")}>
                {Array.from({ length: repeat }, () => images)
                    .flat()
                    .map((image: string | StaticImport, index) => (
                        <div className={cx("item", className)} key={index}>
                            <Image width={150} height={100} src={image} alt="marquee" className={cx("image")} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Marquee;
