import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useQueryString = function () {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams.toString());
    const objectSearchParams = Object.fromEntries(params.entries());
    const router = useRouter();
    return {
        router,
        pathname,
        searchParams,
        params,
        objectSearchParams,
    };
};

export default useQueryString;
