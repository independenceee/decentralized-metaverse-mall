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
        <div className={cx("wrapper")}>
            <div className="wrapper-inner" style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
                <table className={cx("table")}>
                    <thead className={cx("table-header")}>
                        <tr className={cx("table-row")}>
                            <th className={cx("table-header-title", "checkbox-column")} scope="col"></th>
                            <th className={cx("table-header-title")} scope="col">
                                Date
                            </th>
                            <th className={cx("table-header-title")} scope="col">
                                Code
                            </th>
                            <th className={cx("table-header-title", "status-column")} scope="col">
                                Status
                            </th>
                            <th className={cx("table-header-title")} scope="col">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className={cx("table-body")}>
                        {rows.map((row) => {
                            return (
                                <tr className={cx("table-row")} key={row.id}>
                                    <td className={cx("table-column", "checkbox-column")} data-label="Account">
                                        <input type="checkbox" />
                                    </td>
                                    <td className={cx("table-column")} data-label="Account">
                                        {row.date}
                                    </td>
                                    <td className={cx("table-column", "voucher-code")} data-label="Due Date">
                                        {row.code}
                                    </td>
                                    <td className={cx("table-column", "status-column")} data-label="Amount">
                                        <span style={makeStyle(row.status)} className={cx("status")}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className={cx("table-column", "actions")} data-label="Period">
                                        <span className={cx("icon-action-wrapper")}>
                                            <CiEdit className={cx("icon-action")} />
                                        </span>
                                        <span className={cx("icon-action-wrapper")}>
                                            <IoTrashOutline className={cx("icon-action")} />
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <Stack color={"#fff"} spacing={2}>
                    <CustomPagination count={10} page={1} shape="rounded" />
                </Stack>
            </div>
        </div>
    );
}
