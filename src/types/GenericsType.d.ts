export type FounderType = {
    id?: string;
    firstName: string;
    lastName: string;
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

export type TimeLineType = {
    id?: string;
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
    api: () => Promise<any> | any;
    checkApi: () => Promise<any> | any;
};

export type AccountType = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;

    walletAddress: string;
    stakeKey?: string;

    email?: string;
    username?: string;
};

export type VoucherType = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;

    code: string;
    status: VoucherStatus;
};

export enum VoucherStatus {
    USED = "USED",
    FREE = "FREE",
}
