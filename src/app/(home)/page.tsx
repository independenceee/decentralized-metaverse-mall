"use client";
import React, { useEffect, useRef } from "react";
import { Element, scroller } from "react-scroll";
import classNames from "classnames/bind";
import PublicLayout from "@/layouts/PublicLayout";
import Title from "@/components/Title";
import Team from "@/components/Team";
import Timeline from "@/components/Roadmap";
import { ServiceType, TeamType } from "@/types/GenericsType";
import Service from "@/components/Service";
import services from "@/data/services";
import DoughnutChart from "@/components/DoughnutChart";
import About from "@/components/About";
import styles from "./Home.module.scss";
import Contact from "@/components/Contact";
import Faqs from "@/components/Faqs";
import tokenomics from "@/data/tokenomics";
// import roadmaps from "@/data/roadmap";
import Sponsors from "@/components/Sponsors";
import sponsors from "@/data/sponsors";
import VoucherCategories from "@/components/VoucherCategories";
import { useGetFounderListQuery } from "@/redux/api/founders.api";
import { useGetRoadmapListQuery } from "@/redux/api/roadmap.api";
import { toast } from "sonner";

const cx = classNames.bind(styles);

const HomePage = function () {
    const { data: teams, isFetching } = useGetFounderListQuery();
    const { data: roadmaps } = useGetRoadmapListQuery();
    const faqsRef = useRef<HTMLElement>(null);
    useEffect(() => {
        (() => {
            if (!window.cardano) {
                setTimeout(() => {
                    toast.warning("You haven't installed any wallets yet. Please check our tutorials");
                    faqsRef.current &&
                        faqsRef.current.scrollIntoView({
                            block: "nearest",
                            behavior: "smooth",
                        });
                }, 1500);
            }
        })();
    }, []);

    return (
        <PublicLayout>
            <Element name="home" className={cx("voucher-categories")}>
                <VoucherCategories />
            </Element>
            <Element name="about" className={cx("about-wrapper")}>
                <About />
            </Element>
            <Element name="services" className={cx("service-wrapper")}>
                <div className={cx("title-wrapper")}>
                    <Title title="Services" subTitle="We Translate Your Dream Into Reality" />
                </div>
                <div className={cx("service-container")}>
                    {services.map(function (service: ServiceType, index: number) {
                        return <Service service={service} key={index} index={index} />;
                    })}
                </div>
            </Element>
            <Element name="token-sale" className={cx("token-sale-wrapper")}>
                <DoughnutChart data={tokenomics} />
            </Element>
            <Element name="roadmap" className={cx("roadmap-wrapper")}>
                <div className={cx("title-wrapper")}>
                    <Title title="Roadmap" subTitle="Emergence and design of the idea" />
                </div>
                {roadmaps && <Timeline roadmaps={roadmaps} />}
            </Element>
            <Element name="team" className={cx("team-wrapper")}>
                <Title title="Executive Team" subTitle="Emergence and design of the idea" />
                <div className={cx("team-container")}>
                    {isFetching ? (
                        <span>Loading...</span>
                    ) : (
                        ((teams as TeamType[]) || []).map(function (team: TeamType, index: number) {
                            return <Team key={team.id} index={index} team={team} />;
                        })
                    )}
                </div>
            </Element>
            <section ref={faqsRef} id="faqs" className={cx("faqs-wrapper")}>
                <Faqs />
            </section>
            <Element name="contact" className={cx("contact-wrapper")}>
                <div className={cx("title-wrapper")}>
                    <Title title="Get In Touch" subTitle="Emergence and design of the idea" />
                </div>
                <div className={cx("contact-container")}>
                    <Contact />
                </div>
            </Element>
            <Element name="sponsors" className={cx("sponsors")}>
                <Sponsors sponsors={sponsors} />
            </Element>
        </PublicLayout>
    );
};

export default HomePage;
