"use client";

import React, { ReactNode, useEffect, useState } from "react";
import LucidContext from "@/contexts/components/LucidContext";
import { Blockfrost, Lucid, UTxO } from "lucid-cardano";
import { WalletType } from "@/types/GenericsType";

type Props = {
    children: ReactNode;
};

const LucidProvider = function ({ children }: Props) {
    const [lucid, setLucid] = useState<Lucid>(null!);

    return <LucidContext.Provider value={{ lucid, setLucid }}>{children}</LucidContext.Provider>;
};

export default LucidProvider;
