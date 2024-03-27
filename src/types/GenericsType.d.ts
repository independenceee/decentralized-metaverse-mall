import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type TeamType = {
    id?: string;
    username: string;
    description: string;
    image: string;
    facebookLink?: string;
    twitterLink?: string;
    linkedinLink?: string;
    rrsLink?: string;
};

export type ServiceType = {
    id?: string;
    image: string;
    title: string;
    subTitle: string;
    description: string;
};

export type RoadmapType = {
    id?: number;
    title?: string;
    description?: string;
    datetime?: string;
};

export type WalletType = {
    name: string;
    image: string;
    balance?: number;
    address?: string;
    downloadApi?: string;
    stakeKey?: string;
    poolId?: string | null;
    api: () => Promise<any> | any;
    checkApi: () => Promise<any> | any;
};

export type AccountType = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    walletAddress: string;
    stakeKey?: string;
    amount?: number;
};

export type VoucherType = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    code: string;
    status: VoucherStatus;
    link: string;
};

export enum VoucherStatus {
    USED = "USED",
    FREE = "FREE",
}

export type TokenomicType = {
    id: number;
    tokens: number;
    tokenName: string;
    percentage: number;
    forDepartment: string;
};

export type Category = {
    id: number;
    title: string;
    description: string;
    voucherImage: string | StaticImport;
};
