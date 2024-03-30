import React from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import styles from "./Footer.module.scss";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "@/components/Icons";

type Props = {};

const cx = classNames.bind(styles);

const Footer = function ({}: Props) {
    return (
        <footer className={cx("footer")}>
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <div className={cx("left")}>
                        <p className={cx("title")}>
                            © Cryptoz all Rights Reserved theme by{" "}
                            <Link className={cx("link")} href="https://TemplatesCoder.com/" target="_blank" title="TemplatesCoder">
                                TemplatesCoder
                            </Link>
                        </p>
                    </div>
                    <div className={cx("right")}>
                        <div className={cx("social-media")}>
                            <ul className={cx("social-media-list")}>
                                <li className={cx("social-medial-item")}>
                                    <Link className={cx("social-media-link")} href="#">
                                        <FacebookIcon className={cx("social-media-icon")} />
                                    </Link>
                                </li>
                                <li className={cx("social-medial-item")}>
                                    <Link className={cx("social-media-link")} href="#">
                                        <TwitterIcon className={cx("social-media-icon")} />
                                    </Link>
                                </li>
                                <li className={cx("social-medial-item")}>
                                    <Link className={cx("social-media-link")} href="#">
                                        <InstagramIcon className={cx("social-media-icon")} />
                                    </Link>
                                </li>
                                <li className={cx("social-medial-item")}>
                                    <Link className={cx("social-media-link")} href="#">
                                        <YoutubeIcon className={cx("social-media-icon")} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
