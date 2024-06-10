export interface Founder {
    id: string;
    createdAt: string;
    updatedAt: string;
    username: string;
    description: string;
    image: string;
    facebookLink: string;
    twitterLink: string;
    linkedinLink: string;
    rrsLink: string;
}

export interface VoucherCategory {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    image: string;
    banner?: Banner;
}

export interface Category {
    id: string;
    name: string;
    image: string;
}

export enum VoucherStatus {
    FREE = "FREE",
    USED = "USED",
}

export interface Voucher {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    code: string;
    status: VoucherStatus;
    link: string;
    price: string;
    categoryName: string;
}

export interface RoadmapItem {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    title: string;
    description: string;
    datetime: string;
}

export interface CreateWalletItem {
    numberOfWallet: number;
}

export interface Account {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    walletAddress: string;
    stakeKey?: string;
}

export enum UserRole {
    User = "user",
    Admin = "admin",
}

export interface User {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    role: UserRole | null;
}

export interface AuthType {
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
    user: User;
}

export interface Banner {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    title: string;
    image: string;
    description: string;
    link: string;
    categoryName: string;
}

export interface HotDeal {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    name: string;
    image: string;
}

export interface VoucherQueryConfig {
    status?: VoucherStatus;
    page?: string;
    categoryName?: string;
}

// Define ReturnType

export interface SuccessResponseWithPagination<T> {
    vouchers: T[];
    totalPage: number;
}

export interface Email {
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
}
