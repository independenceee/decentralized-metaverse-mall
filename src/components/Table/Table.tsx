"use client";
import * as React from "react";
import classNames from "classnames/bind";
import { Pagination, Stack } from "@mui/material";
import { styled } from "@mui/system";

import styles from "./Table.module.scss";
import Popper from "../Popper/Popper";
const cx = classNames.bind(styles);

const CustomPagination = styled(Pagination)({
    ".MuiPagination-ul": {
        justifyContent: "flex-end",
        backgroundColor: "#26334D",
        borderRadius: "999px",
    },
    "& .MuiPaginationItem-root": {
        fontSize: "14px",
        color: "white",
        borderRadius: "100%",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: "white",
        color: "#4a28a9",
        "&:hover": {
            opacity: 0.7,
        },
    },
    ".MuiPaginationItem-icon": {
        width: "18px",
        height: "18px",
    },
});

const makeStyle = (status: string) => {
    if (status === "FREE") {
        return {
            color: "#10B880",
        };
    } else if (status === "USED") {
        return {
            color: "#ff5724",
        };
    }
    return;
};

type Props = {
    data: any[] | null;
};

export default function CustomTable({ data }: Props) {
    const handleChangePage = function (event: React.ChangeEvent<unknown>, page: number) {};

    if (!data) return;
    const titles = Object.keys(data?.[0]) || [];

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header-control")}>
                <h2 className={cx("table-main-title")}>Latest Activities</h2>
                <div className={cx("header-control")}>
                    <form className={cx("search-control")} onClick={(e) => e.preventDefault()}>
                        <label className={cx("search-label")}>
                            <input className={cx("search-input")} placeholder="Search here..." type="text" />
                        </label>
                        <label htmlFor="search-input-checkbox">
                            <button className={cx("search-button")}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={cx("search-icon")}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </label>
                    </form>

                    <div className={cx("filter-control")}>
                        <Popper
                            content={
                                <ul className={cx("dropdown-menu")}>
                                    <li className={cx("menu-item")}>FREE</li>
                                    <li className={cx("menu-item")}>USED</li>
                                </ul>
                            }
                        >
                            <button className={cx("fiter-button")}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className={cx("filter-icon")}
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                                    />
                                </svg>
                            </button>
                        </Popper>
                    </div>
                </div>
            </div>

            <div className={cx("table-wrapper")}>
                <table className={cx("table")}>
                    <thead>
                        <tr>
                            {titles.map((title, index) => (
                                <th className={cx("table-header-title")} key={index}>
                                    {title}
                                </th>
                            ))}
                            <th className={cx("table-header-title")}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((rows, index: number) => (
                            <tr className={cx("table-row")} key={index}>
                                {Array(titles.length)
                                    .fill(0)
                                    .map((_, i) => (
                                        <td className={cx("table-column")} key={i} id={titles[i].toLowerCase().toString()}>
                                            {titles[i].toLowerCase() === "link" ? (
                                                <a
                                                    target="_blank"
                                                    style={titles[i].toLowerCase() === "status" ? makeStyle(rows[titles[i]]) : {}}
                                                    href={rows[titles[i]]}
                                                    className={cx("table-column-content")}
                                                >
                                                    {rows[titles[i]]}
                                                </a>
                                            ) : (
                                                <p
                                                    style={titles[i].toLowerCase() === "status" ? makeStyle(rows[titles[i]]) : {}}
                                                    className={cx("table-column-content")}
                                                >
                                                    {rows[titles[i]]}
                                                </p>
                                            )}
                                        </td>
                                    ))}

                                <td className={cx("table-column")}>
                                    <Popper
                                        content={
                                            <ul className={cx("dropdown-menu")}>
                                                <li className={cx("menu-item")}>Edit</li>
                                                <li className={cx("menu-item")}>Delete</li>
                                            </ul>
                                        }
                                    >
                                        <button className={cx("table-column-actions")}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={cx("icon-ellipsis")}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="2"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                />
                                            </svg>
                                        </button>
                                    </Popper>
                                </td>
                            </tr>
                        ))}
                        <tr className={cx("table-row")}></tr>
                    </tbody>
                </table>
                <div className={cx("pagination-wrapper")}>
                    <Stack spacing={2}>
                        <CustomPagination count={10} page={1} shape="rounded" />
                    </Stack>
                </div>
            </div>
        </div>
    );
}
