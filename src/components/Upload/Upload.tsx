"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import classNames from "classnames/bind";
import { parse } from "papaparse";

import styles from "./Upload.module.scss";
import { IoCloudUpload as UploadIcon } from "react-icons/io5";
import { FaFileCsv as FileCsvIcon } from "react-icons/fa";
import { FaCheck as CheckIcon } from "react-icons/fa";
const cx = classNames.bind(styles);
type Props = {
    title: string;
    data: any[] | null;
    setData: Dispatch<SetStateAction<any[] | null>>;
};

const Upload = function ({ title, data, setData }: Props) {
    const [file, setFile] = useState<File>(null!);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleChangeFile = async function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            parse(file, {
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    const { data } = results;
                    data.pop();
                    setData(data);
                },
                error: (error) => {
                    console.error("Error parsing CSV: ", error.message);
                },
            });
        }
    };

    const chooseFile = function () {
        inputRef.current?.click();
    };

    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>{title}</header>
            <div className={cx("form")} onClick={chooseFile}>
                <UploadIcon className={cx("icon")} />
                <input ref={inputRef} type="file" hidden onChange={handleChangeFile} />
                <p className={cx("description")}>Browser File to Upload (.csv)</p>
            </div>

            {file && (
                <section className={cx("upload")}>
                    <div className={cx("upload-success")}>
                        <FileCsvIcon className={cx("upload-success-icon")} />
                        <p className={cx("upload-success-file-name")}>{file.name}</p>
                        <CheckIcon className={cx("upload-success-icon")} />
                    </div>
                </section>
            )}
        </div>
    );
};

export default Upload;
