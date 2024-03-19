"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminVoucher.module.scss";
import Table from "@/components/Table";
import { AddressCardIcon } from "@/components/Icons";

import Card from "@/components/Card";
import { get } from "@/utils/httpRequest";
import Tippy from "@tippyjs/react/headless";
import Image from "next/image";

type Props = {};

const cx = classNames.bind(styles);

const AdminVoucherPage = function ({}: Props) {
    const [vouchers, setVouchers] = useState<any[] | null>(null);
    const [totalPagesVouchers, setTotalPagesVouchers] = useState<number>(1);
    const [currentPageVouchers, setCurrentPageVouchers] = useState<number>(1);
    const [statusVouchers, setStatusVouchers] = useState<string>("FREE");

    useEffect(() => {
        (async function () {
            const { vouchers, totalPage }: any = await get("/voucher", {
                params: {
                    page: currentPageVouchers,
                    status: statusVouchers,
                },
            });
            setVouchers(vouchers);
            setTotalPagesVouchers(totalPage);
        })();
    }, [currentPageVouchers, statusVouchers]);

    return (
        // <div className={cx("wrapper")}>
        //     <div className={cx("header")}>
        //         <Card title="Create Voucher" Icon={AddressCardIcon} type="add" to="/admin/voucher/create" />
        //     </div>
        //     {vouchers?.length ? (
        //         <Table
        //             setCurrentPage={setCurrentPageVouchers}
        //             totalPages={totalPagesVouchers}
        //             currentPage={currentPageVouchers}
        //             pathname="/admin/voucher/edit"
        //             title="Vouchers"
        //             type="Vouchers"
        //             data={vouchers}
        //             setData={setVouchers}
        //             setStatus={setStatusVouchers}
        //         />
        //     ) : null}
        // </div>
        <main className={cx("wrapper")}>
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
                                        <input className={cx("input")} placeholder="Enter name" type="text" />
                                    </span>
                                </label>
                                <label className={cx("field-label")}>
                                    <span className={cx("input-title")}>Price</span>
                                    <span className={cx("input-wrapper")}>
                                        <input className={cx("input")} placeholder="Enter name" type="text" />
                                    </span>
                                </label>
                                <label className={cx("field-label")}>
                                    <span className={cx("input-title")}>Product Link</span>
                                    <span className={cx("input-wrapper")}>
                                        <input className={cx("input")} placeholder="Enter name" type="text" />
                                    </span>
                                </label>
                                <label className={cx("field-label")}>
                                    <span className={cx("input-title")}>Status</span>
                                    <span className={cx("input-wrapper")}>
                                        <input className={cx("input")} placeholder="Enter name" type="text" />
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
                                                            <button className={cx("action")} type="button">
                                                                <span>Category 1</span>
                                                            </button>
                                                            <button className={cx("action")} type="button">
                                                                <span>Category 1</span>
                                                            </button>
                                                            <button className={cx("action")} type="button">
                                                                <span>Category 1</span>
                                                            </button>
                                                            <button className={cx("action")} type="button">
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
                                </label>
                            </div>

                            <div className={cx("buttons-wrapper", "buttons-button")}>
                                <button className={cx("button", "clear-button")} type="button">
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
                            <div className={cx("table-vouchers-by-category")}>
                                {/* <Table totalPages={2} currentPage={2} setStatus={null!} data={accounts} setData={setAccounts} /> */}
                            </div>

                            <div className={cx("buttons-wrapper", "buttons-button")}>
                                <button className={cx("button", "clear-button")} type="button">
                                    Clear
                                </button>
                                <button className={cx("button", "button-add")}>Add</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx("data-vouchers")}>Test</div>
                </div>
            </div>
        </main>
    );
};

export default AdminVoucherPage;

//  <form onSubmit={onSubmit} className={cx("form-vouchers")}>
//      <div className={cx("form-wrapper")}>
//          <div className={cx("form-header")}>
//              <h2 className={cx("form-section-title")}>Vouchers</h2>
//              {false && (
//                  <div className={cx("buttons-wrapper")}>
//                      <button className={cx("button", "cancel-button")}>Cancel</button>
//                      <button className={cx("button", "save-button")}>Save</button>
//                  </div>
//              )}
//          </div>
//          <div className={cx("form-body")}>
//              <div className={cx("form-fields-wrapper")}>
//                  <label className={cx("field-label")}>
//                      <span className={cx("input-title")}>Code</span>
//                      <span className={cx("input-wrapper")}>
//                          <input
//                              {...register("name", {
//                                  required: { value: true, message: "This field is required" },
//                              })}
//                              className={cx("input")}
//                              placeholder="Enter name"
//                              type="text"
//                          />
//                      </span>
//                  </label>
//                  <label className={cx("field-label")}>
//                      <span className={cx("input-title")}>Price</span>
//                      <span className={cx("input-wrapper")}>
//                          <input
//                              {...register("name", {
//                                  required: { value: true, message: "This field is required" },
//                              })}
//                              className={cx("input")}
//                              placeholder="Enter name"
//                              type="text"
//                          />
//                      </span>
//                  </label>
//                  <label className={cx("field-label")}>
//                      <span className={cx("input-title")}>Product Link</span>
//                      <span className={cx("input-wrapper")}>
//                          <input
//                              {...register("name", {
//                                  required: { value: true, message: "This field is required" },
//                              })}
//                              className={cx("input")}
//                              placeholder="Enter name"
//                              type="text"
//                          />
//                      </span>
//                  </label>
//                  <label className={cx("field-label")}>
//                      <span className={cx("input-title")}>Status</span>
//                      <span className={cx("input-wrapper")}>
//                          <input
//                              {...register("name", {
//                                  required: { value: true, message: "This field is required" },
//                              })}
//                              className={cx("input")}
//                              placeholder="Enter name"
//                              type="text"
//                          />
//                      </span>
//                  </label>
//              </div>

//              <div className={cx("buttons-wrapper", "buttons-button")}>
//                  <button className={cx("button", "clear-button")} type="button" onClick={handleClearForm}>
//                      Clear
//                  </button>
//                  <button className={cx("button", "button-add")}>Add</button>
//              </div>
//          </div>
//      </div>
//  </form>;
