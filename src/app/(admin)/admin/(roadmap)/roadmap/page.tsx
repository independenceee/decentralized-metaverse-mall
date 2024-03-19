"use client";

import classNames from "classnames/bind";
import React from "react";
import styles from "./Roadmap.module.scss";
import Tippy from "@tippyjs/react/headless";
import { RoadmapItem } from "@/redux/api/types";
import { useForm } from "react-hook-form";
import { useAddRoadmapMutation, useGetRoadmapByIdQuery, useGetRoadmapListQuery, useUpdateRoadmapMutation } from "@/redux/api/roadmap.api";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const cx = classNames.bind(styles);

type RoadmapFormData = Pick<RoadmapItem, "description" | "datetime" | "title">;

const initialRoadmapFormData: RoadmapFormData = {
    title: "",
    datetime: "",
    description: "",
};

const Roadmap = function () {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");

    const { data: roadmapList, isSuccess: getRoadmapListSuccess } = useGetRoadmapListQuery();
    const { data: roadmap, isSuccess: getRoadmapSuccess } = useGetRoadmapByIdQuery(id || "", {
        skip: !id,
    });
    const [addRoadmap] = useAddRoadmapMutation();
    const [updateRoadmap] = useUpdateRoadmapMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RoadmapFormData>({
        defaultValues: initialRoadmapFormData,
    });

    const onSubmit = handleSubmit(
        (body) => {
            if (id) {
                updateRoadmap({ id, body })
                    .unwrap()
                    .then((data) => {
                        toast.success("Update new founder successfully");
                        handleClearForm();
                        router.push("/admin/roadmap");
                    })
                    .catch((error) => {
                        toast.warning(JSON.parse(JSON.stringify(error.data.message)));
                    });
            } else {
                addRoadmap(body)
                    .unwrap()
                    .then(() => {
                        toast.success("Add Roadmap successfully");
                    })
                    .catch((error) => {
                        toast.error(JSON.parse(JSON.stringify(error.data.message)));
                    });
            }
        },
        (errors) => {
            const key = Object.keys(errors)[0];
            toast.warning(`${key} is required`);
        },
    );

    const handleClearForm = function () {
        reset();
    };

    return (
        <main className={cx("wrapper")}>
            <form className={cx("form-roamdap")} onSubmit={onSubmit}>
                <div className={cx("form-wrapper")}>
                    <div className={cx("form-header")}>
                        <h2 className={cx("form-section-title")}>Roadmap</h2>
                        {false && (
                            <div className={cx("buttons-wrapper")}>
                                <button className={cx("button", "cancel-button")}>Cancel</button>
                                <button className={cx("button", "save-button")}>Save</button>
                            </div>
                        )}
                    </div>
                    <div className={cx("form-body")}>
                        <div className={cx("form-fields-wrapper")}>
                            <label className={cx("field-label")}>
                                <span className={cx("input-title")}>Title</span>
                                <span className={cx("input-wrapper")}>
                                    <input
                                        className={cx("input")}
                                        {...register("title", {
                                            required: {
                                                value: true,
                                                message: "Title is required",
                                            },
                                        })}
                                        placeholder="Enter title"
                                        type="text"
                                    />
                                </span>
                            </label>
                            <label className={cx("field-label")}>
                                <span className={cx("input-title")}>Description</span>
                                <span className={cx("input-wrapper")}>
                                    <input
                                        {...register("description", {
                                            required: {
                                                value: true,
                                                message: "Description is required",
                                            },
                                        })}
                                        className={cx("input")}
                                        placeholder="Enter description"
                                        type="text"
                                    />
                                </span>
                            </label>
                            <label className={cx("field-label")}>
                                <span className={cx("input-title")}>Datetime</span>
                                <span className={cx("input-wrapper")}>
                                    <input
                                        {...register("datetime", {
                                            required: {
                                                value: true,
                                                message: "Datetime is required",
                                            },
                                        })}
                                        className={cx("input")}
                                        placeholder="Enter datetime"
                                        type="text"
                                    />
                                </span>
                            </label>
                        </div>

                        <div className={cx("buttons-wrapper", "buttons-button")}>
                            <button className={cx("button", "clear-button")} type="button" onClick={handleClearForm}>
                                Clear
                            </button>
                            <button className={cx("button", "button-add")}>Add</button>
                        </div>
                    </div>
                </div>
            </form>

            <div className={cx("vouchers-by-category")}>
                <div className={cx("form-wrapper")}>
                    <div className={cx("form-header")}>
                        <h2 className={cx("form-section-title")}>Roadmap List</h2>
                        <div className={cx("actions")}>
                            <Tippy
                                offset={[0, 4]}
                                placement="bottom-end"
                                interactive
                                render={(attrs) => (
                                    <div tabIndex={-1} {...attrs}>
                                        <div className={cx("tippy-wrapper")}>
                                            <div className={cx("tippy-content")}>
                                                <button className={cx("action")}>
                                                    <span>Category 1</span>
                                                </button>
                                                <button className={cx("action")}>
                                                    <span>Category 1</span>
                                                </button>
                                                <button className={cx("action")}>
                                                    <span>Category 1</span>
                                                </button>
                                                <button className={cx("action")}>
                                                    <span>Category 1</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            >
                                <button className={cx("chevron-down-button")}>
                                    <span>Categories</span>
                                    <svg
                                        width={24}
                                        height={24}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className={cx("chevron-down-icon")}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>
                            </Tippy>
                        </div>
                    </div>
                    <div className={cx("form-body")}>
                        <div className={cx("table-vouchers-by-category")}>
                            {/* <Table totalPages={2} currentPage={2} setStatus={null!} data={[]} setData={null!} /> */}
                            {getRoadmapListSuccess && roadmapList && JSON.stringify(roadmapList)}
                        </div>

                        <div className={cx("buttons-wrapper", "buttons-button")}>
                            <button className={cx("button", "clear-button")} type="button">
                                Clear
                            </button>
                            <button className={cx("button", "button-add")}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Roadmap;
