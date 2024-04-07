import { AuthType } from "@/redux/services/types";

export const addCredentialsToLS = ({ tokens, user }: AuthType) => {
    const { accessToken, refreshToken } = tokens;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
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
