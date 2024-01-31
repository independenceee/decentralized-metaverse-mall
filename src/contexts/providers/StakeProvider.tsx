import React, { ReactNode, useContext, useEffect } from "react";
import StakeContext from "@/contexts/components/StakeContext";
import { Delegation, Lucid, TxComplete, TxHash, TxSigned } from "lucid-cardano";
import { get } from "@/utils/httpRequest";
import { WalletContextType } from "@/types/contexts/WalletContextType";
import WalletContext from "../components/WalletContext";

type Props = {
    children: ReactNode;
};

const StakeProvider = function ({ children }: Props) {
    const { wallet } = useContext<WalletContextType>(WalletContext);

    const registerStakeKey = async function (lucid: Lucid): Promise<TxHash> {
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        const tx: TxComplete = await lucid.newTx().registerStake(rewardAddress!).complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };

    const delegateToStakePool = async function (lucid: Lucid, pool: string = process.env.VILAI_POOL_ID!): Promise<TxHash> {
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        const tx: TxComplete = await lucid.newTx().delegateTo(rewardAddress, pool).complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };

    const withdrawRewards = async function (lucid: Lucid): Promise<TxHash> {
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        const delegation: Delegation = await lucid.wallet.getDelegation();
        const tx: TxComplete = await lucid.newTx().withdraw(rewardAddress, delegation.rewards).complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };

    const deregisterStakeKey = async function (lucid: Lucid): Promise<TxHash> {
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        const tx: TxComplete = await lucid.newTx().deregisterStake(rewardAddress).complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };

    useEffect(() => {
        if (wallet?.address) {
            (async function () {
                try {
                    const account = await get("/blockfrost/account", {
                        params: {
                            stake_address: "stake1u80tspqfz52n9vrnnj3dkrkxw4swpp86ahx8j60z70zc7tstg4cqk",
                        },
                    });
                    console.log(account);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [wallet?.address]);

    return (
        <StakeContext.Provider value={{ registerStakeKey, delegateToStakePool, withdrawRewards, deregisterStakeKey }}>
            {children}
        </StakeContext.Provider>
    );
};

export default StakeProvider;
