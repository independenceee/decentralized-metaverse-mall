import classNames from "classnames/bind";
import Image from "next/image";
import React from "react";
import styles from "./FounderCard.module.scss";
import images from "@/assets/images";
import Tippy from "@tippyjs/react/headless";
import Link from "next/link";
import { FacebookIcon, LinkedinIcon, RssIcon, TwitterIcon } from "@/components/Icons";
import { TeamType } from "@/types/GenericsType";
const cx = classNames.bind(styles);

type Props = {
    founder: TeamType;
    onDelete: (id: string) => void;
};

const FounderCard = function ({ founder, onDelete }: Props) {
    return (
        <div className={cx("card")}>
            <div className={cx("card-header")}>
                <Tippy
                    interactive
                    trigger="click"
                    offset={[0, 0]}
                    placement="bottom-end"
                    render={(attr) => (
                        <div {...attr} tabIndex={-1}>
                            <div className={cx("tippy-wrapper")}>
                                <div className={cx("tippy-content")}>
                                    <button className={cx("action-button")}>
                                        <span>Action 1</span>
                                    </button>

                                    <button className={cx("action-button")}>
                                        <span>Action 1</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                >
                    <button className={cx("actions-button")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={cx("ellipsis-icon")}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            />
                        </svg>
                    </button>
                </Tippy>
            </div>
            <div className={cx("card-body")}>
                <div className={cx("image-wrapper")}>
                    <Image
                        className={cx("image")}
                        src={founder.image ? `${process.env.PUBLIC_IMAGES_DOMAIN}/founder/${founder.image}` : images.user}
                        width={80}
                        height={80}
                        alt="Member Avatar"
                    />
                </div>
                <h3 className={cx("username")}>{founder.username}</h3>
                <p className={cx("description")}>{founder.description}</p>
                <div className={cx("social-media")}>
                    <ul className={cx("social-media-list")}>
                        {founder.facebookLink && (
                            <li className={cx("social-media-item")}>
                                <Link className={cx("social-media-link")} target="_blank" href={founder.facebookLink}>
                                    <FacebookIcon className={cx("social-media-icon")} />
                                </Link>
                            </li>
                        )}
                        {founder.twitterLink && (
                            <li className={cx("social-media-item")}>
                                <Link className={cx("social-media-link")} target="_blank" href={founder.twitterLink}>
                                    <TwitterIcon className={cx("social-media-icon")} />
                                </Link>
                            </li>
                        )}
                        {founder.linkedinLink && (
                            <li className={cx("social-media-item")}>
                                <Link className={cx("social-media-link")} href={founder.linkedinLink}>
                                    <LinkedinIcon className={cx("social-media-icon")} />
                                </Link>
                            </li>
                        )}
                        {founder.rrsLink && (
                            <li className={cx("social-media-item")}>
                                <Link className={cx("social-media-link")} href={founder.rrsLink}>
                                    <RssIcon className={cx("social-media-icon")} />
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className={cx("buttons-wrapper")}>
                    {/* Note: env */}
                    <Link
                        href={`${process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/admin"}/admin/founder?id=${founder.id}`}
                        className={cx("button", "edit-button")}
                    >
                        <span>Edit</span>
                    </Link>
                    <button className={cx("button", "delete-button")} onClick={() => onDelete(founder.id as string)}>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FounderCard;
