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