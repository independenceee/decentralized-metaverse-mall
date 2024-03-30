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
            <div className={cx("flip-card")}>
                <div className={cx("flip-card-front")}>
                    <div className={cx("inner")}>
                        <div className={cx("service-icon")}>
                            <Image className={cx("service-image")} src={service.image} alt="" />
                        </div>
                        <div className={cx("service-detail-front")}>
                            <h3 className={cx("service-title")}>{service.title}</h3>
                            <p className={cx("service-subtitle")}>{service.subTitle}</p>
                        </div>
                    </div>
                </div>
                <div className={cx("flip-card-back")}>
                    <div className={cx("inner")}>
                        <div className={cx("service-detail-back")}>
                            <p className={cx("service-subtitle")}>{service.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;
