"use client";
import classNames from "classnames/bind";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Founder.module.scss";
import Tippy from "@tippyjs/react/headless";
import Link from "next/link";
import FounderCard from "@/layouts/components/Founder";
import { Founder } from "@/redux/api/types";
import images from "@/assets/images";
import Image from "next/image";
import icons from "@/assets/icons";
import {
    useAddFounderMutation,
    useDeleteFounderMutation,
    useGetFounderListQuery,
    useGetFounderQuery,
    useUpdateFounderMutation,
} from "@/redux/api/founders.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "@/layouts/components/Loading";

const cx = classNames.bind(styles);

type FounderFormData = {
    [key in keyof Omit<Founder, "id" | "createdAt" | "updatedAt">]: string;
};

const initialFormData: FounderFormData = {
    image: "",
    description: "",
    facebookLink: "",
    linkedinLink: "",
    rrsLink: "",
    twitterLink: "",
    username: "",
};

const Founder = function () {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");
    const { data: founders, isSuccess: getFounderListSuccess, isLoading: isFounderListLoading } = useGetFounderListQuery();
    const {
        data: founder,
        isSuccess: getFounderSuccess,
        error: getFounderError,
    } = useGetFounderQuery(id || "", {
        skip: !id,
    });

    const [deleteFounder] = useDeleteFounderMutation();
    const [addFounder, { isLoading: isAddFounderLoading }] = useAddFounderMutation();
    const [updateFounder, { isLoading: isUpdateFounderLoading }] = useUpdateFounderMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<FounderFormData>({
        defaultValues: initialFormData,
    });

    const [fileAvatar, setFileAvatar] = useState<File>(null!);
    const [searchResult, setSearchResult] = useState<Founder[] | null>(null);
    const [activeFilter, setActiveFilter] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>("");

    const inputUploadImageRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    useEffect(() => {
        if (founder) {
            setValue("image", founder.image);
            setValue("username", founder.username);
            setValue("description", founder.description);
            setValue("facebookLink", founder.facebookLink);
            setValue("linkedinLink", founder.linkedinLink);
            setValue("rrsLink", founder.rrsLink);
            setValue("twitterLink", founder.twitterLink);
        }
    }, [founder, setValue]);

    const triggerInputFile = function () {
        inputUploadImageRef.current && inputUploadImageRef.current.click();
    };

    const filteredFounders = useMemo(() => {
        if (activeFilter && founders && founders.length > 0) {
            return founders.slice().sort((f1, f2) => f2.username.localeCompare(f1.username));
        }

        return founders;
    }, [activeFilter, founders]);

    const handleChangeSearchText = function (e: React.ChangeEvent<HTMLInputElement>) {
        setSearchResult(() => {
            const searchText = e.target.value;
            if (founders && searchText !== "") {
                return founders.filter(({ username }) => username.toLowerCase().includes(searchText.toLowerCase()));
            }

            return null;
        });
    };

    const handleFilterFounders = function () {
        setActiveFilter((prev) => !prev);
    };

    const handleUploadAvatar = function (e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
            setFileAvatar(file);
            setValue("image", file.name);
        }
    };

    const handleDeleteFounder = function (id: string) {
        deleteFounder(id);
    };

    const onSubmit = handleSubmit(
        (data: FounderFormData) => {
            const formData: FormData = new FormData();
            fileAvatar && formData.append("image", fileAvatar);
            formData.append("description", data.description);
            formData.append("username", data.username);
            formData.append("facebookLink", data.facebookLink);
            formData.append("twitterLink", data.twitterLink);
            formData.append("rrsLink", data.rrsLink);
            formData.append("linkedinLink", data.linkedinLink);

            if (id) {
                updateFounder({ id, body: formData })
                    .unwrap()
                    .then(() => {
                        toast.success("Update founder successfully");
                        reset();
                        setAvatar("");
                        router.push("/admin/founder");
                    })
                    .catch((error) => {
                        toast.warning(JSON.parse(JSON.stringify(error.data.message)));
                    });
            } else {
                addFounder(formData)
                    .unwrap()
                    .then(() => {
                        reset();
                        setAvatar("");
                        toast.success("Add a new founder successfully");
                    })
                    .catch((error) => {
                        toast.warning(JSON.parse(JSON.stringify(error.data.message)));
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
        setAvatar("");

        if (id) {
            router.push("/admin/founder");
        }
    };

    return (
        <main className={cx("wrapper")}>
            <form onSubmit={onSubmit}>
                <div className={cx("form-wrapper")}>
                    <div className={cx("form-header")}>
                        <h2 className={cx("form-section-title")}>Founder</h2>
                        {Boolean(id) && founder && (
                            <div className={cx("buttons-wrapper")}>
                                <button type="button" className={cx("button", "cancel-button")} onClick={handleClearForm}>
                                    Cancel
                                </button>
                                <button className={cx("button", "save-button")} disabled={isUpdateFounderLoading}>
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={cx("form-body")}>
                        <div className={cx("upload-avatar-section")}>
                            <span className={cx("avatar-title")}>Avatar</span>
                            <div className={cx("image-wrapper")}>
                                <Image
                                    className={cx("image")}
                                    src={avatar || (id && founder && `${process.env.PUBLIC_IMAGES_DOMAIN}/founder/${founder?.image}`) || images.user}
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
                                        onChange={handleUploadAvatar}
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
                                        {...register("username", {
                                            required: { value: true, message: "This field is required" },
                                        })}
                                        className={cx("input")}
                                        placeholder="Enter name"
                                        type="text"
                                    />
                                </span>
                            </label>
                            <label className={cx("field-label")}>
                                <span className={cx("input-title")}>Description</span>
                                <span className={cx("input-wrapper")}>
                                    <input
                                        {...register("description", {
                                            required: { value: true, message: "This field is required" },
                                        })}
                                        className={cx("input")}
                                        placeholder="Enter description"
                                        type="text"
                                    />
                                </span>
                            </label>
                        </div>

                        <div className={cx("line-separate")} />

                        <div className={cx("linked-accounts")}>
                            <h3 className={cx("linked-section-title")}>Linked Accounts</h3>
                            <p className={cx("linked-section-sub-title")}>Lorem ipsum dolor sit amet consectetur.</p>
                            <div className={cx("linked-accounts-fields")}>
                                <div className={cx("field-account-wrapper")}>
                                    <div className={cx("social-icon-wrapper")}>
                                        <Image width={48} height={48} src={icons.facebookColor} alt="goggle-logo" />
                                    </div>
                                    <input
                                        type="text"
                                        {...register("facebookLink", {
                                            required: { value: true, message: "This field is required" },
                                        })}
                                        className={cx("input", "linked-account-input")}
                                        placeholder="Facebook Link"
                                    />
                                </div>
                                <div className={cx("field-account-wrapper")}>
                                    <div className={cx("social-icon-wrapper")}>
                                        <Image width={48} height={48} src={icons.twiterColor} alt="goggle-logo" />
                                    </div>
                                    <input
                                        {...register("twitterLink", {
                                            required: { value: true, message: "This field is required" },
                                        })}
                                        type="text"
                                        className={cx("input", "linked-account-input")}
                                        placeholder="Twitter Link"
                                    />
                                </div>
                                <div className={cx("field-account-wrapper")}>
                                    <div className={cx("social-icon-wrapper")}>
                                        <Image width={48} height={48} src={icons.linkedInColor} alt="goggle-logo" />
                                    </div>
                                    <input
                                        {...register("linkedinLink", {
                                            required: { value: true, message: "This field is required" },
                                        })}
                                        type="text"
                                        className={cx("input", "linked-account-input")}
                                        placeholder="Linkedin Link"
                                    />
                                </div>
                                <div className={cx("field-account-wrapper")}>
                                    <div className={cx("social-icon-wrapper")}>
                                        <Image width={32} height={32} src={icons.rssColor} alt="goggle-logo" />
                                    </div>
                                    <input
                                        {...register("rrsLink", {
                                            required: { value: true, message: "This field is required" },
                                        })}
                                        type="text"
                                        className={cx("input", "linked-account-input")}
                                        placeholder="RSS Link"
                                    />
                                </div>
                            </div>
                        </div>
                        {!Boolean(id) && (
                            <div className={cx("buttons-wrapper", "buttons-button")}>
                                <button className={cx("button", "clear-button")} type="button" onClick={handleClearForm}>
                                    Clear
                                </button>
                                <button className={cx("button", "button-add")} disabled={isAddFounderLoading}>
                                    Add
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
            <header className={cx("header")}>
                <div className={cx("header-content-left")}>
                    <h2 className={cx("founder-list-title")}>Founders</h2>
                    <div className={cx("actions")}>
                        <Tippy
                            offset={[0, 0]}
                            placement="bottom-start"
                            interactive
                            render={(attrs) => (
                                <div tabIndex={-1} {...attrs}>
                                    <div className={cx("tippy-wrapper")}>
                                        <div className={cx("tippy-content")}>
                                            <Link className={cx("action", "create-founder-button")} href="/">
                                                <svg
                                                    className={cx("tippy-icon")}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                                </svg>
                                                <span>New Founder</span>
                                            </Link>

                                            <button className={cx("action", "export-founder-button")}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={cx("tippy-icon")}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                    />
                                                </svg>
                                                <span>Export Founders</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        >
                            <button className={cx("chevron-down-button")}>
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
                <div className={cx("header-content-right")}>
                    <label className={cx("label")}>
                        <input className={cx("search-input")} placeholder="Search users..." type="text" onChange={handleChangeSearchText} />
                        <span className={cx("icon-search-wrapper")}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={cx("search-icon")} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z" />
                            </svg>
                        </span>
                    </label>
                    <button
                        className={cx("filter-button", {
                            active: activeFilter,
                        })}
                        onClick={handleFilterFounders}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={cx("filter-icon")} fill="none" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M3 5.109C3 4.496 3.47 4 4.05 4h16.79c.58 0 1.049.496 1.049 1.109 0 .612-.47 1.108-1.05 1.108H4.05C3.47 6.217 3 5.721 3 5.11zM5.798 12.5c0-.612.47-1.109 1.05-1.109H18.04c.58 0 1.05.497 1.05 1.109s-.47 1.109-1.05 1.109H6.848c-.58 0-1.05-.497-1.05-1.109zM9.646 18.783c-.58 0-1.05.496-1.05 1.108 0 .613.47 1.109 1.05 1.109h5.597c.58 0 1.05-.496 1.05-1.109 0-.612-.47-1.108-1.05-1.108H9.646z"
                            />
                        </svg>
                    </button>
                </div>
            </header>
            <section
                className={cx("body", {
                    loading: isFounderListLoading,
                })}
            >
                {getFounderListSuccess && (
                    <>
                        {founders.length > 0 ? (
                            (searchResult || (filteredFounders as Founder[])).map((founder, index) => (
                                <FounderCard onDelete={handleDeleteFounder} founder={founder} key={index} />
                            ))
                        ) : (
                            <span className={cx("no-data-available")}>Empty data</span>
                        )}
                    </>
                )}

                {isFounderListLoading && <Loading />}
            </section>
        </main>
    );
};

export default Founder;
