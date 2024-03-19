import { VoucherStatus } from "@/types/GenericsType";

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

export interface Category {
    id: string;
    name: string;
    image: string;
}

export interface Voucher {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    code: string;
    status: VoucherStatus;
    link: string;
    price: string;
    categoryId: string;
}

export interface RoadmapItem {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    title: string;
    description: string;
    datetime: string;
}

export interface Account {}

export interface Banner {}

export interface HotDeal {}

// Define ReturnType

export interface SuccessResponseWithPagination<T> {
    vouchers: T[];
    totalPage: number;
}
