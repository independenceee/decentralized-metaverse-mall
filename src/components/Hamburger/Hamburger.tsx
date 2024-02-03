import classNames from "classnames/bind";
import styles from "./Hamburger.module.scss";

import { useModal } from "@/hooks";
import Menu from "../Menu";

const cx = classNames.bind(styles);

function Hamburger() {
    const { toggle, isShowing } = useModal();
    return (
        <div className={cx("wrapper")}>
            <div className={cx("hamburger")} onClick={toggle} aria-hidden tabIndex={0} role="button">
                <div className={cx("hamburger-inner")}>
                    <div
                        className={cx("hamburger-bar", {
                            "hamburger-bar-active": isShowing,
                        })}
                    />
                </div>
            </div>

            <Menu isShowing={isShowing} toggle={toggle} />
        </div>
    );
}

export default Hamburger;
