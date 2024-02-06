"use client";

import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
import { Pagination, Stack } from "@mui/material";
import { styled } from "@mui/system";

import styles from "./Table.module.scss";
import Popper from "@/components/Popper";
import Button from "@/components/Button";
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import { TransactionContextType } from "@/types/contexts/TransactionContextType";
import TransactionContext from "@/contexts/components/TransactionContext";
import { TxHash } from "lucid-cardano";
import { del, post } from "@/utils/httpRequest";
import Link from "next/link";
import { useModal } from "@/hooks";
import Modal from "../Modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const cx = classNames.bind(styles);

const CustomPagination = styled(Pagination)({
    ".MuiPagination-ul": {},
    "& .MuiPaginationItem-root": {
        fontSize: "14px",
        color: "white",
        fontWeight: "bold",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: "#4a28a9",
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
    title: string;
    type?: string;
    pathname?: string;
    totalPages: number;
    currentPage: number;
    setData: React.Dispatch<React.SetStateAction<any[] | null>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
};

export default function CustomTable({ data, title, type, setData, pathname, currentPage, totalPages, setCurrentPage, setStatus }: Props) {
    const router = useRouter();
    const { isShowing, toggle } = useModal();
    const [itemId, setItemId] = useState<string>("");
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { sendNativeTokens } = useContext<TransactionContextType>(TransactionContext);

    if (!data) return;
    console.log(data);

    const handleChangePage = function (event: React.ChangeEvent<unknown>, page: number) {
        setCurrentPage && setCurrentPage(page);
    };
    const titles = (data[0] && Object.keys(data[0])) || [];

    const handleSendNativeToken = async function () {
        try {
            if (lucid) {
                const txHash: TxHash = await sendNativeTokens({ lucid: lucid, accounts: data });
                if (txHash) {
                    setData(null!);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateVoucher = async function () {
        try {
            const vouchers = data.map(function (item) {
                return {
                    code: item.code,
                    link: item.link,
                    status: item.status,
                };
            });
            await post("/voucher", vouchers);
            toast("Create voucher successfully !");
            router.replace("/admin/voucher");
        } catch (error) {
            toast("Create voucher falid !");
        }
    };

    const handleGetItemId = (id: string) => {
        setItemId(id);
        toggle();
    };

    const handleDelete = async () => {
        try {
            await del(`/voucher/${itemId}`);
            toast("Delete successfully");
        } catch (error) {
            toast("Delete failed");
        }
        toggle();
    };

    const handleGetStatus = function (status: string) {
        setStatus(status);
    };
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header-control")}>
                <h2 className={cx("table-main-title")}>{title}</h2>
                <div className={cx("header-control")}>
                    {title === "Transaction" && (
                        <Button onClick={handleSendNativeToken} className="">
                            Create {title}
                        </Button>
                    )}

                    {title === "Voucher" && (
                        <Button onClick={handleCreateVoucher} className="">
                            Create {title}
                        </Button>
                    )}

                    {type && (
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
                                            <li onClick={() => handleGetStatus("FREE")} className={cx("menu-item")}>
                                                FREE
                                            </li>
                                            <li onClick={() => handleGetStatus("USED")} className={cx("menu-item")}>
                                                USED
                                            </li>
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
                    )}
                </div>
            </header>

            <div className={cx("table-wrapper")}>
                <table className={cx("table")}>
                    <thead>
                        <tr>
                            {titles.map((title: any[], index: number) => (
                                <th className={cx("table-header-title")} key={index}>
                                    {title}
                                </th>
                            ))}
                            {type && <th className={cx("table-header-title")}></th>}
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

                                {type && (
                                    <td className={cx("table-column")}>
                                        <Popper
                                            content={
                                                <ul className={cx("dropdown-menu")}>
                                                    <li className={cx("menu-item")}>
                                                        <Link href={`${pathname}/${rows[titles[0]]}`} style={{ display: "block", flexGrow: 1 }}>
                                                            Edit
                                                        </Link>
                                                    </li>
                                                    <li className={cx("menu-item")} onClick={() => handleGetItemId(rows[titles[0]])}>
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
                                )}
                            </tr>
                        ))}
                        <tr className={cx("table-row")}></tr>
                    </tbody>
                </table>
                <div className={cx("pagination-wrapper")}>
                    <Stack spacing={2}>
                        <CustomPagination count={totalPages} page={currentPage} shape="rounded" onChange={handleChangePage} />
                    </Stack>
                </div>
            </div>
            <Modal isShowing={isShowing} toggle={toggle}>
                <div className={cx("modal-wrapper")}>
                    <section>
                        <p className={cx("modal-title")}>Are you sure to delete it?</p>
                    </section>
                    <div className={cx("modal-buttons")}>
                        <Button className={cx("button-agree", "button")} onClick={handleDelete}>
                            Yes
                        </Button>
                        <Button className={cx("button-disagree", "button")} onClick={toggle}>
                            No
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
