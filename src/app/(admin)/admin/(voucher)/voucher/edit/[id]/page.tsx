"use client";

import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import { useParams } from "next/navigation";

import styles from "./Edit.module.scss";
import { toast } from "sonner";

const cx = classNames.bind(styles);

type Props = {};

type Inputs = {
    status: string;
    code: string;
    link: string;
};

function Edit({}: Props) {
    const router: { id: string } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit = handleSubmit(
        (data) => {
            console.log(data);
            // Call API

            // Success will popup a toast
            toast(`Edit voucher id ${router.id} successfully`);
        },

        (errors) => {
            toast(errors.toString());
        },
    );

    return (
        <div>
            <h3 className={cx("page-title")}>Edit Voucher</h3>
            <form onSubmit={onSubmit}>
                <Input
                    name="code"
                    register={register}
                    rules={{
                        required: "Code is required",
                    }}
                    placeholder="Voucher code"
                    errorMessage={errors.code?.message}
                />

                <div className={cx("status-wrapper")}>
                    <select className={cx("select")} {...register("status", { required: "Code is required" })}>
                        <option value="FREE" className={cx("option", "free")}>
                            FREE
                        </option>
                        <option value="USED" className={cx("option", "used")}>
                            USED
                        </option>
                    </select>
                    <div className={cx("input-error-message")}>{errors.status?.message}</div>
                </div>

                <Input
                    rules={{
                        required: "Link is required",
                    }}
                    name="link"
                    register={register}
                    placeholder="Voucher link product"
                    errorMessage={errors.link?.message}
                />
                <Button className={cx("edit-button")}>Edit</Button>
            </form>
        </div>
    );
}

export default Edit;
