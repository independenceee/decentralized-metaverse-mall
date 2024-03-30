"use client";

import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Category } from "@/redux/api/types";
import { toast } from "sonner";
import images from "@/assets/images";
import Tippy from "@tippyjs/react/headless";
import Table from "@/components/Table";
import { useRouter, useSearchParams } from "next/navigation";
import {
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
} from "@/redux/api/categories.api";
import Loading from "@/layouts/components/Loading";

const cx = classNames.bind(styles);

type CategoryFormData = {
    [key in keyof Omit<Category, "id">]: string;
};

const initialFormData: CategoryFormData = {
    image: "",
    name: "",
};

const CategoryPage = function () {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<CategoryFormData>({
        defaultValues: initialFormData,
    });
    const { data: category } = useGetCategoryQuery(id || "", {
        skip: !id,
    });
    const { data: categories, isSuccess, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
    const [addCategory, { isLoading: isAddCategoryLoading }] = useAddCategoryMutation();
    const [updateCategory, { isLoading: isUpdateCategoryLoading }] = useUpdateCategoryMutation();
    const [deleteCategory, { isLoading: isDeleteCategoryLoading }] = useDeleteCategoryMutation();

    const [fileCategoryImage, setFileCategoryImage] = useState<File>(null!);
    const [categoryImage, setCategoryImage] = useState<string>("");
    const inputUploadImageRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            categoryImage && URL.revokeObjectURL(categoryImage);
        };
    }, [categoryImage]);

    useEffect(() => {
        if (category) {
            setValue("name", category.name);
            setValue("image", category.image);
        }
    }, [category, setValue]);

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
        deleteCategory(id)
            .unwrap()
            .then(() => {
                toast.success("Delete category successfully");
            })
            .catch((error) => {
                toast.warning("Cannot delete category. There are vouchers in the category");
            });
    };

    const onSubmit = handleSubmit(
        (data: CategoryFormData) => {
            const formData: FormData = new FormData();
            formData.append("image", fileCategoryImage);
            formData.append("name", data.name);
            if (id) {
                updateCategory({ id, body: formData })
                    .unwrap()
                    .then((res) => {
                        toast.success("Update category successfully");
                        router.push("/admin/category");
                    })
                    .then(() => {
                        setCategoryImage("");
                        reset();
                    })
                    .catch((error) => {
                        // toast.warning(JSON.parse(JSON.stringify(error?.data?.message)));
                        toast.warning("Error while updating category");
                    });
            } else {
                addCategory(formData)
                    .unwrap()
                    .then((res) => {
                        setCategoryImage("");
                        reset();
                    })
                    .catch((error) => {
                        // toast.warning(JSON.parse(JSON.stringify(error?.data?.message)));
                        toast.warning("Error while adding category");
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
                        <h2 className={cx("form-section-title")}>Categories</h2>
                    </div>
                    <div className={cx("form-body")}>
                        <div className={cx("upload-avatar-section")}>
                            <span className={cx("image-title")}>Image</span>
                            <div className={cx("image-wrapper")}>
                                <Image
                                    className={cx("image")}
                                    src={
                                        categoryImage ||
                                        (id && category && `${process.env.PUBLIC_IMAGES_DOMAIN}/category/${category.image}`) ||
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
                                <span className={cx("input-title")}>Name</span>
                                <span className={cx("input-wrapper")}>
                                    <input
                                        {...register("name", {
                                            required: { value: true, message: "This field is required" },
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
                                    <button className={cx("button", "button-add")} type="submit" disabled={isAddCategoryLoading}>
                                        Add
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className={cx("button", "cancel-button")} onClick={handleClearForm}>
                                        Cancel
                                    </button>
                                    <button className={cx("button", "save-button")} disabled={isUpdateCategoryLoading}>
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
                        <h2 className={cx("form-section-title")}>Vouchers by category</h2>
                        <div className={cx("actions")}>
                            <Tippy
                                offset={[0, 4]}
                                placement="bottom-end"
                                interactive
                                render={(attrs) => (
                                    <div tabIndex={-1} {...attrs}>
                                        <div className={cx("tippy-wrapper")}>
                                            <div className={cx("tippy-content")}>
                                                {isSuccess &&
                                                    categories.map(({ id, name }) => (
                                                        <button className={cx("action")} key={id} onClick={() => null}>
                                                            <span className={cx("category-name")}>{name}</span>
                                                        </button>
                                                    ))}
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
                            {isCategoriesLoading && <Loading className={cx("loading-overlay")} />}
                            {isSuccess && (
                                <>
                                    {categories.length > 0 ? (
                                        <Table
                                            type="MANUAL"
                                            pathname="category"
                                            paginate={false}
                                            onDelete={handleDeleteCategory}
                                            onUpdate={() => {}}
                                            totalPages={2}
                                            currentPage={2}
                                            data={categories}
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

export default CategoryPage;
