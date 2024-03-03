"use client";

import classNames from "classnames/bind";
import React, { useState } from "react";
import Slider, { Settings } from "react-slick";

import styles from "./VoucherCategories.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import images from "@/assets/images";
import Button from "../Button";
import icons from "@/assets/icons";

const cx = classNames.bind(styles);

type Props = {};

const VoucherCategories = function ({}: Props) {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const slider = React.useRef<Slider>(null);

    const settings: Settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        beforeChange: (_, nextSlide) => {
            setSlideIndex(nextSlide);
        },

        prevArrow: (
            <span className={cx("custom-arrow")}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={cx("arrow-icon")}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </span>
        ),
        nextArrow: (
            <span className={cx("custom-arrow")}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={cx("arrow-icon")}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </span>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                },
            },
        ],
    };

    const handleGoToSlide = (index: number) => {
        slider.current?.slickGoTo(index);
    };

    return (
        <div className={cx("wrapper")}>
            <Slider {...settings} className={cx("categories-slider")} ref={slider}>
                {Array(5)
                    .fill(0)
                    .map((_, index) => {
                        const active = slideIndex === index;
                        return (
                            <div
                                className={cx("category", {
                                    appear: active,
                                })}
                                key={index}
                            >
                                <div className={cx("catergory-left")}>
                                    <div className={cx("trending")}>Trending</div>
                                    <h2 className={cx("title")}>Tappy by TapTools</h2>
                                    <div className={cx("description")}>
                                        Tappy is a collection of 5,555 unique penguins living on the Cardano blockchain, each acting as an access pass
                                        to TapTools Pro, with access valid until September 1, 2024.
                                    </div>
                                    <Button className={cx("button-view-details")}>View details</Button>
                                </div>
                                <div className={cx("catergory-right")}>
                                    <div className={cx("voucher-image-wrapper")}>
                                        <div className={cx("voucher-floating", "voucher-floating-top")}>
                                            <span className={cx("icon-wrapper")}>
                                                <Image src={icons.chart} alt="icon-chart" className={cx("icon")} />
                                            </span>
                                            <div>100% Business Growth</div>
                                        </div>
                                        <div className={cx("voucher-floating", "voucher-floating-bottom")}>
                                            <span className={cx("icon-wrapper")}>
                                                <Image src={icons.message} alt="icon-chart" className={cx("icon")} />
                                            </span>
                                            <div>100% Business Growth</div>
                                        </div>
                                        <Image src={images.voucher} alt="voucher" className={cx("voucher-image")} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </Slider>
            <div className={cx("categories-overflow")}>
                <div className={cx("category-buttons-wrapper")}>
                    {Array(5)
                        .fill(0)
                        .map((_, index) => {
                            const active = slideIndex === index;
                            return (
                                <div
                                    onClick={() => handleGoToSlide(index)}
                                    className={cx("category-button", {
                                        active,
                                    })}
                                    key={index}
                                >
                                    {index}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default VoucherCategories;
