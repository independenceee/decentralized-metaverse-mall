"use client";

import React, { ReactNode, useState } from "react";
import LucidContext from "@/contexts/components/LucidContext";
import { Blockfrost, Lucid, UTxO } from "lucid-cardano";
import { WalletType } from "@/types/GenericsType";

type Props = {
    children: ReactNode;
};

const LucidProvider = function ({ children }: Props) {
    const [lucid, setLucid] = useState<Lucid>(null!);
    const [wallet, setWallet] = useState<WalletType>(null!);
    const [loading, setLoading] = useState<boolean>(false);

    console.log(process.env.BLOCKFROST_RPC_URL_PREPROD);
    const connectWallet = async function ({ name, api, image }: WalletType) {
        try {
            setLoading(true);
            const lucid: Lucid = await Lucid.new(
                new Blockfrost(process.env.BLOCKFROST_RPC_URL_PREPROD!, process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD!),
                "Preprod",
            );
            lucid.selectWallet(await api());
            const address: string = await lucid.wallet.address();
            const utxos: Array<UTxO> = await lucid.wallet.getUtxos();
            const balance: number = utxos.reduce(function (balance, utxo) {
                return balance + Number(utxo.assets.lovelace) / 1000000;
            }, 0);

            setLucid(lucid);
            setWallet(function (previous: WalletType) {
                return { ...previous, name: name, image: image, address: address, balance: balance };
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const disconnectWallet = async function () {
        try {
            setLucid(null!);
            setWallet(null!);
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
            setLucid(lucid);
            setWallet(function (previous: WalletType) {
                return { ...previous, address: address, balance: balance };
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LucidContext.Provider value={{ lucid, wallet, loading, connectWallet, disconnectWallet, refreshWallet }}>{children}</LucidContext.Provider>
    );
};

export default LucidProvider;