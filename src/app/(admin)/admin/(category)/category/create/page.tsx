"use client";

import React, { ChangeEvent, useState } from "react";
import classNames from "classnames/bind";
import { post } from "@/utils/httpRequest";
import styles from "./AdminCreateCategory.module.scss";
import Button from "@/components/Button";
import Upload from "@/components/Upload";
type Props = {};

const cx = classNames.bind(styles);

const AdminCreateCategoryPage = function () {
    const [name, setName] = useState<string>();

    const handleSubmitCategory = async function () {
        try {
            const category = await post("/category", {
                name: name,
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <main>
            <div className={cx("header")}>
                <section className={cx("form-group")}>
                    <Upload data={null!} setData={null!} title="Upload Category Image" />
                    <div className={cx("form")}>
                        <label className={cx("form-label")}>Name:</label>
                        <input onChange={(event) => setName(event.target.value)} className={cx("form-control")} type="text" placeholder="Name" />
                    </div>
                    <div className={cx("form")}>
                        <label className={cx("form-label")}>Slug:</label>
                        <input disabled className={cx("form-control")} type="text" placeholder="Slug" />
                    </div>
                    <div className={cx("form")}>
                        <label className={cx("form-label")}>Description:</label>
                        <input className={cx("form-control")} type="text" placeholder="Description" />
                    </div>

                    <div className={cx("button-container")}>
                        <Button onClick={handleSubmitCategory} className={cx("")}>
                            Create
                        </Button>
                    </div>
                </section>
                <section className={cx("form-group")}>
                    <Upload data={null!} setData={null!} title="Upload Category Image" />
                </section>
            </div>
        </main>
    );
};

export default AdminCreateCategoryPage;
