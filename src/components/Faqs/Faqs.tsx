"use client";
import classNames from "classnames/bind";
import styles from "./Faqs.module.scss";
import Title from "../Title";
import { useState } from "react";

const cx = classNames.bind(styles);

const tabs: { id: number; name: string; identity: string }[] = [
    {
        id: 1,
        name: "General Questions",
        identity: "general",
    },
    {
        id: 2,
        name: "ICO Questions",
        identity: "ico",
    },
    {
        id: 3,
        name: "Token sale",
        identity: "token_sale",
    },
    {
        id: 4,
        name: "Investers",
        identity: "investers",
    },
];

type Accordion = {
    id: number;
    question: string;
    answer: string;
};

type Accordions = {
    general: Accordion[];
    ico: Accordion[];
    token_sale: Accordion[];
    investers: Accordion[];
};

const accordions: Accordions = {
    general: [
        {
            id: 1,
            question: "1. What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 2,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 3,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 4,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
    ],
    ico: [
        {
            id: 1,
            question: "2. What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 2,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 3,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 4,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
    ],
    token_sale: [
        {
            id: 1,
            question: "3. What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 2,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 3,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 4,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
    ],
    investers: [
        {
            id: 1,
            question: "4. What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 2,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 3,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
        {
            id: 4,
            question: "What cryptocurrencies can I use to purchase?",
            answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste perspiciatis eaque ipsa quae",
        },
    ],
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
