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

export interface Account {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    walletAddress: string;
    stakeKey?: string;
}

enum UserRole {
    User,
    Admin,
}

export interface User {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    role: UserRole;
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
