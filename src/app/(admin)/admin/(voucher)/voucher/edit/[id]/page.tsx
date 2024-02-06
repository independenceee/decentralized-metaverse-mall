"use client";

import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import { useParams } from "next/navigation";

import styles from "./Edit.module.scss";
import { toast } from "sonner";
import { ChangeEvent, useEffect, useState } from "react";
import { get, patch, post } from "@/utils/httpRequest";
import { VoucherType } from "@/types/GenericsType";

const cx = classNames.bind(styles);

type Props = {};

type Inputs = {
    status: string;
    code: string;
    link: string;
};

function Edit({}: Props) {
    const router: { id: string } = useParams();
    const [voucher, setVoucher] = useState<VoucherType | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm<Inputs>();

    const onSubmit = handleSubmit(
        async (data) => {
            try {
                const result = await patch(`/voucher/${router.id}`, data);
                console.log(result);
                toast(`Edit voucher id ${router.id} successfully`);
                setVoucher(null);
                reset();
            } catch (error) {
                toast(`Server Error!`);
            }
        },

        (errors) => {
            toast(errors.toString());
        },
    );

    useEffect(() => {
        (async function () {
            try {
                const voucher = await get(`/voucher/${router.id}`);
                setVoucher(voucher);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [router.id]);

    console.log("Value: ", getValues());

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target;
        console.log(name, value);
        setVoucher(
            (prev) =>
                ({
                    ...prev,
                    [name]: value,
                } as VoucherType),
        );
    };

    if (!voucher) return;

    return (
        <div>
            <h3 className={cx("page-title")}>Edit Voucher</h3>
            <form onSubmit={onSubmit}>
                <Input
                    name="code"
                    value={voucher.code}
                    register={register}
                    rules={{
                        required: "Code is required",
                    }}
                    placeholder="Voucher code"
                    errorMessage={errors.code?.message}
                    onChange={handleChangeInput}
                />
                <Input
                    value={voucher.link}
                    onChange={handleChangeInput}
                    rules={{
                        required: "Link is required",
                    }}
                    name="link"
                    register={register}
                    placeholder="Voucher link product"
                    errorMessage={errors.link?.message}
                />
                <div className={cx("status-wrapper")}>
                    <select
                        className={cx("select")}
                        value={voucher.status}
                        {...register("status", { required: "Code is required" })}
                        onChange={handleChangeInput}
                    >
                        <option value="FREE" className={cx("option", "free")}>
                            FREE
                        </option>
                        <option value="USED" className={cx("option", "used")}>
                            USED
                        </option>
                    </select>
                    <div className={cx("input-error-message")}>{errors.status?.message}</div>
                </div>

                <Button className={cx("edit-button")}>Edit</Button>
            </form>
        </div>
    );
}

export default Edit;
