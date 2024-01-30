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
            background: "rgb(145 254 159 / 47%)",
            color: "green",
        };
    } else if (status === "USED") {
        return {
            background: "#cccccc",
            color: "#323232",
        };
    }
};

export default function CustomTable() {
    const handleChangePage = function (event: React.ChangeEvent<unknown>, page: number) {};
    return (
        <div className="mt-4 sm:mt-5 lg:mt-6">
            <div className="flex items-center justify-between">
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
            </div>
            <div className="card mt-3">
                <div className="is-scrollbar-hidden min-w-full overflow-x-auto">
                    <table className="is-hoverable w-full text-left">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap rounded-tl-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                                    Activity
                                </th>
                                <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                                    Account
                                </th>
                                <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                                    Last Payment
                                </th>
                                <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                                    Balance
                                </th>

                                <th className="whitespace-nowrap rounded-tr-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-accent dark:text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="size-5.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-700 dark:text-navy-100">Insurance</p>
                                            <p className="mt-0.5 text-xs text-slate-400 dark:text-navy-300">Property Coverage</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-medium text-slate-700 dark:text-navy-100">LTC Wallet</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p>Mon, 12 May - 09:00</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-semibold text-error">-7.55 LTC</p>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <button className="btn size-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
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
                            <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-info/10 text-info dark:bg-info dark:text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="size-5.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                            >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-700 dark:text-navy-100">Electricity</p>
                                            <p className="mt-0.5 text-xs text-slate-400 dark:text-navy-300">Utility Payment</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-medium text-slate-700 dark:text-navy-100">BTC Wallet</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p>Wed, 14 May - 12:47</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-semibold text-error">-0.0255 BTC</p>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <button className="btn size-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
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

                            <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning dark:bg-warning dark:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-700 dark:text-navy-100">Konnor Guzman</p>
                                            <p className="mt-0.5 text-xs text-slate-400 dark:text-navy-300">Personal</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-medium text-slate-700 dark:text-navy-100">BTC Wallet</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p>SUN, 20 May - 10:16</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-semibold text-success">+0.55 BTC</p>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <button className="btn size-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
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
                            <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning dark:bg-warning dark:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-700 dark:text-navy-100">Alfredo Elliott</p>
                                            <p className="mt-0.5 text-xs text-slate-400 dark:text-navy-300">Personal</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-medium text-slate-700 dark:text-navy-100">ETH Wallet</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p>THU, 23 May - 15:09</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-semibold text-success">+3.25 ETH</p>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <button className="btn size-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
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
                            <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning dark:bg-warning dark:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-700 dark:text-navy-100">Henry Curtis</p>
                                            <p className="mt-0.5 text-xs text-slate-400 dark:text-navy-300">Personal</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-medium text-slate-700 dark:text-navy-100">BTC Wallet</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p>Wed, 26 May - 12:22</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-semibold text-success">+0.0086 BTC</p>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <button className="btn size-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
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

                            <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-info/10 text-info dark:bg-info dark:text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="size-5.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                            >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-700 dark:text-navy-100">Electricity</p>
                                            <p className="mt-0.5 text-xs text-slate-400 dark:text-navy-300">Utility Payment</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-medium text-slate-700 dark:text-navy-100">ETH Wallet</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p>Sun, 30 May - 13:17</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-semibold text-error">-2.894 ETH</p>
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <button className="btn size-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
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
                            <tr className="border-y border-transparent">
                                <td className="whitespace-nowrap rounded-bl-lg px-4 py-3 sm:px-5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-accent dark:text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="size-5.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-700 dark:text-navy-100">Insurance</p>
                                            <p className="mt-0.5 text-xs text-slate-400 dark:text-navy-300">Property Coverage</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-medium text-slate-700 dark:text-navy-100">LTC Wallet</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p>Mon, 12 May - 09:00</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <p className="font-semibold text-error">-7.55 LTC</p>
                                </td>
                                <td className="whitespace-nowrap rounded-br-lg px-4 py-3 sm:px-5">
                                    <button className="btn size-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
