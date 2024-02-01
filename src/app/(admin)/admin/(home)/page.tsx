import React from "react";
import classNames from "classnames/bind";
import styles from "./AdminHome.module.scss";
import Card from "@/components/Card";
import Table from "@/components/Table";
import Upload from "@/components/Upload";

type Props = {};

const cx = classNames.bind(styles);

const AdminHomePage = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <Upload />
                <Upload />
                
            </header>
            <aside>
                <Table />
            </aside>
        </div>
    );
};

export default AdminHomePage;
