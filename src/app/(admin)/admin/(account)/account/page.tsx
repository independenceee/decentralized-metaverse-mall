"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import Card from "@/components/Card";
import Table from "@/components/Table";
import Upload from "@/components/Upload";
import styles from "./AdminAccount.module.scss";

type Props = {};

const cx = classNames.bind(styles);

const AdminAccountPage = function ({}: Props) {
    return <div className={cx("wrapper")}></div>;
};

export default AdminAccountPage;
