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
import useQueryString from "@/hooks/useQueryString";
import Link from "next/link";
import { toast } from "sonner";
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

type Props = {
    data: any[] | null;
    title?: string;
    totalPages?: number;
    currentPage?: number;
    paginate?: boolean;
    pathname?: string;
    type: "IMPORT" | "MANUAL";
    onDelete: (id: string) => void;
    onUpdate?: (id: string) => void;
    onSend?: () => void;
};

export default function CustomTable({
    data,
    title,
    pathname,
    totalPages = 1,
    paginate = true,
    onDelete,
    onUpdate,
    type,
    currentPage = 1,
    onSend,
}: Props) {
    const { pathname: URL_PATH_NAME, params, router } = useQueryString();
    const { push } = useRouter();
    const { isShowing, toggle } = useModal();
    if (!data) return;

    const handleChangePage = function (event: React.ChangeEvent<unknown>, page: number) {
        params.set("page", String(page));
        router.push(URL_PATH_NAME + "?" + params.toString(), {
            scroll: false,
        });
    };

    const handleDeleteItem = function (id: string) {
        if (params.toString().includes("id")) {
            toast.warning("You are editing...");
            return;
        } else {
            onDelete(id);
        }
    };

    const titles = (data[0] && Object.keys(data[0])) || [];

    return (
        <div className={cx("wrapper")}>
            <header className={cx("header-control")}>
                <h2 className={cx("table-main-title")}>{title}</h2>
                {onSend && (
                    <Button className="" onClick={onSend}>
                        Send Token
                    </Button>
                )}
            </header>

            <div className={cx("table-wrapper")}>
                <div className={cx("table-content")}>
                    {data && (
                        <table className={cx("table")}>
                            <thead>
                                <tr>
                                    {titles.map((title: any[], index: number) => (
                                        <th className={cx("table-header-title")} key={index}>
                                            {title}
                                        </th>
                                    ))}
                                    {type === "MANUAL" && <th className={cx("table-header-title")}></th>}
                                </tr>
                            </thead>
                            <tbody className={cx("table-body")}>
                                {data?.map((rows, index: number) => (
                                    <tr className={cx("table-row")} key={index} id={`${rows[titles[0]]}`}>
                                        {Array(titles.length)
                                            .fill(0)
                                            .map((_, i) => (
                                                <td
                                                    className={cx("table-column", {
                                                        manual: type === "MANUAL",
                                                    })}
                                                    key={i}
                                                    id={titles[i].toLowerCase().toString()}
                                                >
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

                                        {type === "MANUAL" && (
                                            <td className={cx("table-column")}>
                                                <Popper
                                                    offset={[0, 0]}
                                                    trigger="mouseenter"
                                                    content={
                                                        <ul className={cx("dropdown-menu")}>
                                                            <Link className={cx("menu-item")} href={`/admin/${pathname}?id=${rows[titles[0]]}`}>
                                                                Edit
                                                            </Link>
                                                            <li
                                                                role="button"
                                                                className={cx("menu-item")}
                                                                onClick={() => handleDeleteItem(rows[titles[0]])}
                                                            >
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
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
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
