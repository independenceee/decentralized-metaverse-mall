"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import { AddressCardIcon } from "@/components/Icons";
import Card from "@/components/Card";

const cx = classNames.bind(styles);

type Props = {};

const CategoryPage = function () {
    const [categories, setCategories] = useState();
    useEffect(() => {});
    return (
        <div>
            <div className={cx("header")}>
                <Card title="Create Category" Icon={AddressCardIcon} type="add" to="/admin/category/create" />
            </div>
        </div>
    );
};

export default CategoryPage;
