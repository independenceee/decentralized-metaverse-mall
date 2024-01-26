import React from "react";
import classNames from "classnames/bind";
import PublicLayout from "@/layouts/PublicLayout";
import Title from "@/components/Title";
import Team from "@/components/Team";
import images from "@/assets/images";
import Timeline from "@/components/Timeline";
import { ServiceType, TimeLineType } from "@/types/GenericsType";
import Banner from "@/components/Banner";
import Service from "@/components/Service";
import services from "@/constants/services";
import DoughnutChart from "@/components/DoughnutChart";
import About from "@/components/About";
import styles from "./Home.module.scss";
import Contact from "@/components/Contact";
import Faqs from "@/components/Faqs";

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
    const data = [20.5, 20.3, 15, 25, 20];

    return (
        <PublicLayout>
            <section id="#" className={cx("banner-wrapper")}>
                <Banner />
            </section>
            <section id="about" className={cx("about-wrapper")}>
                <About />
            </section>
            <section id="services" className={cx("service-wrapper")}>
                <Title title="Services" subTitle="We Translate Your Dream Into Reality" />
                <div className={cx("service-container")}>
                    {services.map(function (service: ServiceType, index: number) {
                        return <Service service={service} key={index} index={index} />;
                    })}
                </div>
            </section>
            <section id="token-sale" className={cx("token-sale-wrapper")}>
                <DoughnutChart data={data} />
            </section>
            <section id="roadmap" className={cx("roadmap-wrapper")}>
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
            <section id="faqs" className={cx("faqs-wrapper")}>
                <Faqs />
            </section>
            <section id="contact" className={cx("contact-wrapper")}>
                <Title title="Get In Touch" subTitle="Emergence and design of the idea" />
                <div className={cx("contact-container")}>
                    <Contact />
                </div>
            </section>
        </PublicLayout>
    );
};

export default HomePage;
