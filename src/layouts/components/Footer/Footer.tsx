import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

type Props = {};

const cx = classNames.bind(styles);

const Footer = function ({}: Props) {
    return (
        <footer className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("footer-bottom")}>
                    <div className="row">
                        <div className="col-md-8">
                            <p className="mb-0">
                                © Cryptoz all Rights Reserved theme by{" "}
                                <a href="https://TemplatesCoder.com/" target="_blank" title="TemplatesCoder">
                                    TemplatesCoder
                                </a>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <div className="social-media">
                                <ul>
                                    <li>
                                        <a href="javascript:void(0)">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">
                                            <i className="fa fa-youtube"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
