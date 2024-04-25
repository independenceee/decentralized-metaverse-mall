import classNames from "classnames/bind";
import Link from "next/link";
import styles from "./Button.module.scss";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";

const cx = classNames.bind(styles);

type Props = {
    loading?: boolean;
    to?: string;
    href?: string;
    primary?: boolean;
    outline?: boolean;
    text?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    children: ReactNode;
    className: string;
    LeftIcon?: IconType;
    RightIcon?: IconType;
    onClick?: () => void;
    blank?: boolean;
};

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    LeftIcon,
    RightIcon,
    onClick,
    loading,
    blank = false,
    ...passProps
}: Props) {
    let Component: any = "button";
    const props: any = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith("on") && typeof props[key] === "function") {
                delete props[key];
            }
        });
    }

    if (href) {
        props.href = href;
        Component = Link;
        if (blank) {
            props.target = "_blank";
        }
    }

    const classes = cx("wrapper", {
        [className]: className,
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large,
    });

    return (
        <Component className={classes} {...props}>
            {!loading && LeftIcon && (
                <span className={cx("icon")}>
                    <LeftIcon />
                </span>
            )}
            {loading ? <ClipLoader color={"#fff"} loading={loading} size={18} /> : <span className={cx("title")}>{children}</span>}
            {!loading && RightIcon && (
                <span className={cx("icon")}>
                    <RightIcon />
                </span>
            )}
        </Component>
    );
}

export default Button;
