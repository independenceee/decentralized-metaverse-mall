"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import classNames from "classnames/bind";
import Title from "@/components/Title";
import styles from "./Timeline.module.scss";
import { TimeLineType } from "@/types/GenericsType";

type Props = {
    timelines: Array<TimeLineType>;
};

const cx = classNames.bind(styles);
gsap.registerPlugin(ScrollTrigger);

const Timeline = function ({ timelines }: Props) {
    const timelineRef = useRef<HTMLDivElement>(null!);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: false,
        dots: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: false } },
            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ scrollTrigger: { trigger: timelineRef.current, start: "top center", end: "bottom center" } })
                .fromTo("#gsap-timeline_linethrough", { width: 0 }, { width: "100%", duration: 2, ease: "power2.inOut" })
                .fromTo(".gsap-dot", { scale: 0 }, { scale: 1, duration: 1, ease: "power2.out" })
                .fromTo(".vertical-line-up", { scaleY: 0, transformOrigin: "bottom" }, { scaleY: 1, duration: 1, ease: "power2.out" })
                .fromTo(".vertical-line-down", { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 1, ease: "power2.out" }, "<")
                .fromTo(
                    [".gsap-timeline-content-odd", ".gsap-date-odd"],
                    { opacity: 0, y: -80 },
                    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                )
                .fromTo(
                    [".gsap-timeline-content-even", ".gsap-date-even"],
                    { opacity: 0, y: 80 },
                    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                    "<0.3",
                );
        }, timelineRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <Title title="Roadmap" subTitle="Emergence and design of the idea" />
            <div className={cx("wrapper-inner")}>
                <div id={"gsap-timeline_linethrough"} className={cx("line")} />
                <Slider {...settings}>
                    {timelines.map(function ({ title, description, datetime }: TimeLineType, index: number) {
                        return (
                            <section className="timelime-wrapper" key={index}>
                                <div
                                    className={cx("timeline-item", {
                                        "flex-col-reverse": index % 2 === 0,
                                        "flex-col": index % 2 !== 0,
                                    })}
                                >
                                    <div
                                        className={cx("h-[50%] flex justify-center", "timeline-item-inner", {
                                            "items-end": index % 2 !== 1,
                                            "items-start": index % 2 === 1,
                                        })}
                                    >
                                        <div
                                            className={cx(
                                                "gsap-dot absolute w-5 h-5 rounded-full top-1/2 -translate-y-1/2 bg-[#6C44DB] border-[3px] border-white left-1/2 -translate-x-1/2",
                                                "timeline-item-dot",
                                            )}
                                        />
                                        <div
                                            className={cx(
                                                "gsap-vertical-line absolute w-1 h-[60px] bg-[#6C44DB] top-1/2  left-1/2 -z-10",
                                                "vertical-line",
                                                {
                                                    "vertical-line-up": index % 2 !== 0,
                                                    "vertical-line-down": index % 2 === 0,
                                                },
                                            )}
                                        />
                                        <div
                                            className={cx("text-center px-5", "gsap-timeline-content", {
                                                "gsap-timeline-content-odd": index % 2 !== 0,
                                                "gsap-timeline-content-even": index % 2 === 0,
                                            })}
                                        >
                                            <h3 className={cx("timeline-title")}>{title}</h3>
                                            <p className={cx("timeline-description")}>{description}</p>
                                        </div>
                                    </div>
                                    <div
                                        className={cx(
                                            "flex w-full justify-center h-[50%] text-[#01E8FE] text-lg font-medium",
                                            "timeline-item-datetime",
                                            {
                                                "items-end gsap-date-odd": index % 2 !== 1,
                                                "items-start gsap-date-even": index % 2 === 1,
                                            },
                                        )}
                                    >
                                        {datetime}
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
};

export default Timeline;
