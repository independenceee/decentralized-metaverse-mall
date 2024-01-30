"use client";
import * as React from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import classNames from "classnames/bind";
import { Pagination, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { VoucherStatus } from "@/types/GenericsType";

import styles from "./Table.module.scss";
const cx = classNames.bind(styles);

const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
        fontSize: "16px",
        color: "white",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: "white",
        color: "#4a28a9",
        "&:hover": {
            opacity: 0.7,
        },
    },
});

function createData(id: string, date: string, code: string, status: string) {
    return { id, date, code, status };
}

const rows = [
    createData("1", "2 March 2022", "0xfx3g9s729qlxpsf56ahg2", "FREE"),
    createData("2", "2 March 2022", "0xfx3g9s729qlxpsf56ahg2", "USED"),
    createData("3", "2 March 2022", "0xfx3g9s729qlxpsf56ahg2", "FREE"),
    createData("4", "2 March 2022", "0xfx3g9s729qlxpsf56ahg2", "USED"),
];

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
};

export default function CustomTable() {
    const handleChangePage = function (event: React.ChangeEvent<unknown>, page: number) {};

    return (
        <div className={cx("wrapper")}>
            {/* <div className="flex items-center justify-between">
                <h2 className="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">Latest Activities</h2>
                <div className="flex">
                    <div className="flex items-center" x-data="{isInputActive:false}">
                        <label className="block">
                            <input placeholder="Search here..." type="text" />
                        </label>
                        <button className="btn size-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div x-data="usePopper({placement:'bottom-end',offset:4})" className="inline-flex">
                        <button
                            x-ref="popperRef"
                            className="btn size-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                            </svg>
                        </button>
                        <div x-ref="popperRoot" className="popper-root">
                            <div className="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
                                <ul>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                                        >
                                            Action
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                                        >
                                            Another Action
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                                        >
                                            Something else
                                        </a>
                                    </li>
                                </ul>
                                <div className="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
                                <ul>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                                        >
                                            Separated Link
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="card mt-3">
                <div className={cx("table-wrapper")}>
                    <table className={cx("table")}>
                        <thead>
                            <tr>
                                <th className={cx("table-header-title")}>Activity</th>
                                <th className={cx("table-header-title")}>Account</th>
                                <th className={cx("table-header-title")}>Last Payment</th>
                                <th className={cx("table-header-title")}>Balance</th>
                                <th className={cx("table-header-title")}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <tr className={cx("table-row")} key={index}>
                                        <td className={cx("table-column")}>
                                            <p className={cx("table-column-content")}>{new Date().toISOString()}</p>
                                        </td>

                                        <td className={cx("table-column")}>
                                            <p className={cx("table-column-content")}>LTC Wallet</p>
                                        </td>
                                        <td className={cx("table-column")}>
                                            <p>Mon, 12 May - 09:00</p>
                                        </td>
                                        <td className={cx("table-column")}>
                                            <p style={makeStyle("USED")}>-7.55 LTC</p>
                                        </td>

                                        <td className={cx("table-column")}>
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
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
