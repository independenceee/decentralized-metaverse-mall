import React from "react";
import classNames from "classnames/bind";
import TitleContent from "@/components/TitleContent";
import ServiceItem from "@/components/ServiceContainer/ServiceItem";
import services from "@/constants/services";
import styles from "./ServiceContainer.module.scss";

type Props = {};

const cx = classNames.bind(styles);

const ServiceContainer = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <TitleContent title="Services" subTitle="We Translate Your Dream Into Reality" />
                {services.map(function (service, index: number) {
                    return (
                        <ServiceItem
                            key={index}
                            title={service.title}
                            index={index}
                            description={service.description}
                            subTitle={service.subTitle}
                            image={service.image}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ServiceContainer;
