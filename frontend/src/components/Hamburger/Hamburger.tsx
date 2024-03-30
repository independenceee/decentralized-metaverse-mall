import classNames from "classnames/bind";
import styles from "./Hamburger.module.scss";

import { useModal } from "@/hooks";
import Menu from "../Menu";
import { memo, useState } from "react";

const cx = classNames.bind(styles);

function Hamburger() {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpenMenu = () => {
        setOpen(true);
    };

    return (
        <>
            <div className={cx("wrapper")} onClick={handleOpenMenu}>
                <div className={cx("hamburger")}>
                    <div className={cx("hamburger-inner")}>
                        <div
                            className={cx("hamburger-bar", {
                                "hamburger-bar-active": open,
                            })}
                        />
                    </div>
                </div>
            </div>
            <Menu setOpen={setOpen} open={open} />
        </>
    );
}

export default memo(Hamburger);
