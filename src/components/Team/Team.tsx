import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, LinkedinIcon, RssIcon, TwitterIcon } from "@/components/Icons";
import styles from "./Team.module.scss";
import { TeamType } from "@/types/GenericsType";

type Props = TeamType;

const cx = classNames.bind(styles);

const Founder = function ({ username, description, facebookLink, twitterLink, linkedinLink, rrsLink, image }: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("image-container")}>
                    <Image className={cx("image")} src={image} alt="Member Avatar" />
                </div>
                <div className={cx("infomation")}>
                    <h3 className={cx("name")}>{username}</h3>
                    <span className={cx("description")}>{description}</span>
                    <div className={cx("social-media")}>
                        <ul className={cx("social-media-list")}>
                            {facebookLink && (
                                <li className={cx("social-media-item")}>
                                    <Link className={cx("social-media-link")} target="_blank" href={facebookLink}>
                                        <FacebookIcon className={cx("social-media-icon")} />
                                    </Link>
                                </li>
                            )}
                            {twitterLink && (
                                <li className={cx("social-media-item")}>
                                    <Link className={cx("social-media-link")} target="_blank" href={twitterLink}>
                                        <TwitterIcon className={cx("social-media-icon")} />
                                    </Link>
                                </li>
                            )}
                            {linkedinLink && (
                                <li className={cx("social-media-item")}>
                                    <Link className={cx("social-media-link")} href="#">
                                        <LinkedinIcon className={cx("social-media-icon")} />
                                    </Link>
                                </li>
                            )}
                            {rrsLink && (
                                <li className={cx("social-media-item")}>
                                    <Link className={cx("social-media-link")} href="#">
                                        <RssIcon className={cx("social-media-icon")} />
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Founder;
