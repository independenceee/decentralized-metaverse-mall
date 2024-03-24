import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const useQueryString = function () {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams.toString());
    const objectSearchParams = Object.fromEntries(params.entries());

    return {
        pathname,
        searchParams,
        params,
        objectSearchParams,
    };
};

export default useQueryString;
