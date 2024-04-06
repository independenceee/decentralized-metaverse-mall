"use client";

import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./HotDeal.module.scss";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { HotDeal as HotDealType } from "@/redux/services/types";
import { toast } from "sonner";
import images from "@/assets/images";
import Table from "@/components/Table";
import { useRouter, useSearchParams } from "next/navigation";
import {
    useAddHotDealMutation,
    useDeleteHotDealMutation,
    useGetHotDealListQuery,
    useGetHotDealQuery,
    useUpdateHotDealMutation,
} from "@/redux/services/deals.api";
import Loading from "@/layouts/components/Loading";
import withAuth from "@/HOC/withAuth";

const cx = classNames.bind(styles);

type HotDealFormData = {
    [key in keyof Omit<HotDealType, "id" | "createdAt" | "updatedAt">]: string;
};

const initialFormData: HotDealFormData = {
    image: "",
    name: "",
};

const HotDeal = function () {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<HotDealFormData>({
        defaultValues: initialFormData,
    });
    const { data: deal } = useGetHotDealQuery(id || "", {
        skip: !id,
    });
    const { data: deals, isSuccess, isLoading: isHotDealsLoading } = useGetHotDealListQuery();
    const [addHotDeal, { isLoading: isAddHotDealLoading }] = useAddHotDealMutation();
    const [updateHotDeal, { isLoading: isUpdateHotDealLoading }] = useUpdateHotDealMutation();
    const [deleteHotDeal] = useDeleteHotDealMutation();

    const [fileDealImage, setFileCategoryImage] = useState<File>(null!);
    const [dealImage, setCategoryImage] = useState<string>("");
    const inputUploadImageRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            dealImage && URL.revokeObjectURL(dealImage);
        };
    }, [dealImage]);

    useEffect(() => {
        if (deal) {
            setValue("name", deal.name);
            setValue("image", deal.image);
        }
    }, [deal, setValue]);

    const triggerInputFile = function () {
        inputUploadImageRef.current && inputUploadImageRef.current.click();
    };

    const handleUploadCategoryImage = function (e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setCategoryImage(URL.createObjectURL(file));
            setFileCategoryImage(file);
            setValue("image", file.name);
        }
    };

    const handleDeleteCategory = function (id: string) {
        deleteHotDeal(id)
            .then(() => {
                toast.success("Delete hot deal successfully");
            })
            .catch((error) => {
                toast.warning("Delete hot deal failed");
            });
    };

    const onSubmit = handleSubmit(
        (data: HotDealFormData) => {
            const formData: FormData = new FormData();
            formData.append("image", fileDealImage);
            formData.append("name", data.name);
            if (id) {
                updateHotDeal({ id, body: formData })
                    .unwrap()
                    .then((res) => {
                        toast.success("Update hot deal successfully");
                        setCategoryImage("");
                        reset();
                        router.push("/admin/hot-deal");
                    })
                    .catch((error) => {
                        toast.warning(JSON.parse(JSON.stringify(error.data.message)));
                    });
            } else {
                addHotDeal(formData)
                    .unwrap()
                    .then((res) => {
                        setCategoryImage("");
                        reset();
                    })
                    .catch((error) => {
                        toast.warning(JSON.parse(JSON.stringify(error.data.message)));
                    });
            }
        },
        (errors) => {
            if (errors) {
                const firstInputName = Object.keys(errors)[0];
                toast(`${firstInputName} is required`);
            }
        },
    );

    const handleClearForm = function () {
        reset();
        setCategoryImage("");
    };

    return (
        <main className={cx("wrapper")}>
            <form className={cx("form-categories")} onSubmit={onSubmit}>
                <div className={cx("form-wrapper")}>
                    <div className={cx("form-header")}>
                        <h2 className={cx("form-section-title")}>{id ? "Update" : "Create"} Hot Deal</h2>
                    </div>
                    <div className={cx("form-body")}>
                        <div className={cx("upload-avatar-section")}>
                            <span className={cx("image-title")}>Image</span>
                            <div className={cx("image-wrapper")}>
                                <Image
                                    className={cx("image")}
                                    src={dealImage || (id && deal && `${process.env.PUBLIC_IMAGES_DOMAIN}/dealhot/${deal.image}`) || images.user}
                                    width={80}
                                    height={80}
                                    alt="Member Avatar"
                                />
                                <div className={cx("button-change-image-wrapper")} onClick={triggerInputFile}>
                                    <input
                                        type="file"
                                        {...register("image", {
                                            required: { value: true, message: "Image is required" },
                                        })}
                                        ref={inputUploadImageRef}
                                        hidden
                                        onChange={handleUploadCategoryImage}
                                    />
                                    <div className={cx("button-change-image")}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={cx("upload-image-icon")}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx("line-separate")} />
                        <div className={cx("form-fields-wrapper")}>
                            <label className={cx("field-label")}>
                                <span className={cx("input-title")}>Name</span>
                                <span className={cx("input-wrapper")}>
                                    <input
                                        {...register("name", {
                                            required: { value: true, message: "Name is required" },
                                        })}
                                        className={cx("input")}
                                        placeholder="Enter name"
                                        type="text"
                                    />
                                </span>
                            </label>
                        </div>

                        <div className={cx("buttons-wrapper", "buttons-button")}>
                            {!id ? (
                                <>
                                    <button className={cx("button", "clear-button")} type="button" onClick={handleClearForm}>
                                        Clear
                                    </button>
                                    <button className={cx("button", "button-add")} type="submit" disabled={isAddHotDealLoading}>
                                        Add
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className={cx("button", "cancel-button")} onClick={handleClearForm}>
                                        Cancel
                                    </button>
                                    <button className={cx("button", "save-button")} disabled={isUpdateHotDealLoading}>
                                        Save
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            <div className={cx("vouchers-by-category")}>
                <div className={cx("form-wrapper", "data-vouchers")}>
                    <div className={cx("form-header")}>
                        <h2 className={cx("form-section-title")}>Hot Deals</h2>
                    </div>
                    <div className={cx("form-body")}>
                        <div className={cx("table-vouchers-by-category")}>
                            {isHotDealsLoading && <Loading className={cx("loading-overlay")} />}
                            {isSuccess && (
                                <>
                                    {deals.length > 0 ? (
                                        <Table
                                            type="MANUAL"
                                            pathname="hot-deal"
                                            paginate={false}
                                            onDelete={handleDeleteCategory}
                                            onUpdate={() => {}}
                                            totalPages={2}
                                            currentPage={2}
                                            data={deals}
                                        />
                                    ) : (
                                        <span className={cx("no-data-available")}>Empty data</span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default withAuth(HotDeal);
