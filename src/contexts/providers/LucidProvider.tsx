"use client";

import React, { ReactNode, useState } from "react";
import LucidContext from "@/contexts/components/LucidContext";

type Props = {
    children: ReactNode;
};

const LucidProvider = function ({ children }: Props) {
    return <LucidContext.Provider value={{}}>{children}</LucidContext.Provider>;
};

export default LucidProvider;
