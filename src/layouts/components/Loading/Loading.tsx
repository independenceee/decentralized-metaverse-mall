import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);
type Props = {
    className?: string;
};

const Loading = function ({ className }: Props) {
    return (
        <div className={cx("loading-overlay", className)}>
            <span className={cx("loading")} />
        </div>
    );
};

export default Loading;
