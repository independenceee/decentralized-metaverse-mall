import React from "react";
import classNames from "classnames/bind";
import styles from "./Service.module.scss";
import Image from "next/image";
import { ServiceType } from "@/types/GenericsType";

type Props = {
    service: ServiceType;
    index: number;
};

const cx = classNames.bind(styles);

const Service = function ({ service, index }: Props) {
    return (
        <div className={cx("wrapper")} data-aos="fade-up" data-aos-delay={`${100 * (index + 4)}`} data-aos-duration={`${1000 * (index + 4)}`}>
            <div className={cx("wrapper-inner")}>
                <section className={cx("frontend")}>
                    <div className={cx("service-icon")}>
                        <Image className={cx("service-image")} src={service.image} alt="" />
                    </div>
                    <div className={cx("service-detail")}>
                        <h3 className={cx("service-title")}>{service.title}</h3>
                        <p className={cx("service-subtitle")}>{service.subTitle}</p>
                    </div>
                </section>
                {/* <section className={cx("backend")}>
                    <div className={cx("service-detail")}>
                        <p className={cx("service-subtitle")}>{service.description}</p>
                    </div>
                </section> */}
            </div>
        </div>
    );
};

export default Service;
