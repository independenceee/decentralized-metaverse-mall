import classNames from "classnames/bind";
import React from "react";
import Link from "next/link";
import styles from "./Sponsors.module.scss";
import Image from "next/image";
import { Sponsor } from "@/data/sponsors";
import Title from "../Title";

const cx = classNames.bind(styles);

type Props = {
    sponsors: Sponsor[];
};

const Sponsors = function ({ sponsors }: Props) {
    return (
        <article className={cx("wrapper")}>
            <div className={cx("wrapper-content")}>
                <div className={cx("header")}>
                    <Title
                        title="Over 150,000 companies, both big and small, are growing their business with Salesforce."
                        subTitle="Empowering Our Vision Together"
                    />
                </div>
                <div className={cx("wrapper-sponsors")}>
                    <ul className={cx("sponsors")}>
                        {sponsors.map((sponsor) => (
                            <li key={sponsor.id} className={cx("sponsor")}>
                                <Link href={sponsor.link} target="_blank">
                                    <Image src={sponsor.logo} alt={sponsor.name} className={cx("sponsor-logo")} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </article>
    );
};

export default Sponsors;
