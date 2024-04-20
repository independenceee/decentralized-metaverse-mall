/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Chart as ChartJS } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import classNames from "classnames/bind";
import styles from "./DoughnutChart.module.scss";
import { converToSocialNumber } from "@/helpers/utils";
import { TokenomicType } from "@/types/GenericsType";

ChartJS.register(ChartDataLabels);
const cx = classNames.bind(styles);

type Props = {
    data: TokenomicType[];
};

const colors: string[] = ["#F85D77", "#F8C04E", "#AC56F7", "#61F89F", "#5AD6F8", "#F85D77", "#F8C04E", "#AC56F7", "#61F89F", "#5AD6F8", "#AC56F7"];

function DoughnutChart({ data }: Props) {
    const extendedTokenomics = data.map((item, index) => ({ ...item, color: colors[index] }));
    const chartData = {
        datasets: [
            {
                data: data.map((item) => item.percentage),
                backgroundColor: colors,
                borderColor: "#3D1F94",
                borderWidth: 6,
                hoverOffset: 2,
                hoverBorderColor: "#6239D7",
                cutout: "45%",
                datalabels: {
                    color: "#3D1F94",
                    font: {
                        size: 20,
                        weight: 600,
                    },
                },
            },
        ],
    };
    const options = {
        plugins: {
            tooltip: {
                enabled: false, // Disable tooltips completely
            },
        },
    };

    return (
        <div className={cx("doughnut-chart")}>
            <div className={cx("wrapper")}>
                <div className={cx("wrapper-inner")}>
                    <div className={cx("content-wrapper")} data-aos="fade-right">
                        <div>
                            <div className={cx("content-header")}>
                                <h2 className={cx("title")}>Token Sales</h2>
                                <p className={cx("description")}>Breakdown of Our Token Recipients.</p>
                            </div>
                            <div className={cx("content-body")}>
                                The coin used in DMM is the C2E token. The total supply is 1,200,000,000 C2E tokens distributed as follows:
                            </div>
                        </div>
                        <ul className={cx("statistic-wrapper")}>
                            {extendedTokenomics.map((item, index) => (
                                <li key={index} className={cx("statistic-item")}>
                                    <span style={{ "--color": item.color } as Record<string, string>} className={cx("diff-color")} />
                                    <span className={cx("statistic-item-desc")}>
                                        {item.percentage}% - {converToSocialNumber(item.tokens)} {item.tokenName} tokens for&nbsp;
                                        {item.forDepartment}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={cx("chart-wrapper")}>
                        <div className={cx("chart-wrapper-inner")}>
                            <Doughnut data={chartData} options={options} />
                            <div className={cx("chart-logo-center")}>
                                <img
                                    src="https://themes.templatescoder.com/cryptoz/html/1-1/images/graph-logo.png"
                                    alt="cryptoz-image-wrapper"
                                    className={cx("chart-image")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoughnutChart;
