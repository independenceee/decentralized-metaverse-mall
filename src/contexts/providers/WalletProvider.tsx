"use client";

import React, { ReactNode, useContext, useState } from "react";
import WalletContext from "@/contexts/components/WalletContext";
import { Blockfrost, Lucid, UTxO } from "lucid-cardano";
import { WalletType } from "@/types/GenericsType";
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";

type Props = {
    children: ReactNode;
};

const WalletProvider = function ({ children }: Props) {
    const { lucid, setLucid } = useContext<LucidContextType>(LucidContext);
    const [wallet, setWallet] = useState<WalletType>(null!);
    const [loading, setLoading] = useState<boolean>(false);

    const connectWallet = async function ({ name, api, image }: WalletType) {
        try {
            setLoading(true);
            const lucid: Lucid = await Lucid.new(
                new Blockfrost(process.env.BLOCKFROST_RPC_URL_PREPROD!, process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!),
                "Preprod",
            );
            setLucid(lucid);
            lucid.selectWallet(await api());
            const address: string = await lucid.wallet.address();
            const stakeKey: string = (await lucid.wallet.rewardAddress()) as string;
            const utxos: Array<UTxO> = await lucid.wallet.getUtxos();
            const { poolId } = await lucid.delegationAt(stakeKey as string);
            const balance: number = utxos.reduce(function (balance, utxo) {
                return balance + Number(utxo.assets.lovelace) / 1000000;
            }, 0);

            setWallet(function (previous: WalletType) {
                return {
                    ...previous,
                    name: name,
                    image: image,
                    address: address,
                    balance: balance,
                    stakeKey: stakeKey,
                    poolId: poolId,
                };
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const disconnectWallet = async function () {
        try {
            setWallet(null!);
            setLucid(null!);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshWallet = async function () {
        try {
            setLoading(true);
            const address: string = await lucid.wallet.address();
            const utxos: Array<UTxO> = await lucid.wallet.getUtxos();
            const balance: number = utxos.reduce(function (balance, utxo) {
                return balance + Number(utxo.assets.lovelace) / 1000000;
            }, 0);
            setWallet(function (previous: WalletType) {
                return {
                    ...previous,
                    address: address,
                    balance: balance,
                };
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return <WalletContext.Provider value={{ wallet, loading, connectWallet, disconnectWallet, refreshWallet }}>{children}</WalletContext.Provider>;
};

export default WalletProvider;
