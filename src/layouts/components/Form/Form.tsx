"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import icons from "@/assets/icons";
import { DownIcon } from "@/components/Icons";

const cx = classNames.bind(styles);

type Props = {};
const Form = function ({}: Props) {
    const [accept, setAccept] = useState<boolean>(false);

    const handleAccept = function (event: ChangeEvent<HTMLInputElement>) {
        setAccept(event.target.checked);
    };
    return (
        <Modal isShowing={false} toggle={null!}>
            <div className={cx("form-wrapper")}>
                <section onClick={null!} className={cx("form-close")}>
                    <Image className={cx("form-close-icon")} src={icons.closeIcon} alt="" />
                </section>
                <section className={cx("form-title")}>
                    <h1>Choose the Voucher</h1>
                </section>

                <section className={cx("select-wrapper")}>
                    <div className={cx("select-label")}>Category *</div>
                    <div className={cx("select-container")}>
                        <div className={cx("select-button")}>
                            <span className={cx("select-button-text")}>Select your category</span>
                            <DownIcon className={cx("select-button-icon")} />
                            <ul className={cx("options")}>
                                <li className={cx("option")}>
                                    <span className={cx("option-text")}>Category</span>
                                </li>
                                <li className={cx("option")}>
                                    <span className={cx("option-text")}>Category</span>
                                </li>
                                <li className={cx("option")}>
                                    <span className={cx("option-text")}>Category</span>
                                </li>
                                <li className={cx("option")}>
                                    <span className={cx("option-text")}>Category</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className={cx("form-accept")}>
                    <div className={cx("form-input")}>
                        <input onChange={handleAccept} type="checkbox" placeholder="" className={cx("form-checkbox")} />
                    </div>
                    <label className={cx("form-input")} htmlFor="">
                        By checking this box and connecting my wallet, I confirm that I have read, understood, and agreed to the
                        <span className={cx("form-input-link")}>Terms and Conditions</span>.
                    </label>
                </section>
                <section className={cx("form-submit")}>
                    <Button disabled={!accept} className={cx("form-button-button")}>
                        Stake ADA
                    </Button>
                </section>
            </div>
        </Modal>
    );
};

export default Form;
