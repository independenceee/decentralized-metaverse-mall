import { LoginResponse } from "@/redux/services/auth.api";

export const addCredentialsToLS = ({ accessToken, refreshToken }: LoginResponse) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

export const removeCredentialsFromLS = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const getValueFromLS = (key: string) => {
    if (typeof localStorage !== "undefined") {
        return localStorage.getItem(key);
    }

    return null;
};
