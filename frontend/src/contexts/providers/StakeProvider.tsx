import React, { ReactNode, useContext, useEffect, useState } from "react";
import StakeContext from "@/contexts/components/StakeContext";
import { Delegation, Lucid, TxComplete, TxHash, TxSigned } from "lucid-cardano";
import { get } from "@/utils/httpRequest";
import { WalletContextType } from "@/types/contexts/WalletContextType";
import WalletContext from "../components/WalletContext";
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "../components/LucidContext";
import { Voucher } from "@/redux/services/types";

type Props = {
    children: ReactNode;
};

const StakeProvider = function ({ children }: Props) {
    const { wallet, setWallet } = useContext<WalletContextType>(WalletContext);
    const [stakeInfomation, setStateInfomation] = useState<any>(null!);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [waiting, setWaiting] = useState<boolean>(false);

    const registerStakeKey = async function ({ lucid, poolId }: { lucid: Lucid; poolId?: string }): Promise<TxHash> {
        setWaiting(true);
        const rewardAddress: string = (await lucid.wallet.rewardAddress()) as string;
        const tx: TxComplete = await lucid
            .newTx()
            .registerStake(rewardAddress!)
            .delegateTo(rewardAddress, poolId as string)
            .complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        const success = await lucid.awaitTx(txHash);
        if (success) {
            setWallet(function (previous) {
                return { ...previous, poolId: poolId };
            });
            setWaiting(true);
        }
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
        const tx: TxComplete = await lucid.newTx().deregisterStake(rewardAddress).complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        return txHash;
    };

    useEffect(() => {
        if (wallet?.address) {
            (async function () {
                try {
                    if (wallet?.poolId === "pool1mvgpsafktxs883p66awp7fplj73cj6j9hqdxzvqw494f7f0v2dp") {
                        const stakeInfomation = await get("/blockfrost/account", {
                            params: { stake_address: wallet.stakeKey as string },
                        });

                        setStateInfomation(stakeInfomation);
                    }
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [wallet?.address, wallet?.poolId]);

    useEffect(() => {
        if (wallet?.address) {
            (async function () {
                try {
                    setVouchers(await get(`/voucher/wallet-address?walletAddress=${wallet?.address}`));
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [wallet?.address, wallet?.poolId]);

    return (
        <StakeContext.Provider
            value={{
                stakeInfomation,
                registerStakeKey,
                delegateToStakePool,
                withdrawRewards,
                deregisterStakeKey,
                waiting,
                vouchers,
                setVouchers,
            }}
        >
            {children}
        </StakeContext.Provider>
    );
};

export default StakeProvider;
