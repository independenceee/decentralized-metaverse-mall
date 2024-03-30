"use client";
import classNames from "classnames/bind";
import styles from "./Faqs.module.scss";
import Title from "../Title";
import { useState } from "react";
import { tabs, accordions } from "@/data/faqs";

const cx = classNames.bind(styles);
type Accordion = {
    id: number;
    question: string;
    answer: string;
};

type Props = {};

function Faqs({}: Props) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].identity);
    const [accordionActive, setAccordionActive] = useState<{ id: number; toggle: boolean }>({ id: 1, toggle: true });
    const accordion: Accordion[] = accordions[activeTab as keyof typeof accordions];

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setAccordionActive({ id: 1, toggle: true });
    };

    const handleActiveAccordionItem = (id: number) => {
        setAccordionActive({ id: id, toggle: id !== accordionActive.id ? true : false });
    };

    return (
        <div className={cx("fags")}>
            <Title title="FAQS" subTitle="Frequently asked questions" />
            <div className={cx("wrapper")}>
                <div className={cx("wrapper-inner")}>
                    <ul className={cx("tab-list")}>
                        {tabs.map((tab) => (
                            <li className={cx("tab-item-wrapper")} key={tab.id} onClick={() => handleTabChange(tab.identity)}>
                                <button
                                    className={cx("tab-item", {
                                        "tab-item-active": activeTab === tab.identity,
                                    })}
                                >
                                    {tab.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ul className={cx("accordion-list")}>
                        {accordion.map((acd) => {
                            return (
                                <li
                                    className={cx("accordion-item", {
                                        "accordion-item-active": accordionActive.toggle && accordionActive.id === acd.id,
                                    })}
                                    key={acd.id}
                                >
                                    <div className={cx("question")} onClick={() => handleActiveAccordionItem(acd.id)}>
                                        {acd.question}
                                    </div>
                                    <div className={cx("answer")}>{acd.answer}</div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Faqs;
