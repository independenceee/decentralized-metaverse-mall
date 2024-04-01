import { LoginResponse } from "@/redux/services/auth.api";
import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";

export const addCredentialsToLS = ({ accessToken, refreshToken }: LoginResponse) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
};

export const removeCredentialsFromLS = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
};
