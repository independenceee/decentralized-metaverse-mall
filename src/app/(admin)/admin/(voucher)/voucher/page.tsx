"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminVoucher.module.scss";
import Table from "@/components/Table";

import Tippy from "@tippyjs/react/headless";
import { useGetCategoriesQuery } from "@/redux/api/categories.api";
import {
    useAddVoucherMutation,
    useDeleteVoucherMutation,
    useGetVoucherListQuery,
    useGetVoucherQuery,
    useUpdateVoucherMutation,
} from "@/redux/api/vouchers.api";
import Upload from "@/components/Upload";
import { useForm } from "react-hook-form";
import { Category, Voucher, VoucherStatus } from "@/redux/api/types";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { omit } from "lodash";

const cx = classNames.bind(styles);

type VoucherFormData = Pick<Voucher, "code" | "price" | "status" | "link" | "categoryId">;

const initialVoucherFormData: VoucherFormData = {
    categoryId: "",
    code: "",
    link: "",
    price: "",
    status: VoucherStatus.FREE,
};

const AdminVoucherPage = function () {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const [category, setCategory] = useState<Omit<Category, "image"> | null>(null);
    const { data: categories, isSuccess: getCategoriesSuccess, isLoading: isCategoryListLoading } = useGetCategoriesQuery();
    const { data: voucherDataResponse, isSuccess: getVoucherListSuccess, isLoading: isVoucherListLoading } = useGetVoucherListQuery();
    const { data: voucher, isSuccess: getVoucherSuccess } = useGetVoucherQuery(id || "", {
        skip: !id,
    });
    const [addVoucher, { isLoading: isAddVoucherLoading }] = useAddVoucherMutation();
    const [udpateVoucher, { isLoading: isUpdateVoucherLoading }] = useUpdateVoucherMutation();
    const [deleteVoucher, { isLoading: isDeleteVoucherLoading }] = useDeleteVoucherMutation();

    const { register, handleSubmit, reset, setValue, getValues, setError, clearErrors } = useForm<VoucherFormData>({
        defaultValues: initialVoucherFormData,
    });

    useEffect(() => {
        if (voucher) {
            setValue("code", voucher.code);
            setValue("price", voucher.price);
            setValue("status", voucher.status);
            setValue("link", voucher.link);
            setValue("categoryId", voucher.categoryId);
            setCategory((prev) => {
                if (categories) {
                    const category = categories.find(({ id }) => voucher.categoryId === id);
                    if (category) return omit(category, ["image"]);
                }
                return prev;
            });
        }
    }, [voucher, setValue, categories]);

    const handleChooseCategory = function ({ id, name }: Omit<Category, "image">) {
        setValue("categoryId", id);
        setCategory({ id, name });
        clearErrors("categoryId");
    };

    const onSubmit = handleSubmit(
        (data) => {
            if (data.categoryId === "") {
                setError("categoryId", {
                    message: "Please select category to add vouchers",
                });
                toast.warning("Please select category");
            }

            if (id) {
                udpateVoucher({ id, body: data })
                    .unwrap()
                    .then(() => {
                        toast.success(`Updated voucher to category ${category?.name} successfully`);
                        reset();
                        setCategory(null);
                    })
                    .catch((error) => {
                        toast.error(JSON.parse(JSON.stringify(error?.data?.message)));
                    });
            } else {
                addVoucher([data])
                    .unwrap()
                    .then(() => {
                        toast.success(`Added voucher to category ${category?.name} successfully`);
                        reset();
                        setCategory(null);
                    })
                    .catch((error) => {
                        toast.error(JSON.parse(JSON.stringify(error?.data?.message)));
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
        setCategory(null);
    };

    const handleDeleteVoucher = function (id: string) {
        deleteVoucher(id)
            .unwrap()
            .then(() => {
                toast.success(`Deleted voucher successfully`);
            })
            .catch((error) => {
                toast.error(JSON.parse(JSON.stringify(error?.data?.message)));
            });
    };

    return (
        <main className={cx("wrapper")} onSubmit={onSubmit}>
            <div className={cx("wrapper-inner")}>
                <form className={cx("form-categories")}>
                    <div className={cx("form-wrapper")}>
                        <div className={cx("form-header")}>
                            <h2 className={cx("form-section-title")}>Voucher</h2>
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
                                    <span className={cx("input-title")}>Code</span>
                                    <span className={cx("input-wrapper")}>
                                        <input
                                            {...register("code", {
                                                required: {
                                                    value: true,
                                                    message: "Code is required",
                                                },
                                            })}
                                            className={cx("input")}
                                            placeholder="Enter name"
                                            type="text"
                                        />
                                    </span>
                                </label>
                                <label className={cx("field-label")}>
                                    <span className={cx("input-title")}>Price</span>
                                    <span className={cx("input-wrapper")}>
                                        <input
                                            {...register("price", {
                                                required: {
                                                    value: true,
                                                    message: "Price is required",
                                                },
                                            })}
                                            className={cx("input")}
                                            placeholder="Enter name"
                                            type="text"
                                        />
                                    </span>
                                </label>
                                <label className={cx("field-label")}>
                                    <span className={cx("input-title")}>Product Link</span>
                                    <span className={cx("input-wrapper")}>
                                        <input
                                            {...register("link", {
                                                required: {
                                                    value: true,
                                                    message: "Link is required",
                                                },
                                            })}
                                            className={cx("input")}
                                            placeholder="Enter name"
                                            type="text"
                                        />
                                    </span>
                                </label>
                                <label className={cx("field-label")}>
                                    <span className={cx("input-title")}>Status</span>
                                    <span className={cx("input-wrapper")}>
                                        <input
                                            {...register("status", {
                                                required: {
                                                    value: true,
                                                    message: "Status is required",
                                                },
                                                pattern: {
                                                    value: /^FREE|USED$/,
                                                    message: "Status must be FREE or USED",
                                                },
                                            })}
                                            className={cx("input")}
                                            placeholder="Enter name"
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
                                                            {categories &&
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
                            <h2 className={cx("form-section-title")}>Vouchers by category</h2>
                        </div>
                        <div className={cx("form-body")}>
                            <Upload title="File uploader vouchers" data={[]} setData={() => {}} />
                            <div className={cx("table-vouchers-by-category")}>
                                <Table pathname="" totalPages={2} currentPage={1} data={[]} onDelete={handleDeleteVoucher} />
                            </div>
                            <div className={cx("buttons-wrapper", "buttons-button")}>
                                <button className={cx("button", "clear-button")} type="button">
                                    Clear
                                </button>
                                <button className={cx("button", "button-add")}>Add</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx("data-vouchers")}>
                        <div className={cx("form-wrapper")}>
                            <div className={cx("form-header")}>
                                <h2 className={cx("form-section-title")}>Data vouchers</h2>
                            </div>
                            <div className={cx("form-body")}>
                                {getVoucherListSuccess && voucherDataResponse.vouchers.length > 0 && (
                                    <div className={cx("table-vouchers-by-category")}>
                                        <Table
                                            pathname="voucher"
                                            totalPages={2}
                                            currentPage={2}
                                            data={voucherDataResponse.vouchers}
                                            onDelete={handleDeleteVoucher}
                                        />
                                    </div>
                                )}

                                {getVoucherListSuccess && (
                                    <div className={cx("buttons-wrapper", "buttons-button")}>
                                        {/* <button className={cx("button", "clear-button")} type="button">
                                            Clear
                                        </button>
                                        <button className={cx("button", "button-add")}>Add</button> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminVoucherPage;
