"use client";

import classNames from "classnames/bind";
import React, { useState } from "react";
import Slider, { Settings } from "react-slick";

import styles from "./VoucherCategories.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Button from "../Button";
import icons from "@/assets/icons";
import { useGetCategoryWithBannerQuery } from "@/redux/api/categories.api";

const cx = classNames.bind(styles);

type Props = {};

const VoucherCategories = function ({}: Props) {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const slider = React.useRef<Slider>(null);

    const { data } = useGetCategoryWithBannerQuery();

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

    if (data) {
        return (
            <div className={cx("wrapper")}>
                <Slider {...settings} className={cx("categories-slider")} ref={slider}>
                    {data.map((category, index) => {
                        const active = slideIndex === index;
                        return (
                            <div
                                className={cx("category", {
                                    appear: active,
                                })}
                                key={index}
                            >
                                <div className={cx("catergory-left")} data-aos="fade-right">
                                    <div className={cx("trending")}>Trending</div>
                                    <h2 className={cx("title")}>{category.banner?.title}</h2>
                                    <div className={cx("description")}>{category.banner?.description}</div>
                                    <Button className={cx("button-view-details")}>View details</Button>
                                </div>
                                <div className={cx("catergory-right")} data-aos="fade-left">
                                    <div className={cx("voucher-image-wrapper")}>
                                        <div className={cx("voucher-floating", "voucher-floating-top")}>
                                            <span className={cx("icon-wrapper")}>
                                                <Image src={icons.chart} alt="icon-chart" className={cx("icon")} />
                                            </span>
                                            <div>100% Business Growth</div>
                                        </div>
                                        <div className={cx("voucher-floating", "voucher-floating-bottom")}>
                                            <span className={cx("icon-wrapper")}>
                                                <Image
                                                    width={999999}
                                                    height={999999}
                                                    src={process.env.PUBLIC_IMAGES_DOMAIN! + "/banner/" + category.banner?.image}
                                                    alt="icon-chart"
                                                    className={cx("icon")}
                                                />
                                            </span>
                                            <div>100% Business Growth</div>
                                        </div>
                                        <Image
                                            width={999999}
                                            height={999999}
                                            src={process.env.PUBLIC_IMAGES_DOMAIN! + "/category/" + category.image}
                                            alt="voucher"
                                            className={cx("voucher-image")}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
                <div className={cx("categories-overflow")} data-aos="fade-up">
                    <div className={cx("category-buttons-wrapper")}>
                        {data.map((category, index: number) => {
                            const active = slideIndex === index;
                            return (
                                <div
                                    onClick={() => handleGoToSlide(index)}
                                    className={cx("category-button", {
                                        active,
                                    })}
                                    key={index}
                                >
                                    <div className={cx("category-button-icon-wrapper")}>
                                        <Image
                                            className={cx("category-button-icon")}
                                            width={999999}
                                            height={999999}
                                            src={process.env.PUBLIC_IMAGES_DOMAIN! + "/category/" + category.image}
                                            alt={category.name}
                                        />
                                    </div>
                                    <div className={cx("category-name")}>{category.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
};

export default VoucherCategories;
