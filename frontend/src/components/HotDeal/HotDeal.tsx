"use client";

import classNames from "classnames/bind";
import React, { useState } from "react";
import styles from "./HotDeal.module.scss";
import Image from "next/image";
import images from "@/assets/images";
import icons from "@/assets/icons";
import { Link } from "react-scroll";
import routes from "@/configs/routes";
import { useGetHotDealListQuery } from "@/redux/services/deals.api";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { addCredentialsToLS } from "@/utils/utils";
import { setCredentials } from "@/redux/features/auth/auth.slice";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/services/auth.api";

const initialLoginFormBody: LoginFormBody = {
    email: "nguyenkhanh17112003@gmail.com",
    password: "kh17112003",
};

type LoginFormBody = {
    email: string;
    password: string;
};
const cx = classNames.bind(styles);

const HotDeal = function () {
    const [open, setOpen] = useState<boolean>(true);

    const { data: hotdeal } = useGetHotDealListQuery();

    const closeHotDeal = function (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        setOpen(false);
    };

    const user = !!useSelector((state: RootState) => state.auth.user);
    const [login, { isSuccess: isLoginSuccess, isLoading: isLoginLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormBody>({
        defaultValues: initialLoginFormBody,
    });

    const onSubmit = handleSubmit((data) => {
        login({
            ...data,
        })
            .unwrap()
            .then((data: any) => {
                addCredentialsToLS({ ...data });
                dispatch(setCredentials({ ...data }));
            });
    });

    return (
        <div
            className={cx("overlay", {
                open,
            })}
        >
            <div className={cx("wrapper")}>
                <div className={cx("signin")}>
                    <div className={cx("content")}>
                        <div>
                            <Image src={icons.loginFormLogo} alt="" width={80} height={80} />
                        </div>
                        <h2 className={cx("form-title")}>Welcome back</h2>
                        <p className={cx("form-subtitle")}>Please sign in to continue</p>
                        <form className={cx("form")} onSubmit={onSubmit}>
                            <div className={cx("input-field")}>
                                <input
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required",
                                        },
                                        pattern: {
                                            value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                                            message: "Email is invalid",
                                        },
                                    })}
                                    className={cx("input")}
                                    type="text"
                                />
                                <span className={cx("label")}>Username</span>
                            </div>
                            <div className={cx("error-message")}>{errors?.email?.message}</div>
                            <div className={cx("input-field")}>
                                <input
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is required",
                                        },
                                        min: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                        max: {
                                            value: 30,
                                            message: "Password must be at most 30 characters",
                                        },
                                    })}
                                    className={cx("input")}
                                    type="password"
                                />
                                <span className={cx("label")}>Password</span>
                            </div>
                            <div className={cx("error-message")}>{errors?.password?.message}</div>
                            <div className={cx("links")}>
                                <button type="button" className={cx("fp-button")}>
                                    Forgot Password
                                </button>
                            </div>
                            <div className={cx("input-field")}>
                                <input disabled={isLoginLoading} type="submit" value={"Login"} className={cx("login-button")} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotDeal;
