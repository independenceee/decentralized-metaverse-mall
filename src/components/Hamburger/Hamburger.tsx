import classNames from "classnames/bind";
import styles from "./Hamburger.module.scss";

import { useModal } from "@/hooks";
import Menu from "../Menu";

const cx = classNames.bind(styles);

function Hamburger() {
    const { toggle, isShowing } = useModal();
    console.log("Showing: ", isShowing);
    console.log("Hamburger re-render");
    return (
        <div className={cx("wrapper")} onClick={toggle}>
            <div className={cx("hamburger")}>
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
