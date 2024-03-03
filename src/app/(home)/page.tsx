import React from "react";
import classNames from "classnames/bind";
import PublicLayout from "@/layouts/PublicLayout";
import Title from "@/components/Title";
import Team from "@/components/Team";
import Timeline from "@/components/Timeline";
import { ServiceType, TeamType } from "@/types/GenericsType";
import Banner from "@/components/Banner";
import Service from "@/components/Service";
import services from "@/data/services";
import DoughnutChart from "@/components/DoughnutChart";
import About from "@/components/About";
import styles from "./Home.module.scss";
import Contact from "@/components/Contact";
import Faqs from "@/components/Faqs";
import tokenomics from "@/data/tokenomics";
import roadmaps from "@/data/roadmap";
import teams from "@/data/teams";
import images from "@/assets/images";
import Sponsors from "@/components/Sponsors";
import sponsors from "@/data/sponsors";
import VoucherCategories from "@/components/VoucherCategories";
import Image from "next/image";

type Props = {};

const cx = classNames.bind(styles);

const HomePage = function ({}: Props) {
    return (
        <PublicLayout>
            <section className={cx("voucher-categories")}>
                <VoucherCategories />
            </section>
            <section id="about" className={cx("about-wrapper")}>
                <About />
            </section>
            <section id="services" className={cx("service-wrapper")}>
                <div className={cx("title-wrapper")}>
                    <Title title="Services" subTitle="We Translate Your Dream Into Reality" />
                </div>
                <div className={cx("service-container")}>
                    {services.map(function (service: ServiceType, index: number) {
                        return <Service service={service} key={index} index={index} />;
                    })}
                </div>
            </section>
            <section id="token-sale" className={cx("token-sale-wrapper")}>
                <DoughnutChart data={tokenomics} />
            </section>
            <section id="roadmap" className={cx("roadmap-wrapper")}>
                <div className={cx("title-wrapper")}>
                    <Title title="Roadmap" subTitle="Emergence and design of the idea" />
                </div>
                <Timeline timelines={roadmaps} />
            </section>
            <section id="team" className={cx("team-wrapper")}>
                <Title title="Executive Team" subTitle="Emergence and design of the idea" />
                <div className={cx("team-container")}>
                    {teams.map(function (team: TeamType, index: number) {
                        return <Team key={team.id} index={index} team={team} />;
                    })}
                </div>
            </section>
            <section id="faqs" className={cx("faqs-wrapper")}>
                <Faqs />
            </section>
            <section id="contact" className={cx("contact-wrapper")}>
                <div className={cx("title-wrapper")}>
                    <Title title="Get In Touch" subTitle="Emergence and design of the idea" />
                </div>
                <div className={cx("contact-container")}>
                    <Contact />
                </div>
            </section>
            <section className={cx("sponsors")}>
                <Sponsors sponsors={sponsors} />
            </section>
        </PublicLayout>
    );
};

export default HomePage;
