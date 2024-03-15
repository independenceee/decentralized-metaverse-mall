import "./globals.scss";
import type { Metadata } from "next";
import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Aos from "@/components/Aos";
import ContextProvider from "@/contexts";
import StoreProvider from "@/redux/provider";

const inner = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Metaverse Mall",
    description:
        "Decentralized Metaverse Mall is more than a place for online shopping, it is a O2O2O destination for communities of positive emotions, unique experiences and can generate value for businesses and partners in the ecosystem",
    twitter: {
        card: "summary_large_image",
    },
};

type Props = {
    children: ReactNode;
};

const RootLayout = function ({ children }: Readonly<Props>) {
    return (
        <html lang="en">
            <Aos />
            <body className={inner.className}>
                <StoreProvider>
                    <ContextProvider>{children}</ContextProvider>
                </StoreProvider>
            </body>
            <Toaster />
        </html>
    );
};

export default RootLayout;
