import React from "react";
import classNames from "classnames/bind";
import styles from "./ServiceItem.module.scss";
import Image from "next/image";

type Props = {
    title: string;
    subTitle: string;
    description: string;
    image: string;
    index: number;
};

const cx = classNames.bind(styles);

const ServiceItem = function ({ title, subTitle, description, image, index }: Props) {
    return (
        <div className={cx("wrapper")} data-aos="fade-up" data-aos-delay={`${100 * (index + 4)}`} data-aos-duration={`${1000 * (index + 4)}`}>
            <div className={cx("container")}>
                <section className={cx("frontend")}>
                    <div className={cx("service-icon")}>
                        <Image className={cx("service-image")} src={image} alt="" />
                    </div>
                    <div className={cx("service-detail")}>
                        <h3 className={cx("service-title")}>{title}</h3>
                        <p className={cx("service-subtitle")}>{subTitle}</p>
                    </div>
                </section>
                <section className={cx("backend")}>
                    <div className={cx("service-detail")}>
                        <p className={cx("service-subtitle")}>{description}</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ServiceItem;
