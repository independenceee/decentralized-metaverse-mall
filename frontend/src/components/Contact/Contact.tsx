"use client";

import React, { ChangeEvent, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import Image from "next/image";
import icons from "@/assets/icons";
import Button from "@/components/Button";
import { post } from "@/utils/httpRequest";
import { toast } from "sonner";

const cx = classNames.bind(styles);

const Contact = function () {
    const [contact, setContact] = useState<{
        name: string;
        subject: string;
        email: string;
        message: string;
    }>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        event.preventDefault();
        setContact(function (previous) {
            return { ...previous, [event.target.name]: event.target.value };
        });
    };

    const handleSubmit = async function () {
        await post("/mail/send", {
            from: "nguyenkhanh17112003@gmail.com",
            to: contact.email,
            subject: contact.subject,
            html: contact.name,
            text: contact.message,
        });
        toast("Send email successfully.");
    };

    return (
        <div className={cx("contact")}>
            <div className={cx("contact-box")}>
                <ul className={cx("contact-box-list")}>
                    <li className={cx("contact-box-item")}>
                        <div className={cx("contact-thumb")}>
                            <Image className={cx("icon")} src={icons.phoneIcon} alt="Phone Icon" />
                        </div>
                        <div className={cx("contact-box-detail")}>
                            <h3 className={cx("contact-title")}>Call Us On</h3>
                            <p className={cx("contract-description")}>+91 123 456 789 0</p>
                        </div>
                    </li>
                    <li className={cx("contact-box-item")}>
                        <div className={cx("contact-thumb")}>
                            <Image className={cx("icon")} src={icons.mailIcon} alt="Phone Icon" />
                        </div>
                        <div className={cx("contact-box-detail")}>
                            <h3 className={cx("contact-title")}>Call Us On</h3>
                            <p className={cx("contract-description")}>+91 123 456 789 0</p>
                        </div>
                    </li>
                    <li className={cx("contact-box-item")}>
                        <div className={cx("contact-thumb")}>
                            <Image className={cx("icon")} src={icons.addressIcon} alt="Phone Icon" />
                        </div>
                        <div className={cx("contact-box-detail")}>
                            <h3 className={cx("contact-title")}>Call Us On</h3>
                            <p className={cx("contract-description")}>+91 123 456 789 0</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={cx("form")}>
                <div className={cx("form-group")}>
                    <div className={cx("form-short-item")}>
                        <input onChange={handleChange} name="name" type="text" placeholder="Name" className={cx("form-control")} required />
                    </div>
                    <div className={cx("form-short-item")}>
                        <input onChange={handleChange} name="email" type="email" placeholder="Email" className={cx("form-control")} required />
                    </div>
                </div>
                <div className={cx("form-group")}>
                    <input onChange={handleChange} name="subject" type="text" className={cx("form-control")} placeholder="Subject" required />
                </div>
                <div className={cx("form-group")}>
                    <textarea onChange={handleChange} name="message" placeholder="Message" required className={cx("textarea")} rows={6} />
                </div>

                <Button onClick={handleSubmit} className={cx("button-send-message")}>
                    Send Message
                </Button>
            </div>
        </div>
    );
};

export default Contact;
