import React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import PublicLayout from "@/layouts/PublicLayout";
import Title from "@/components/Title";
import Team from "@/components/Team";
import images from "@/assets/images";
import Timeline from "@/components/Timeline";
import { TimeLineType } from "@/types/GenericsType";
import Banner from "@/components/Banner";

type Props = {};

const cx = classNames.bind(styles);

const timelines: TimeLineType[] = [
    {
        title: "Concept",
        description: "Calculate the number of tokens you’ll receive, you can follow the following formula.",
        datetime: "Apr 2019",
    },
    {
        title: "Concept",
        description:
            "Calculate the number of tokens you’ll receive, you can follow the following formula.Calculate the number of tokens you’ll receive, you can follow the following formula.Calculate the number of tokens you’ll receive, you can follow the following formula.",
        datetime: "Apr 2019",
    },
    {
        title: "Concept",
        description: "Calculate the number of tokens you’ll receive, you can follow the following formula.",
        datetime: "Apr 2019",
    },
    {
        title: "Concept",
        description: "Calculate the number of tokens you’ll receive, you can follow the following formula.",
        datetime: "Apr 2019",
    },
    {
        title: "Concept",
        description: "Calculate the number of tokens you’ll receive, you can follow the following formula.",
        datetime: "Apr 2019",
    },
    {
        title: "Concept",
        description: "Calculate the number of tokens you’ll receive, you can follow the following formula.",
        datetime: "Apr 2019",
    },
];

const HomePage = function ({}: Props) {
    return (
        <PublicLayout>
            <section id="#" className={cx("banner")}>
                <Banner />
            </section>
            <section id="about" className={cx("about")}></section>
            <section id="service" className={cx("service")}>
                <Title title="Services" subTitle="We Translate Your Dream Into Reality" />
            </section>
            <section id="roadmap" className={cx("roadmap")}>
                <Title title="Roadmap" subTitle="Emergence and design of the idea" />
                <Timeline timelines={timelines} />
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
