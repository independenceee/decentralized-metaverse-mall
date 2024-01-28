"use client";

import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("@/contexts/providers/LucidProvider"));
const ModalProvider = lazy(() => import("@/contexts/providers/ModalProvider"));
const WalletProvider = lazy(() => import("@/contexts/providers/WalletProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <ModalProvider>
            <LucidProvider>
                <WalletProvider>{children}</WalletProvider>
            </LucidProvider>
        </ModalProvider>
    );
};

export default ContextProvider;
