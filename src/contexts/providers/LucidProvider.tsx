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

    const connectWallet = async function ({ name, api, image }: WalletType) {
        try {
            setLoading(true);
            const lucid: Lucid = await Lucid.new(
                new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodQfe5parraxgP3k0IqDnrptIvZVBejjsS"),
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
