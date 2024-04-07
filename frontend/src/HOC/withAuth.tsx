"use client";

import { values } from "lodash";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

import routes from "@/configs/routes";
import { RootState } from "@/redux/store";

type PrivateRouteType = (typeof routes.private)[keyof typeof routes.private];

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
    const WithAuth = (props: P) => {
        const isAuthenticated = !!useSelector((state: RootState) => state.auth.user);
        const router = useRouter();
        const pathname = usePathname();

        const privateRoutes = useMemo(() => {
            return values(routes.private);
        }, []);

        if (isAuthenticated) {
            router.replace(pathname);
        } else if (!isAuthenticated && privateRoutes.includes(pathname as PrivateRouteType)) {
            redirect("/login");
        }

        useEffect(() => {
            if (isAuthenticated && pathname === "/login") {
                router.push("/admin");
            }
        }, [isAuthenticated, pathname, router]);

        return <Component {...props} />;
    };
    return WithAuth;
};

export default withAuth;