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
            <div className={cx("wrapper-inner")}>
                <div id={"gsap-timeline_linethrough"} className={cx("line")} />
                <Slider {...settings}>
                    {timelines.map(function ({ title, description, datetime }: TimeLineType, index: number) {
                        return (
                            <section className={cx("timelime-wrapper")} key={index}>
                                <div
                                    className={cx("timeline-item", {
                                        "timeline-item-col-reverse": index % 2 === 0,
                                        "timeline-item-col": index % 2 !== 0,
                                    })}
                                >
                                    <div
                                        className={cx("timeline-item-inner", {
                                            "timeline-item-inner-end": index % 2 !== 1,
                                            "timeline-item-inner-start": index % 2 === 1,
                                        })}
                                    >
                                        <div className={cx("timeline-item-dot") + " gsap-dot"} />
                                        <div
                                            className={
                                                cx("vertical-line", {
                                                    "vertical-line-up": index % 2 !== 0,
                                                    "vertical-line-down": index % 2 === 0,
                                                }) + " gsap-vertical-line"
                                            }
                                        />
                                        <div
                                            className={cx("gsap-timeline-content", {
                                                "gsap-timeline-content-odd": index % 2 !== 0,
                                                "gsap-timeline-content-even": index % 2 === 0,
                                            })}
                                        >
                                            <h3 className={cx("timeline-title")}>{title}</h3>
                                            <p className={cx("timeline-description")}>{description}</p>
                                        </div>
                                    </div>
                                    <div
                                        className={cx("timeline-item-datetime", {
                                            "datetime-end": index % 2 !== 1,
                                            "datetime-start": index % 2 === 1,
                                        })}
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
