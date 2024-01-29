"use client";

import React, { ReactNode } from "react";
import TransactionContext from "@/contexts/components/TransactionContext";
import { Lucid, TxHash, TxSigned, fromText } from "lucid-cardano";
import { AccountType } from "@/types/GenericsType";

type Props = {
    children: ReactNode;
};

const TransactionProvider = function ({ children }: Props) {
    const sendNativeTokens = async function ({ lucid, accounts }: { lucid: Lucid; accounts: AccountType[] }): Promise<TxHash> {
        const policyId = process.env.POLICYID_C2E_TOKEN!;
        const assetName = process.env.ASSETNAME_C2E_TOKEN!;

        const tx: any = lucid.newTx();

        accounts.forEach(async function (account) {
            await tx.payToAddress(account.walletAddress, { [policyId + fromText(assetName)]: BigInt(1) });
        });

        tx.complete();

        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: TxHash = await signedTx.submit();
        lucid.awaitTx(txHash);

        return txHash;
    };

    return <TransactionContext.Provider value={{}}>{children}</TransactionContext.Provider>;
};

export default TransactionProvider;
