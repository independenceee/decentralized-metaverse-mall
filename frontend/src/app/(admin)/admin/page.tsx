import React from "react";
import classNames from "classnames/bind";
import styles from "@/app/(admin)/admin/Admin.module.scss";
import Sidebar from "@/layouts/components/Sidebar";

const cx = classNames.bind(styles);

type Props = {};

const AdminPage = function ({}: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <Sidebar />
            </div>
        </main>
    );
};

export default AdminPage;
