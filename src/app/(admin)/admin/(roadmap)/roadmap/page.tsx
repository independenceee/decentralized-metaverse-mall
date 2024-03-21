"use client";

import classNames from "classnames/bind";
import React, { useEffect, useMemo } from "react";
import styles from "./Roadmap.module.scss";
import Tippy from "@tippyjs/react/headless";
import { RoadmapItem } from "@/redux/api/types";
import { useForm } from "react-hook-form";
import {
    useAddRoadmapMutation,
    useDeleteRoadmapMutation,
    useGetRoadmapByIdQuery,
    useGetRoadmapListQuery,
    useUpdateRoadmapMutation,
} from "@/redux/api/roadmap.api";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Table from "@/components/Table";
import Loading from "@/layouts/components/Loading";

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

    const { data: roadmapList, isSuccess: getRoadmapListSuccess, isLoading: isRoadmapListLoading } = useGetRoadmapListQuery();
    const { currentData: roadmap, isSuccess: getRoadmapSuccess } = useGetRoadmapByIdQuery(id || "", {
        skip: !id,
    });

    const [addRoadmap] = useAddRoadmapMutation();
    const [updateRoadmap] = useUpdateRoadmapMutation();
    const [deleteRoadmap] = useDeleteRoadmapMutation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<RoadmapFormData>({
        defaultValues: initialRoadmapFormData,
    });

    useEffect(() => {
        if (roadmap) {
            setValue("title", roadmap.title);
            setValue("description", roadmap.description);
            setValue("datetime", roadmap.datetime);
        }
    }, [roadmap, setValue]);

    const onSubmit = handleSubmit(
        (body) => {
            if (id) {
                updateRoadmap({ id, body })
                    .unwrap()
                    .then(() => {
                        toast.success("Update new roadmap successfully");
                        reset();
                        router.push("/admin/roadmap");
                    })
                    .catch((error) => {
                        toast.warning(JSON.parse(JSON.stringify(error.data.message)));
                    });
            } else {
                addRoadmap(body)
                    .unwrap()
                    .then(() => {
                        reset();
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

    const handleDeleteRoadmap = function (id: string) {
        deleteRoadmap(id)
            .then(() => {
                toast.success("Delete Roadmap successfully");
            })
            .catch((error) => {
                toast.error("Failed to delete roadmap");
            });
    };
    const handleClearForm = function () {
        reset();
    };

    return (
        <main className={cx("wrapper")}>
            <form className={cx("form-roamdap")} onSubmit={onSubmit}>
                <div className={cx("form-wrapper")}>
                    <div className={cx("form-header")}>
                        <h2 className={cx("form-section-title")}>Roadmap</h2>
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
                        <div className={cx("buttons-wrapper")}>
                            {getRoadmapSuccess && roadmap ? (
                                <>
                                    <button className={cx("button", "cancel-button")}>Cancel</button>
                                    <button className={cx("button", "save-button")}>Save</button>
                                </>
                            ) : (
                                <>
                                    <button className={cx("button", "clear-button")} type="button" onClick={handleClearForm}>
                                        Clear
                                    </button>
                                    <button className={cx("button", "button-add")}>Add</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            <div className={cx("vouchers-by-category")}>
                <div className={cx("form-wrapper")}>
                    <div className={cx("form-header")}>
                        <h2 className={cx("form-section-title")}>Roadmap List</h2>
                    </div>
                    <div className={cx("form-body")}>
                        {getRoadmapListSuccess && (
                            <>
                                {roadmapList.length !== 0 ? (
                                    <>
                                        <div className={cx("table-roadmap-list")}>
                                            <Table
                                                pathname="roadmap"
                                                paginate={false}
                                                onDelete={handleDeleteRoadmap}
                                                onUpdate={() => {}}
                                                totalPages={2}
                                                currentPage={2}
                                                data={roadmapList}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <span className={cx("data-not-available")}>Empty data</span>
                                )}
                            </>
                        )}

                        {isRoadmapListLoading && <Loading className={cx("loading-overlay")} />}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Roadmap;
