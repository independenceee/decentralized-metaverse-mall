"use client";

import React, { ReactNode } from "react";
import TransactionContext from "@/contexts/components/TransactionContext";
import { Lucid, fromText } from "lucid-cardano";

type Props = {
    children: ReactNode;
};

const TransactionProvider = function ({ children }: Props) {
    const sendNativeTokens = async function ({ lucid }: { lucid: Lucid }) {
        try {
            const policyId = process.env.POLICYID_C2E_TOKEN!;
            const assetName = process.env.ASSETNAME_C2E_TOKEN!;

            const tx = await lucid
                .newTx()
                .payToAddress("addr_test...", { [policyId + fromText(assetName)]: BigInt(1) })
                .complete();

            const signedTx = await tx.sign().complete();

            const txHash = await signedTx.submit();
        } catch (error) {
            console.log(error);
        }
    };

    return <TransactionContext.Provider value={{}}>{children}</TransactionContext.Provider>;
};

export default TransactionProvider;
