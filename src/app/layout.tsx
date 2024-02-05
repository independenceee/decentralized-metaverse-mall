import "./globals.scss";
import type { Metadata } from "next";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";
import Aos from "@/components/Aos";
import ContextProvider from "@/contexts";

export const metadata: Metadata = {
    title: "Metaverse Mall",
    description: "Decentralized Metaverse Mall",
};

type Props = {
    children: ReactNode;
};

const RootLayout = function ({ children }: Readonly<Props>) {
    return (
        <html lang="en">
            <Aos />
            <body>
                <ContextProvider>{children}</ContextProvider>
            </body>
            <Toaster />
        </html>
    );
};

export default RootLayout;
