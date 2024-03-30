import type { Metadata } from "next";
import React, { ReactNode } from "react";
import PrivateLayout from "@/layouts/PrivateLayout";
import StoreProvider from "@/redux/provider";

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin",
};

type Props = {
    children: ReactNode;
};

const AdminLayout = function ({ children }: Readonly<Props>) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    <PrivateLayout>{children}</PrivateLayout>
                </StoreProvider>
            </body>
        </html>
    );
};

export default AdminLayout;
