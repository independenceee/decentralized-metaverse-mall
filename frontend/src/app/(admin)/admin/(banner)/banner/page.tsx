"use client";
import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Tippy from "@tippyjs/react/headless";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCategoriesQuery } from "@/redux/services/categories.api";

import { Banner as BannerType, Category } from "@/redux/services/types";
import images from "@/assets/images";
import Loading from "@/layouts/components/Loading";
import Table from "@/components/Table";

import styles from "./Banner.module.scss";
import {
    useAddBannerMutation,
    useDeleteBannerMutation,
    useGetBannerListQuery,
    useGetBannerQuery,
    useUpdateBannerMutation,
} from "@/redux/services/banners.api";
import { omit } from "lodash";

const cx = classNames.bind(styles);

type BannerFormData = {
    [key in keyof Omit<BannerType, "id" | "createdAt" | "updatedAt">]: string;
};

const initialFormData: BannerFormData = {
    categoryName: "",
    description: "",
    image: "",
    link: "",
    title: "",
};

const Banner = function () {
    const [category, setCategory] = useState<Omit<Category, "image"> | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        clearErrors,
        setError,
    } = useForm<BannerFormData>({
        defaultValues: initialFormData,
    });

    const { data: banner } = useGetBannerQuery(id || "", {
        skip: !Boolean(id),
    });
    console.log("Re-rendered");
    const { data: categories, isSuccess: isGetCategoriesSuccess } = useGetCategoriesQuery();
    const { data: banners, isLoading: isBannerListLoading, isSuccess: isGetBannerListSuccess } = useGetBannerListQuery();
    const [addBanner, { isLoading: isAddBannerLoading }] = useAddBannerMutation();
    const [updateBanner, { isLoading: isUpdateBannerLoading }] = useUpdateBannerMutation();
    const [deleteBanner] = useDeleteBannerMutation();

    const [fileBannerImage, setFileBannerImage] = useState<File>(null!);
    const [bannerImage, setBannerImage] = useState<string>("");
    const inputUploadImageRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            bannerImage && URL.revokeObjectURL(bannerImage);
        };
    }, [bannerImage]);

    useEffect(() => {
        if (banner) {
            setValue("image", banner.image);
            setValue("title", banner.title);
            setValue("categoryName", banner.categoryName);
            setValue("link", banner.link);
            setValue("description", banner.description);
            setCategory((prev) => {
                if (categories) {
                    const category = categories.find(({ name }) => banner.categoryName === name);
                    if (category) return omit(category, ["image"]);
                }
                return prev;
            });
        }
    }, [banner, categories, setValue]);

    const triggerInputFile = function () {
        inputUploadImageRef.current && inputUploadImageRef.current.click();
    };

    const handleUploadCategoryImage = function (e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setBannerImage(URL.createObjectURL(file));
            setFileBannerImage(file);
            setValue("image", file.name);
        }
    };

    const handleDeleteCategory = function (id: string) {
        deleteBanner(id)
            .unwrap()
            .then(() => {
                toast.success("Delete banner successfully");
            })
            .catch((error) => {
                console.log(error);
                toast.warning("Delete banner failed");
            });
    };

    const onSubmit = handleSubmit(
        (data: BannerFormData) => {
            if (data.categoryName === "") {
                setError("categoryName", {
                    message: "Please select category to add vouchers",
                });
                toast.warning("Please select category");
                return;
            }

            const formData: FormData = new FormData();
            formData.append("image", fileBannerImage);
            formData.append("categoryName", data.categoryName);
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("link", data.link);

            if (id) {
                updateBanner({ id, body: formData })
                    .unwrap()
                    .then((res) => {
                        toast.success("Update banner successfully");
                        router.push("/admin/banner");
                    })
                    .then(() => {
                        setBannerImage("");
                        setCategory(null);
                        reset();
                    })
                    .catch((error) => {
                        toast.warning(JSON.parse(JSON.stringify(error.data.message)));
                    });
            } else {
                addBanner(formData)
                    .unwrap()
                    .then((res) => {
                        toast.success("Add banner successfully");
                        setBannerImage("");
                        setCategory(null);
                        reset();
                    })
                    .catch((error) => {
                        console.log(error);
                        // toast.warning("Banner cannot be added to the same category");
                        toast.warning(JSON.parse(JSON.stringify(error.data.message)));
                    });
            }
        },
        (errors) => {
            if (errors) {
                const firstInputName = Object.keys(errors)[0];
                toast(`${firstInputName} is required`);
            }
            console.log(errors);
        },
    );

    const handleClearForm = function () {
        reset();
        setBannerImage("");
        setCategory(null);
        if (id) {
            router.push("/admin/banner");
        }
    };

    const handleChooseCategory = function ({ id, name }: Omit<Category, "image">) {
        setValue("categoryName", name);
        setCategory({ id, name });
        clearErrors("categoryName");
    };

    return (
        <main className={cx("wrapper")}>
            <form className={cx("form-categories")} onSubmit={onSubmit}>
                <div className={cx("form-wrapper")}>
                    <div className={cx("form-header")}>
                        <h2 className={cx("form-section-title")}>{id ? "Update" : "Create"} Banner</h2>
                    </div>
                    <div className={cx("form-body")}>
                        <div className={cx("upload-avatar-section")}>
                            <span className={cx("image-title")}>Image</span>
                            <div className={cx("image-wrapper")}>
                                <Image
                                    className={cx("image")}
                                    src={
                                        (bannerImage && bannerImage) ||
                                        (id && banner && `${process.env.PUBLIC_IMAGES_DOMAIN}/banner/${banner.image}`) ||
                                        images.user
                                    }
                                    width={80}
                                    height={80}
                                    alt="Member Avatar"
                                />
                                <div className={cx("button-change-image-wrapper")} onClick={triggerInputFile}>
                                    <input
                                        type="file"
                                        {...register("image", {
                                            required: { value: true, message: "This field is required" },
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
                                <span className={cx("input-title")}>Title</span>
                                <span className={cx("input-wrapper")}>
                                    <input
                                        {...register("title", {
                                            required: { value: true, message: "Title is required" },
                                        })}
                                        className={cx("input")}
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
                                            required: { value: true, message: "Description is required" },
                                        })}
                                        className={cx("input")}
                                        placeholder="Enter description"
                                        type="text"
                                    />
                                </span>
                            </label>
                            <label className={cx("field-label")}>
                                <span className={cx("input-title")}>Link</span>
                                <span className={cx("input-wrapper")}>
                                    <input
                                        {...register("link", {
                                            required: { value: true, message: " is required" },
                                        })}
                                        className={cx("input")}
                                        placeholder="Enter link"
                                        type="text"
                                    />
                                </span>
                            </label>

                            <label className={cx("field-label")}>
                                <div className={cx("actions")}>
                                    <Tippy
                                        offset={[0, 4]}
                                        placement="bottom-end"
                                        interactive
                                        render={(attrs) => (
                                            <div tabIndex={-1} {...attrs}>
                                                <div className={cx("tippy-wrapper")}>
                                                    <div className={cx("tippy-content")}>
                                                        {isGetCategoriesSuccess &&
                                                            categories.length > 0 &&
                                                            categories.map(({ id, name }) => (
                                                                <button
                                                                    type="button"
                                                                    key={id}
                                                                    className={cx("action", {
                                                                        active: category && category.id === id,
                                                                    })}
                                                                    onClick={() => handleChooseCategory({ id, name })}
                                                                >
                                                                    <span>{name}</span>
                                                                </button>
                                                            ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    >
                                        <button className={cx("chevron-down-button")} type="button">
                                            <span>{category ? category.name : "Categories"}</span>
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
                            </label>
                        </div>

                        <div className={cx("buttons-wrapper", "buttons-button")}>
                            {!id ? (
                                <>
                                    <button className={cx("button", "clear-button")} type="button" onClick={handleClearForm}>
                                        Clear
                                    </button>
                                    <button className={cx("button", "button-add")} type="submit" disabled={isAddBannerLoading}>
                                        Add
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className={cx("button", "cancel-button")} onClick={handleClearForm}>
                                        Cancel
                                    </button>
                                    <button className={cx("button", "save-button")} disabled={isUpdateBannerLoading}>
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
                        <h2 className={cx("form-section-title")}>Banner List Table</h2>
                    </div>
                    <div className={cx("form-body")}>
                        <div className={cx("table-vouchers-by-category")}>
                            {isBannerListLoading && <Loading className={cx("loading-overlay")} />}
                            {isGetBannerListSuccess && (
                                <>
                                    {banners.length > 0 ? (
                                        <Table
                                            type="MANUAL"
                                            pathname="banner"
                                            paginate={false}
                                            onDelete={handleDeleteCategory}
                                            onUpdate={() => {}}
                                            totalPages={2}
                                            currentPage={2}
                                            data={banners}
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

export default Banner;
