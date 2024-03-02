"use client";

import classNames from "classnames/bind";
import React from "react";
import Slider, { Settings } from "react-slick";

import styles from "./VoucherCategories.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import images from "@/assets/images";
import icons from "@/assets/icons";

const cx = classNames.bind(styles);

type Props = {};

const VoucherCategories = function ({}: Props) {
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
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
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className={cx("wrapper")}>
            <Slider {...settings} className={cx("categories-slider")}>
                {Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <div className={cx("category")} key={index}>
                            <div className={cx("catergory-left")}>
                                <div className={cx("trending")}>Trending</div>
                                <h2 className={cx("title")}>Tappy by TapTools</h2>
                                <div className={cx("description")}>
                                    Tappy is a collection of 5,555 unique penguins living on the Cardano blockchain, each acting as an access pass to
                                    TapTools Pro, with access valid until September 1, 2024.
                                </div>
                                <button className={cx("button-view-details")}>View details</button>
                            </div>
                            <div className={cx("catergory-right")}>
                                <ul className={cx("voucher-images")}>
                                    <li className={cx("wrapper-image", "wrapper-image-1")}>
                                        <Image className={cx("image")} src={images.penguin3} alt="" />
                                    </li>
                                    <li className={cx("wrapper-image", "wrapper-image-2")}>
                                        <Image className={cx("image")} src={images.penguin2} alt="" />
                                    </li>
                                    <li className={cx("wrapper-image", "wrapper-image-3")}>
                                        <Image className={cx("image")} src={images.penguin1} alt="" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
            </Slider>
        </div>
    );
};

export default VoucherCategories;
