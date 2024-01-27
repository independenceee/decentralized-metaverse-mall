import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classNames from "classnames";

import styles from "./Table.module.scss";
import { VoucherStatus } from "@/types/GenericsType";
const cx = classNames.bind;

function createData(name: string, trackingId: number, date: string, status: string) {
    return { name, trackingId, date, status };
}

const rows = [
    createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
    createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
    createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
    createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];

const makeStyle = (status: string) => {
    if (status === VoucherStatus.FREE) {
        return {
            background: "rgb(145 254 159 / 47%)",
            color: "green",
        };
    } else if (status === VoucherStatus.USED) {
        return {
            background: "#cccccc",
            color: "#323232",
        };
    }
};

export default function CustomTable() {
    return (
        <div className="Table">
            <h3>Recent Orders</h3>
            <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="left">Tracking ID</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {rows.map((row) => (
                            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.trackingId}</TableCell>
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">
                                    <span className="status" style={makeStyle(row.status)}>
                                        {row.status}
                                    </span>
                                </TableCell>
                                <TableCell align="left" className="Details">
                                    Details
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
