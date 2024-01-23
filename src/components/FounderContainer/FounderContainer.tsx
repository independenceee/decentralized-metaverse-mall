import React from "react";


const cx = classNames.bind(styles);
type Props = {};

const FounderContainer = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <TitleContent title="Services" subTitle="We Translate Your Dream Into Reality" />
                {services.map(function (service, index: number) {
                    return (
                        <ServiceItem
                            key={index}
                            title={service.title}
                            index={index}
                            description={service.description}
                            subTitle={service.subTitle}
                            image={service.image}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FounderContainer;
