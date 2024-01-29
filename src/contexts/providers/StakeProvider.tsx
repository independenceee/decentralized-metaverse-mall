import React, { ReactNode } from "react";
import StakeContext from "@/contexts/components/StakeContext";
import { Delegation, Lucid, TxComplete, TxHash, TxSigned } from "lucid-cardano";

type Props = {
    children: ReactNode;
};

const StakeProvider = function ({ children }: Props) {
    const registerStakeKey = async function (lucid: Lucid): Promise<TxHash> {
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        const tx: TxComplete = await lucid.newTx().registerStake(rewardAddress!).complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };

    const delegateToStakePool = async function (lucid: Lucid): Promise<TxHash> {
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        const tx: TxComplete = await lucid.newTx().delegateTo(rewardAddress, "poolabc...").complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };

    const withdrawRewards = async function (lucid: Lucid): Promise<TxHash> {
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        const delegation: Delegation = await lucid.wallet.getDelegation();
        console.log(delegation);
        const tx: TxComplete = await lucid.newTx().withdraw(rewardAddress, delegation.rewards).complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };
    return <StakeContext.Provider value={{ registerStakeKey, delegateToStakePool, withdrawRewards }}>{children}</StakeContext.Provider>;
};

export default StakeProvider;
