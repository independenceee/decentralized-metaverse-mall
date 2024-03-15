import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, LinkedinIcon, RssIcon, TwitterIcon } from "@/components/Icons";
import { TeamType } from "@/types/GenericsType";
import images from "@/assets/images";
import styles from "./Team.module.scss";

type Props = {
    team: TeamType;
    index: number;
};

const cx = classNames.bind(styles);

const Founder = function ({ team, index }: Props) {
    return (
        <div className={cx("wrapper")} data-aos="fade-up" data-aos-delay={`${10 * (index + 10)}`} data-aos-duration={`${1000 * (index + 10)}`}>
            <div className={cx("inner")}>
                <div className={cx("image-container")}>
                    <Image
                        className={cx("image")}
                        src={team.image ? `${process.env.PUBLIC_IMAGES_DOMAIN}/founder/${team.image}` : images.user}
                        width={80}
                        height={80}
                        alt="Member Avatar"
                    />
                </div>
                <div className={cx("infomation")}>
                    <h3 className={cx("name")}>{team.username}</h3>
                    <span className={cx("description")}>{team.description}</span>
                    <div className={cx("social-media")}>
                        <ul className={cx("social-media-list")}>
                            {team.facebookLink && (
                                <li className={cx("social-media-item")}>
                                    <Link className={cx("social-media-link")} target="_blank" href={team.facebookLink}>
                                        <FacebookIcon className={cx("social-media-icon")} />
                                    </Link>
                                </li>
                            )}
                            {team.twitterLink && (
                                <li className={cx("social-media-item")}>
                                    <Link className={cx("social-media-link")} target="_blank" href={team.twitterLink}>
                                        <TwitterIcon className={cx("social-media-icon")} />
                                    </Link>
                                </li>
                            )}
                            {team.linkedinLink && (
                                <li className={cx("social-media-item")}>
                                    <Link className={cx("social-media-link")} href={team.linkedinLink}>
                                        <LinkedinIcon className={cx("social-media-icon")} />
                                    </Link>
                                </li>
                            )}
                            {team.rrsLink && (
                                <li className={cx("social-media-item")}>
                                    <Link className={cx("social-media-link")} href={team.rrsLink}>
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
