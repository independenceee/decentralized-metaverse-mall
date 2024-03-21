"use client";

import React from "react";
import classNames from "classnames/bind";
import { Pagination, Stack } from "@mui/material";
import { styled } from "@mui/system";

import styles from "./Table.module.scss";
import Popper from "@/components/Popper";
import Button from "@/components/Button";
import { useModal } from "@/hooks";
import Modal from "../Modal";
import { useRouter, useSearchParams } from "next/navigation";
const cx = classNames.bind(styles);

const CustomPagination = styled(Pagination)({
    ".MuiPagination-ul": {},
    "& .MuiPaginationItem-root": {
        fontSize: "14px",
        color: "white",
        fontWeight: "bold",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: "var(--admin-separate-color)",
        color: "#fff",
        fontWeight: "bold",

        "&:hover": {
            opacity: 1,
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
enum ActionType {
    IMPORT = "import",
    MANUAL = "manual",
}

type Props = {
    data: any[] | null;
    title?: string;
    totalPages: number;
    currentPage: number;
    paginate?: boolean;
    pathname: string;
    type?: ActionType;
    onDelete: (id: string) => void;
    onUpdate?: (id: string) => void;
};

export default function CustomTable({
    data,
    title,
    pathname,
    currentPage,
    totalPages,
    paginate = true,
    onDelete,
    onUpdate,
    type = ActionType.MANUAL,
}: Props) {
    const searchParams = useSearchParams();

    const { replace } = useRouter();
    const { isShowing, toggle } = useModal();
    if (!data) return;

    const handleEditItem = (id: string) => {
        if (type === ActionType.MANUAL) {
            replace(`/admin/${pathname}?id=${id}`);
        }

        if (type === ActionType.IMPORT) {
            // ...
        }
    };

    const handleChangePage = function (event: React.ChangeEvent<unknown>, page: number) {};

    const titles = (data[0] && Object.keys(data[0])) || [];

    return (
        <div className={cx("wrapper")}>
            <header className={cx("header-control")}>
                <h2 className={cx("table-main-title")}>{title}</h2>
                <div className={cx("header-control")}>
                    <div className={cx("actions-wrapper")}>
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
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </label>
                        </form>
                    </div>
                </div>
            </header>

            <div className={cx("table-wrapper")}>
                {data && (
                    <table className={cx("table")}>
                        <thead>
                            <tr>
                                {titles.map((title: any[], index: number) => (
                                    <th className={cx("table-header-title")} key={index}>
                                        {title}
                                    </th>
                                ))}
                                <th className={cx("table-header-title")}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((rows, index: number) => (
                                <tr className={cx("table-row")} key={rows[titles["id"]]} id={`${rows[titles[0]]}`}>
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
                                            offset={[0, 0]}
                                            trigger="mouseenter"
                                            content={
                                                <ul className={cx("dropdown-menu")}>
                                                    <li className={cx("menu-item")} onClick={() => handleEditItem(rows[titles[0]])}>
                                                        Edit
                                                    </li>
                                                    <li className={cx("menu-item")} onClick={() => onDelete(rows[titles[0]])}>
                                                        Delete
                                                    </li>
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
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
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
                )}
                {paginate && (
                    <div className={cx("pagination-wrapper")}>
                        <Stack spacing={2}>
                            <CustomPagination count={totalPages} page={currentPage} shape="rounded" onChange={handleChangePage} />
                        </Stack>
                    </div>
                )}
            </div>
            <Modal isShowing={isShowing} toggle={toggle}>
                <div className={cx("modal-wrapper")}>
                    <section>
                        <p className={cx("modal-title")}>Are you sure to delete it?</p>
                    </section>
                    <div className={cx("modal-buttons")}>
                        <Button className={cx("button-agree", "button")}>Yes</Button>
                        <Button className={cx("button-disagree", "button")} onClick={toggle}>
                            No
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
