import { publicRoutes } from "@/routes/routes";
import classNames from "classnames/bind";
import styles from "../Header.module.scss";
import configs from "@/configs";
import { useState } from "react";

const cx = classNames.bind(styles);
type Props = {};

function HeaderOptions({}: Props) {
    const [activeNavItem, setActiveNavItem] = useState<string>(configs.routes.home);
    const handleClickNavItem = (name: string) => {
        setActiveNavItem(name);
    };

    return (
        <ul className={cx("nav-list")}>
            {publicRoutes.map(function (route, index) {
                return (
                    <li className={cx("nav-item")} key={index}>
                        <a
                            onClick={() => handleClickNavItem(route.redirect)}
                            href={route.redirect}
                            className={cx("nav-item-link", {
                                "nav-item-link-active": activeNavItem === route.redirect,
                            })}
                        >
                            {route.name}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}

export default HeaderOptions;
