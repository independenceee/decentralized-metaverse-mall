"use client";

import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("@/contexts/providers/LucidProvider"));
const ModalProvider = lazy(() => import("@/contexts/providers/ModalProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <ModalProvider>
            <LucidProvider>{children}</LucidProvider>
        </ModalProvider>
    );
};

export default ContextProvider;
