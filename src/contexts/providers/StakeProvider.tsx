import React, { ReactNode, useContext, useEffect, useState } from "react";
import StakeContext from "@/contexts/components/StakeContext";
import { Delegation, Lucid, TxComplete, TxHash, TxSigned } from "lucid-cardano";
import { get } from "@/utils/httpRequest";
import { WalletContextType } from "@/types/contexts/WalletContextType";
import WalletContext from "../components/WalletContext";
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "../components/LucidContext";

type Props = {
    children: ReactNode;
};

const StakeProvider = function ({ children }: Props) {
    const { wallet } = useContext<WalletContextType>(WalletContext);
    const { lucid } = useContext<LucidContextType>(LucidContext);

    const [stakeInfomation, setStateInfomation] = useState<any>(null!);

    const registerStakeKey = async function ({ lucid, poolId }: { lucid: Lucid; poolId?: string }): Promise<TxHash> {
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        const tx: TxComplete = await lucid

            .newTx()
            .registerStake(rewardAddress!)
            .delegateTo(rewardAddress, poolId as string)
            .complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };

    const delegateToStakePool = async function ({ lucid, poolId = process.env.VILAI_POOL_ID! }: { lucid: Lucid; poolId?: string }): Promise<TxHash> {
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        const tx: TxComplete = await lucid
            .newTx()
            .delegateTo(rewardAddress, poolId as string)
            .complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };

    const withdrawRewards = async function ({ lucid }: { lucid: Lucid }): Promise<TxHash> {
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        const delegation: Delegation = await lucid.wallet.getDelegation();
        const tx: TxComplete = await lucid.newTx().withdraw(rewardAddress, delegation.rewards).complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };

    const deregisterStakeKey = async function ({ lucid }: { lucid: Lucid }): Promise<TxHash> {
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        console.log(rewardAddress);
        const tx: TxComplete = await lucid.newTx().deregisterStake(rewardAddress).complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };

    useEffect(() => {
        if (wallet?.address) {
            (async function () {
                const { poolId } = await lucid.delegationAt(wallet.stakeKey as string);
                try {
                    if (!poolId) {
                        const txHashRegisterStakeKey = await registerStakeKey({
                            lucid: lucid,
                            poolId: "pool1mvgpsafktxs883p66awp7fplj73cj6j9hqdxzvqw494f7f0v2dp",
                        });
                    }

                    if (poolId === "pool1mvgpsafktxs883p66awp7fplj73cj6j9hqdxzvqw494f7f0v2dp") {
                        const stakeInfomation = await get("/blockfrost/account", {
                            params: { stake_address: wallet.stakeKey as string },
                        });

                        console.log(stakeInfomation);

                        setStateInfomation(stakeInfomation);
                    }
                } catch (error) {
                    console.log(error);
                    // if (!poolId) {
                    //     await delegateToStakePool({
                    //         lucid: lucid,
                    //         poolId: "pool1mvgpsafktxs883p66awp7fplj73cj6j9hqdxzvqw494f7f0v2dp",
                    //     });
                    // }
                }
            })();
        }
    }, [wallet?.address]);

    return (
        <StakeContext.Provider value={{ stakeInfomation, registerStakeKey, delegateToStakePool, withdrawRewards, deregisterStakeKey }}>
            {children}
        </StakeContext.Provider>
    );
};

export default StakeProvider;
