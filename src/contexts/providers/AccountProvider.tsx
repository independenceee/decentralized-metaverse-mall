"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import AccountContext from "@/contexts/components/AccountContext";
import { WalletContextType } from "@/types/contexts/WalletContextType";
import WalletContext from "@/contexts/components/WalletContext";
import { post } from "@/utils/httpRequest";

type Props = {
    children: ReactNode;
};

const AccountProvider = function ({ children }: Props) {
    const [account, setAccount] = useState<any[] | null>(null!);
    const { wallet } = useContext<WalletContextType>(WalletContext);

    useEffect(() => {
        const fetchAccount = async function () {
            try {
                const account = await post("/account", {
                    walletAddress: wallet.address,
                });

                setAccount(account);
            } catch (error) {
                console.log(error);
            }
        };
        if (wallet?.address) {
            fetchAccount();
        }
    }, [wallet?.address]);

    return <AccountContext.Provider value={{ account }}>{children}</AccountContext.Provider>;
};

export default AccountProvider;
