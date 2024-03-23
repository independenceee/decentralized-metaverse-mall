"use client";

import React, { useCallback, useEffect, useState } from "react";
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
    usePrefetch,
    useUpdateVoucherMutation,
} from "@/redux/api/vouchers.api";
import Upload from "@/components/Upload";
import { useForm } from "react-hook-form";
import { Category, Voucher, VoucherStatus } from "@/redux/api/types";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { omit } from "lodash";
import Loading from "@/layouts/components/Loading";

const cx = classNames.bind(styles);

type VoucherFormData = Pick<Voucher, "code" | "price" | "status" | "link" | "categoryName">;

const initialVoucherFormData: VoucherFormData = {
    categoryName: "",
    code: "",
    link: "",
    price: "",
    status: VoucherStatus.FREE,
};

const AdminVoucherPage = function () {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();
    const [category, setCategory] = useState<Omit<Category, "image"> | null>(null);
    const [importedVouchers, setImportedVouchers] = useState<any[] | null>(null);
    const { data: categories } = useGetCategoriesQuery();
    const [page, setPage] = useState<number>(1);
    const [hasPrefetchedAll, setHasPrefetchedAll] = useState<boolean>(false);
    console.log(page);
    const { data: voucherDataResponse, isSuccess: getVoucherListSuccess, isLoading: isVoucherListLoading } = useGetVoucherListQuery(page);
    const { data: voucher } = useGetVoucherQuery(id || "", {
        skip: !id,
    });
    const prefetchVoucherPage = usePrefetch("getVoucherList");

    const [addVoucher, { isLoading: isAddVoucherLoading, isSuccess: addVoucherSuccess }] = useAddVoucherMutation();
    const [udpateVoucher, { isLoading: isUpdateVoucherLoading }] = useUpdateVoucherMutation();
    const [deleteVoucher] = useDeleteVoucherMutation();

    const { register, handleSubmit, reset, setValue, getValues, setError, clearErrors } = useForm<VoucherFormData>({
        defaultValues: initialVoucherFormData,
    });

    useEffect(() => {
        if (voucher) {
            setValue("code", voucher.code);
            setValue("price", voucher.price);
            setValue("status", voucher.status);
            setValue("link", voucher.link);
            setValue("categoryName", voucher.categoryName);
            setCategory((prev) => {
                if (categories) {
                    const category = categories.find(({ name }) => voucher.categoryName === name);
                    if (category) return omit(category, ["image"]);
                }
                return prev;
            });
        }
    }, [voucher, setValue, categories]);

    useEffect(() => {
        if (!hasPrefetchedAll) {
            if (getVoucherListSuccess && voucherDataResponse.totalPage > 1) {
                [...new Array(voucherDataResponse.totalPage)].forEach((_, index) => {
                    if (index >= voucherDataResponse.totalPage) return;
                    prefetchVoucherPage(index + 1, {
                        force: true,
                    });
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [voucherDataResponse, getVoucherListSuccess, hasPrefetchedAll, page]);

    const handleChooseCategory = function ({ id, name }: Omit<Category, "image">) {
        setValue("categoryName", name);
        setCategory({ id, name });
        clearErrors("categoryName");
    };

    const onSubmitManualVoucher = handleSubmit(
        (data) => {
            if (data.categoryName === "") {
                setError("categoryName", {
                    message: "Please select category to add vouchers",
                });
                toast.warning("Please select category");
                return;
            }

            if (id) {
                udpateVoucher({ id, body: data })
                    .unwrap()
                    .then((res) => {
                        toast.success(`Updated voucher to category ${category?.name} successfully`);
                        router.push("/admin/voucher");
                    })
                    .then(() => {
                        reset();
                        setCategory(null);
                    })
                    .catch((error) => {
                        console.log(error);
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
                if (firstInputName === "status") {
                    toast.warning(errors["status"]?.message);
                } else {
                    toast.warning(`${firstInputName} is required`);
                }
            }
        },
    );

    const onSubmitImportedVoucher = function () {
        if (importedVouchers && importedVouchers.length > 0) {
            const definedImportedVouchers = importedVouchers.map((voucher: Omit<Voucher, "categoryName"> & { category: string }) => ({
                code: voucher.code,
                status: voucher.status,
                link: voucher.link,
                price: voucher.price.toString(),
                categoryName: voucher.category,
            }));

            addVoucher([...definedImportedVouchers])
                .unwrap()
                .then((res) => {
                    console.log(res);
                    toast.success("Add imported vouchers successfully");
                    setImportedVouchers(null);
                })
                .catch(() => {
                    toast.error("There was an error to add the imported vouchers");
                });
        }
    };

    const handleClearForm = function () {
        reset();
        setCategory(null);
        if (id) {
            router.push("/admin/voucher");
        }
    };

    const handleDeleteVoucher = function (id: string) {
        deleteVoucher(id)
            .unwrap()
            .then(() => {
                toast.success(`Deleted voucher successfully`);
                if (voucherDataResponse && voucherDataResponse.totalPage > 0 && voucherDataResponse.vouchers.length === 1) {
                    setPage((prevPage) => {
                        if (prevPage <= 1) {
                            return 1;
                        }
                        return prevPage - 1;
                    });
                }
            })
            .catch((error) => {
                toast.error(JSON.parse(JSON.stringify(error?.data?.message)));
            });
    };

    return (
        <main className={cx("wrapper")}>
            <div className={cx("wrapper-inner")}>
                <form className={cx("form-categories")} onSubmit={onSubmitManualVoucher}>
                    <div className={cx("form-wrapper")}>
                        <div className={cx("form-header")}>
                            <h2 className={cx("form-section-title")}>Voucher</h2>
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
                                                pattern: {
                                                    value: /^(FREE|USED)$/,
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
                                    {id ? "Cancel" : "Clear"}
                                </button>
                                <button className={cx("button", "button-add")} disabled={isAddVoucherLoading || isUpdateVoucherLoading}>
                                    {id ? "Save" : "Add"}
                                </button>
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
                            <Upload title="File uploader vouchers" isImported={addVoucherSuccess} setData={setImportedVouchers} />
                            <div className={cx("table-vouchers-by-category")}>
                                <Table
                                    type="IMPORT"
                                    pathname=""
                                    paginate={false}
                                    totalPages={2}
                                    currentPage={1}
                                    data={importedVouchers}
                                    onDelete={() => null}
                                    setCurrentPage={setPage}
                                />
                            </div>
                            {importedVouchers && importedVouchers.length > 0 && (
                                <div className={cx("button-imported-voucher-wrapper", "buttons-button")}>
                                    <button className={cx("button", "button-add")} onClick={onSubmitImportedVoucher}>
                                        Add
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx("data-vouchers")}>
                        <div className={cx("form-wrapper")}>
                            <div className={cx("form-header")}>
                                <h2 className={cx("form-section-title")}>Data vouchers</h2>
                            </div>
                            <div className={cx("form-body")}>
                                {getVoucherListSuccess && (
                                    <div className={cx("table-vouchers-by-category")}>
                                        {voucherDataResponse.vouchers.length > 0 ? (
                                            <Table
                                                type="MANUAL"
                                                pathname="voucher"
                                                totalPages={voucherDataResponse.totalPage}
                                                currentPage={page}
                                                data={voucherDataResponse.vouchers}
                                                onDelete={handleDeleteVoucher}
                                                setCurrentPage={setPage}
                                            />
                                        ) : (
                                            <span className={cx("no-data-available")}>Empty data</span>
                                        )}
                                    </div>
                                )}
                                {isVoucherListLoading && <Loading className={cx("loading-overlay")} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminVoucherPage;
