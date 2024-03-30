"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { parse } from "papaparse";

import styles from "./Upload.module.scss";
import { IoCloudUpload as UploadIcon } from "react-icons/io5";
import { FaFileCsv as FileCsvIcon } from "react-icons/fa";
import { FaCheck as CheckIcon } from "react-icons/fa";
import { toast } from "sonner";
const cx = classNames.bind(styles);
type Props = {
    title: string;
    setData: Dispatch<SetStateAction<any[] | null>>;
    isImported?: boolean;
};

const Upload = function ({ title, setData, isImported = false }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isImported) {
            setFile(null);
        }
    }, [isImported]);

    const handleChangeFile = async function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const file = event.target.files?.[0];

        if (file) {
            const fileExtension = file.name.split(".")[1];
            if (fileExtension !== "csv") {
                toast.warning(`File extension (.${fileExtension}) is not .csv`);
                return;
            }

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
                    toast.error(error.message);
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
                        <CheckIcon className={cx("upload-success-icon", "icon-check")} />
                    </div>
                </section>
            )}
        </div>
    );
};

export default Upload;
