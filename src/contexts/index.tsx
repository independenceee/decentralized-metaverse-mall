"use client";

import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("@/contexts/providers/LucidProvider"));
const ModalProvider = lazy(() => import("@/contexts/providers/ModalProvider"));
const WalletProvider = lazy(() => import("@/contexts/providers/WalletProvider"));
const TransactionProvider = lazy(() => import("@/contexts/providers/TransactionProvider"));
const StakeProvider = lazy(() => import("@/contexts/providers/StakeProvider"));
const AccountProvider = lazy(() => import("@/contexts/providers/AccountProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <ModalProvider>
            <LucidProvider>
                <WalletProvider>
                    <StakeProvider>
                        <TransactionProvider>
                            <AccountProvider>{children}</AccountProvider>
                        </TransactionProvider>
                    </StakeProvider>
                </WalletProvider>
            </LucidProvider>
        </ModalProvider>
    );
};

export default ContextProvider;
