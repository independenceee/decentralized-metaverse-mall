"use client";
import classNames from "classnames/bind";
import React from "react";
import styles from "./Login.module.scss";
import Image from "next/image";
import icons from "@/assets/icons";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/services/auth.api";
import { addCredentialsToLS } from "@/utils/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);

type LoginFormBody = {
    email: string;
    password: string;
};

const initialLoginFormBody: LoginFormBody = {
    email: "nguyenkhanh17112003@gmail.com",
    password: "kh17112003",
};

const Login = function () {
    const [login] = useLoginMutation();
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
            .then((data) => {
                addCredentialsToLS(data);
                router.replace('/admin')
            })
            .catch((e) => {
                toast.error("Login failed!");
            });
    });

    return (
        <section className={cx("wrapper")}>
            {Array(260)
                .fill(0)
                .map((_, index) => (
                    <span key={index} className={cx("box")} />
                ))}
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
                            <input type="submit" className={cx("login-button")} defaultValue="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
