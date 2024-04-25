"use client";

import React, { ChangeEvent, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import Image from "next/image";
import icons from "@/assets/icons";
import Button from "@/components/Button";
import { post } from "@/utils/httpRequest";
import { toast } from "sonner";
import { useSendEmailMutation } from "@/redux/services/email.api";

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
    const [sendEmail, sendEmailResult] = useSendEmailMutation();

    const handleChange = function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        event.preventDefault();
        setContact(function (previous) {
            return { ...previous, [event.target.name]: event.target.value };
        });
    };

    const handleSubmit = async function () {
        try {
            sendEmail({
                to: "nguyenkhanh17112003@gmail.com",
                from: contact.email,
                subject: "JOIN THE WAITLIST",
                text: "",
            });
            toast("Send email successfully.");
        } catch {
            toast("Failed to send email.");
        }
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
                            <h3 className={cx("contact-title")}>Get In Touch​</h3>
                            <p className={cx("contract-description")}>support@dmm.io.vn</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={cx("form")}>
                {/* <div className={cx("form-group")}>
                    <div className={cx("form-short-item")}>
                        <input onChange={handleChange} name="name" type="text" placeholder="Name" className={cx("form-control")} required />
                    </div>
                    <div className={cx("form-short-item")}>
                        <input onChange={handleChange} name="email" type="email" placeholder="Email" className={cx("form-control")} required />
                    </div>
                </div> */}

                <div className={cx("form-group")}>
                    <input onChange={handleChange} name="name" type="text" placeholder="Name" className={cx("form-control")} required />
                </div>
                <div className={cx("form-group")}>
                    <input onChange={handleChange} name="email" type="email" placeholder="Email" className={cx("form-control")} required />
                </div>

                {/* <div className={cx("form-group")}>
                    <input onChange={handleChange} name="subject" type="text" className={cx("form-control")} placeholder="Subject" required />
                </div> */}
                {/* <div className={cx("form-group")}>
                    <textarea onChange={handleChange} name="message" placeholder="Message" required className={cx("textarea")} rows={6} />
                </div> */}

                <Button onClick={handleSubmit} className={cx("button-send-message")}>
                    Send Message
                </Button>
            </div>
        </div>
    );
};

export default Contact;
