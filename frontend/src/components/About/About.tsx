import React from "react";
import classNames from "classnames/bind";
import styles from "./About.module.scss";
import Image from "next/image";
import images from "@/assets/images";
import icons from "@/assets/icons";

const cx = classNames.bind(styles);

const About = function () {
    return (
        <section className={cx("about")}>
            <div className={cx("wrapper")}>
                <div className={cx("wrapper-inner")}>
                    <div className={cx("image-wrapper")} data-aos="fade-right">
                        <Image src={images.about} className={cx("about-background")} alt="" />
                    </div>
                    <div className={cx("content-wrapper")} data-aos="fade-left">
                        <div className={cx("content-header")}>
                            <h2 className={cx("title")}>About DMM</h2>
                            <p className={cx("description")}>A Web3 Platform for Discounted Outlet Stores</p>
                        </div>
                        <div className={cx("content-body")}>
                            <div className={cx("content-body-description")}>
                                This is a Cardano-based platform for cryptocurrency and non-cryptocurrency users to purchase tangible items and
                                services at affordable prices.
                            </div>
                            <div className={cx("content-body-description")}>
                                Currently, we are partnering with online outlet stores and Cardano stake pool:
                            </div>
                            <ul className={cx("content-list")}>
                                <li className={cx("content-list-item")}>
                                    <div className={cx("list-icon-wrapper")}>
                                        <Image src={icons.checkIcon} width={39} height={39} alt="list-icon" />
                                    </div>
                                    The KOET, an online consumer electronics outlet store (dienmaykorea.com), allows you to purchase Samsung products
                                    such as TVs, home theaters, smartphones, and appliances at affordable prices and earn C2E tokens as rewards.
                                </li>
                                <li className={cx("content-list-item")}>
                                    <div className={cx("list-icon-wrapper")}>
                                        <Image src={icons.checkIcon} width={39} height={39} alt="list-icon" />
                                    </div>
                                    The Visa Re: A fast, convenient, secure, and affordable visa service (http://www.visare.com.vn ). You can apply
                                    for visas to any country (Schengen Area, USA, Korea, China, Taiwan, Japan, Australia, Canada...) from Vietnam
                                    through Visa Re at low prices and earn C2E tokens as rewards.
                                </li>
                                <li className={cx("content-list-item")}>
                                    <div className={cx("list-icon-wrapper")}>
                                        <Image src={icons.checkIcon} width={39} height={39} alt="list-icon" />
                                    </div>
                                    VILAI, a Cardano stake pool operator, offers discounted vouchers with a value ranging from 100,000 VND to
                                    1,000,000 VND (approximately 5 to 50 USD). To obtain these vouchers, simply create a new Cardano wallet and stake
                                    ADA to VILAI. These vouchers can be redeemed within DMM ecosystem, including KOET and Visa Re.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
