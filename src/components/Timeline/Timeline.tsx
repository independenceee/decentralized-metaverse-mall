"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import classNames from "classnames/bind";
import styles from "./Timeline.module.scss";
import { RoadmapType } from "@/types/GenericsType";

type Props = {
    timelines: Array<RoadmapType>;
};

gsap.registerPlugin(ScrollTrigger);
const cx = classNames.bind(styles);

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
                .fromTo("#gsap-timeline_linethrough", { width: 0 }, { width: "100%", duration: 1.5, ease: "power2.inOut" })
                .fromTo(".gsap-dot", { scale: 0 }, { scale: 1, duration: 0.7, ease: "power2.out" })
                .fromTo(".gsap-vertical-line-up", { scaleY: 0, transformOrigin: "bottom" }, { scaleY: 1, duration: 0.7, ease: "power2.out" })
                .fromTo(".gsap-vertical-line-down", { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 0.7, ease: "power2.out" }, "<")
                .fromTo(
                    [".gsap-timeline-content-odd", ".gsap-date-odd"],
                    { opacity: 0, y: -80 },
                    { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
                )
                .fromTo(
                    [".gsap-timeline-content-even", ".gsap-date-even"],
                    { opacity: 0, y: 80 },
                    { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
                    "<0.3",
                );
        }, timelineRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className={cx("wrapper")} ref={timelineRef}>
            <div className={cx("wrapper-inner")}>
                <div id="gsap-timeline_linethrough" className={cx("line")} />
                <Slider {...settings}>
                    {timelines.concat(timelines).map(function ({ title, description, datetime }: RoadmapType, index: number) {
                        const isEvent = index % 2 === 0;
                        return (
                            <section className={cx("timelime-wrapper")} key={index}>
                                <div
                                    className={cx("timeline-item", {
                                        "timeline-item-col-reverse": isEvent,
                                        "timeline-item-col": !isEvent,
                                    })}
                                >
                                    <div className={cx("timeline-item-dot") + " gsap-dot"} />
                                    <div
                                        className={cx("timeline-item-inner", {
                                            "timeline-item-inner-end": isEvent,
                                            "timeline-item-inner-start": !isEvent,
                                        })}
                                    >
                                        <div
                                            className={
                                                cx("vertical-line", {
                                                    "vertical-line-up": !isEvent,
                                                    "vertical-line-down": isEvent,
                                                }) + (isEvent ? " gsap-vertical-line-down" : " gsap-vertical-line-up")
                                            }
                                        />
                                        <div
                                            className={
                                                cx("timeline-content", {
                                                    "timeline-content-odd": !isEvent,
                                                    "timeline-content-even": isEvent,
                                                }) + (!isEvent ? " gsap-timeline-content-odd" : " gsap-timeline-content-even")
                                            }
                                        >
                                            <h3 className={cx("timeline-title")}>{title}</h3>
                                            <p className={cx("timeline-description")}>{description}</p>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            cx("timeline-item-datetime", {
                                                "datetime-end": isEvent,
                                                "datetime-start": !isEvent,
                                            }) + (isEvent ? " gsap-date-odd" : " gsap-date-even")
                                        }
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
