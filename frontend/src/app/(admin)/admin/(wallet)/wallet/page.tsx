"use client";

import classNames from "classnames/bind";
import React, { useContext, useEffect, useMemo, useState } from "react";
import csvDownload from "json-to-csv-export";
import styles from "./AdminWallet.module.scss";
import { CreateWalletItem, RoadmapItem } from "@/redux/services/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Table from "@/components/Table";
import Loading from "@/layouts/components/Loading";
import { WalletContextType } from "@/types/contexts/WalletContextType";
import WalletContext from "@/contexts/components/WalletContext";
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";

const cx = classNames.bind(styles);

type CreateWalletFormData = Pick<CreateWalletItem, "numberOfWallet">;

const initialCreateWalletFormData: CreateWalletFormData = {
    numberOfWallet: 0,
};

const Wallet = function () {
    const [wallets, setWallets] = useState([]);
    const [numberOfWallet, setNumberOfWallet] = useState("");
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { createWallet, waitingCreateWallet } = useContext<WalletContextType>(WalletContext);

    const {
        register,
        reset,
        formState: { errors },
    } = useForm<CreateWalletFormData>({
        defaultValues: initialCreateWalletFormData,
    });

    const onCreate = async function (event: any) {
        event.preventDefault();
        if (!lucid) {
            toast.error("Connect wallet has been required");
            return;
        }
        setWallets(await createWallet({ numberOfWallet: Number(numberOfWallet) }));
        toast.success("Create wallet successfully");
    };

    const handleClearForm = function () {
        reset();
        setWallets(null!);
    };

    const handleExportToCSV = async function () {
        csvDownload({
            data: wallets,
            filename: "wallets",
            delimiter: ",",
            headers: ["STT", " Wallet Address", "Private Key"],
        });
        setWallets(null!);
    };

    return (
        <main className={cx("wrapper")}>
            <form className={cx("form-roamdap")}>
                <div className={cx("form-wrapper")}>
                    <div className={cx("form-header")}>
                        <h2 className={cx("form-section-title")}>Wallet</h2>
                    </div>
                    <div className={cx("form-body")}>
                        <div className={cx("form-fields-wrapper")}>
                            <label className={cx("field-label")}>
                                <span className={cx("input-title")}>Wallet</span>
                                <span className={cx("input-wrapper")}>
                                    <input
                                        className={cx("input")}
                                        {...register("numberOfWallet", {
                                            required: {
                                                value: true,
                                                message: "Number of wallet is required",
                                            },
                                        })}
                                        onChange={(e) => setNumberOfWallet(e.target.value)}
                                        placeholder="Enter number of wallet"
                                        type="text"
                                    />
                                </span>
                            </label>
                        </div>
                        <div className={cx("buttons-wrapper")}>
                            {wallets && wallets?.length !== 0 ? (
                                <>
                                    <button type="button" className={cx("button", "cancel-button")} onClick={handleClearForm}>
                                        Clear
                                    </button>
                                    <button className={cx("button", "save-button")} onClick={handleExportToCSV}>
                                        Export To Csv
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className={cx("button", "clear-button")} type="button" onClick={handleClearForm}>
                                        Clear
                                    </button>
                                    <button className={cx("button", "button-add")} onClick={onCreate}>
                                        Create Wallet
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            <div className={cx("vouchers-by-category")}>
                <div className={cx("form-wrapper")}>
                    <div className={cx("form-header")}>
                        <h2 className={cx("form-section-title")}>Wallet List</h2>
                    </div>
                    <div className={cx("form-body")}>
                        {wallets && (
                            <>
                                {wallets?.length !== 0 ? (
                                    <>
                                        <div className={cx("table-roadmap-list")}>
                                            <Table
                                                type="MANUAL"
                                                pathname="roadmap"
                                                paginate={false}
                                                onDelete={() => {}}
                                                onUpdate={() => {}}
                                                totalPages={2}
                                                currentPage={2}
                                                data={wallets!}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <span className={cx("data-not-available")}>Empty data</span>
                                )}
                            </>
                        )}

                        {waitingCreateWallet && <Loading className={cx("loading-overlay")} />}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Wallet;
