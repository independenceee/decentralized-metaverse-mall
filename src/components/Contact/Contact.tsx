import React from "react";
import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import Image from "next/image";
import image from "@/assets/icons";
import icons from "@/assets/icons";
import Button from "@/components/Button";

const cx = classNames.bind(styles);
type Props = {};

const Contact = function ({}: Props) {
    return (
        <div className={cx("contact")}>
            <div className={cx("contact-box")}>
                <ul className={cx("contact-box-list")}>
                    <li className={cx("contact-box-item")}>
                        <div className={cx("contact-thumb")}>
                            <Image className={cx("icon")} src={icons.walletIcon} alt="Phone Icon" />
                        </div>
                        <div className={cx("contact-box-detail")}>
                            <h3 className={cx("contact-title")}>Call Us On</h3>
                            <p className={cx("contract-description")}>+91 123 456 789 0</p>
                        </div>
                    </li>
                    <li className={cx("contact-box-item")}>
                        <div className={cx("contact-thumb")}>
                            <Image className={cx("icon")} src={icons.walletIcon} alt="Phone Icon" />
                        </div>
                        <div className={cx("contact-box-detail")}>
                            <h3 className={cx("contact-title")}>Call Us On</h3>
                            <p className={cx("contract-description")}>+91 123 456 789 0</p>
                        </div>
                    </li>
                    <li className={cx("contact-box-item")}>
                        <div className={cx("contact-thumb")}>
                            <Image className={cx("icon")} src={icons.walletIcon} alt="Phone Icon" />
                        </div>
                        <div className={cx("contact-box-detail")}>
                            <h3 className={cx("contact-title")}>Call Us On</h3>
                            <p className={cx("contract-description")}>+91 123 456 789 0</p>
                        </div>
                    </li>
                </ul>
            </div>
            <form className={cx("form")}>
                <div className={cx("form-short-group")}>
                    <div className={cx("form-short-item")}>
                        <input type="text" placeholder="Name" className={cx("form-control")} required />
                    </div>
                    <div className={cx("form-short-item")}>
                        <input type="email" placeholder="Email" className={cx("form-control")} required />
                    </div>
                </div>
                <div className={cx("form-group")}>
                    <input type="text" name="subject" className={cx("form-control")} placeholder="Subject" required />
                </div>
                <div className={cx("form-group")}>
                    <textarea name="message" className={cx("form-control")} rows={3} />
                </div>

                <Button className="button">Send Message</Button>
            </form>
        </div>
    );
};

export default Contact;
