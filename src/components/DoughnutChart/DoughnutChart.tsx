/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Chart as ChartJS } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import classNames from "classnames/bind";
import styles from "./DoughnutChart.module.scss";
import Title from "../Title";

ChartJS.register(ChartDataLabels);
const cx = classNames.bind(styles);

type Props = {
    data: number[];
};

function DoughnutChart({ data }: Props) {
    const [chartData, setChartData] = useState({
        datasets: [
            {
                data: data,
                backgroundColor: ["#F85D77", "#F8C04E", "#AC56F7", "#61F89F", "#5AD6F8"],
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
    });

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
                    <div className={cx("content-wrapper")}>
                        <div>
                            <div className={cx("content-header")}>
                                <h2 className={cx("title")}>Token Sale</h2>
                                <p className={cx("description")}>Breakdown of our Token Recipients.</p>
                            </div>
                            <div className="content-body">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                eaque ipsa quae ab illo inventore veritatis et tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                            </div>
                        </div>
                        <ul></ul>
                    </div>
                    <div className={cx("chart-wrapper")}>
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
    );
}

export default DoughnutChart;
