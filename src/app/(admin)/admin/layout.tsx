import type { Metadata } from "next";
import React, { ReactNode } from "react";
import PrivateLayout from "@/layouts/PrivateLayout";

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
                <PrivateLayout>{children}</PrivateLayout>
            </body>
        </html>
    );
};

export default AdminLayout;
