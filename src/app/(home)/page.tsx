import React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import PublicLayout from "@/layouts/PublicLayout";
import Button from "@/components/Button";
import Title from "@/components/Title";
import Team from "@/components/Team";
import images from "@/assets/images";

type Props = {};

const cx = classNames.bind(styles);

const HomePage = function ({}: Props) {
    return (
        <PublicLayout>
            <section id="about" className={cx("about")}></section>
            <section id="service" className={cx("service")}>
                <Title title="Services" subTitle="We Translate Your Dream Into Reality" />
            </section>
            <section id="roadmap" className={cx("roadmap")}>
                <Title title="Roadmap" subTitle="Emergence and design of the idea" />
            </section>
            <section id="team" className={cx("team-wrapper")}>
                <Title title="Executive Team" subTitle="Emergence and design of the idea" />
                <div className={cx("team-container")}>
                    <Team
                        description="CEO & Lead Blockchain"
                        firstName="Nguyen"
                        lastName="Khanh"
                        image={images.logo}
                        linkedinLink="#"
                        facebookLink="#"
                        rrsLink="#"
                        twitterLink="#"
                    />
                    <Team
                        description="CEO & Lead Blockchain"
                        firstName="Nguyen"
                        lastName="Khanh"
                        image={images.logo}
                        linkedinLink="#"
                        facebookLink="#"
                        rrsLink="#"
                        twitterLink="#"
                    />
                    <Team
                        description="CEO & Lead Blockchain"
                        firstName="Nguyen"
                        lastName="Khanh"
                        image={images.logo}
                        linkedinLink="#"
                        facebookLink="#"
                        rrsLink="#"
                        twitterLink="#"
                    />
                    <Team
                        description="CEO & Lead Blockchain"
                        firstName="Nguyen"
                        lastName="Khanh"
                        image={images.logo}
                        linkedinLink="#"
                        facebookLink="#"
                        rrsLink="#"
                        twitterLink="#"
                    />
                </div>
            </section>
            <section id="contact" className={cx("contact")}></section>
        </PublicLayout>
    );
};

export default HomePage;
