"use client";
import React, { useMemo, useRef, useState } from "react";
import classNames from "classnames/bind";
import { parse } from "papaparse";
import styles from "./AdminVoucher.module.scss";
import Table from "@/components/Table";
import Balance from "@/components/Balance";

type Props = {};

const cx = classNames.bind(styles);

const AdminVoucherPage = function ({}: Props) {
    const [jsonData, setJsonData] = useState<any[] | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const convertCSVToJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            parse(file, {
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    const data = results.data;
                    console.log("Parsed CSV to JSON:", data);
                    // Xóa phần tử rỗng cuối mảng data
                    data.pop();
                    setJsonData(data);
                },
                error: (error) => {
                    console.error("Error parsing CSV: ", error.message);
                },
            });
        }
    };

    const triggerOpenFileDialog = () => {
        inputRef.current?.click();
    };

    return (
        <>
            <input ref={inputRef} type="file" onChange={convertCSVToJSON} content="Browse CSV file" accept=".csv" style={{ display: "none" }} />
            <button className={cx("open-file-button")} onClick={triggerOpenFileDialog}>
                Browse File
            </button>
            <Balance />
            <Table data={jsonData} />
        </>
    );
};

export default AdminVoucherPage;
