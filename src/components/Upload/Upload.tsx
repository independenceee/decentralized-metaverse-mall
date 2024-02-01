import React from "react";
import classNames from "classnames/bind";
import styles from "./Upload.module.scss";
import { IoCloudUpload as UploadIcon } from "react-icons/io5";
import { FaFileCsv as FileCsvIcon } from "react-icons/fa";
import { FaCheck as CheckIcon } from "react-icons/fa";
const cx = classNames.bind(styles);
type Props = {
    title: string;
};

const Upload = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>File uploader voucher</header>
            <form className={cx("form")}>
                <UploadIcon className={cx("icon")} />
                <p className={cx("description")}>Browser File to Upload (.csv)</p>
            </form>

            <section className={cx("upload")}>
                <div className={cx("upload-success")}>
                    <FileCsvIcon className={cx("upload-success-icon")} />
                    <p className={cx("upload-success-file-name")}>voucher.csv</p>
                    <CheckIcon className={cx("upload-success-icon")} />
                </div>
            </section>
        </div>
    );
};

export default Upload;
