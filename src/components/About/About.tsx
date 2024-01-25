import React from "react";
import classNames from "classnames/bind";
import styles from "./About.module.scss";
import Image from "next/image";
import images from "@/assets/images";

type Props = {};

const cx = classNames.bind(styles);

const About = function ({}: Props) {
    return (
        <section className={cx("about")}>
            <Image src={images.about} className={cx("about-background")} alt="" />
            <div className={cx("wrapper")}></div>
        </section>
    );
};

export default About;
