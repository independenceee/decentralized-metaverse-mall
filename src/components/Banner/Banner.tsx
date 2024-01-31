"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
import Image from "next/image";
import images from "@/assets/images";
import Button from "@/components/Button";
import { StakeContextType } from "@/types/contexts/StakeContextType";
import StakeContext from "@/contexts/components/StakeContext";
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import { TransactionContextType } from "@/types/contexts/TransactionContextType";
import TransactionContext from "@/contexts/components/TransactionContext";

const cx = classNames.bind(styles);

const accounts = [
    {
        walletAddress: "addr_test1qqkput6w6tulutfzv5qfnp92uk26vjwgcc2fvu80nugh0a03nlj0jwsk46wykxth4dxu3fmv9qwj66mwtryrl2v04wus99rf2g",
    },
];

function Banner() {
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { registerStakeKey, withdrawRewards, deregisterStakeKey, delegateToStakePool } = useContext<StakeContextType>(StakeContext);
    const { sendNativeTokens } = useContext<TransactionContextType>(TransactionContext);

    const handleRegisterStakeKey = async function () {
        if (lucid) {
            // const txHashh = await deregisterStakeKey(lucid);
            // const txHash = await delegateToStakePool(lucid, "pool1hsxu3tfj0mfp2ncpg67rj3kywwqvu2p3k0cqr8fz0ghnxjfyy55");
            const txHash = await sendNativeTokens({ lucid: lucid, accounts: accounts });
            console.log(txHash);
        }
    };

    return (
        <section className={cx("banner")}>
            <Image src={images.bannerBackground} alt="cryptoz-background" className={cx("branner-background")} />
            <div className={cx("wrapper")}>
                <div className={cx("banner-inner")}>
                    <div data-aos="fade-left" className={cx("banner-content")}>
                        <h1 className={cx("banner-title")}>
                            <div className={cx("banner-title-up")}>Platform for</div>
                            <div className={cx("banner-title-down")}>The crypto Industry</div>
                        </h1>
                        <div className={cx("banner-intro")}>
                            At vero eos et accusamus et iusto odio ignissimos ducimus qui blanditiis praesentium um deleniti atque corrupti.
                        </div>
                        {/* Button goes here */}
                        <Button onClick={handleRegisterStakeKey} className={cx("banner-button")}>
                            Get started
                        </Button>
                    </div>
                    <div data-aos="fade-right" className={cx("banner-image-wrapper")}>
                        <div className={cx("banner-image-container")}>
                            <Image src={images.bannerImage} alt="cryptoz-image" className={cx("branner-image")} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;
