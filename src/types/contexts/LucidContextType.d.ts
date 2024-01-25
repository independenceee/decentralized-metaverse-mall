import { WalletType } from "@/types/GenericsType";

export type LucidContextType = {
    lucid: Lucid;
    wallet: WalletType;
    loading: boolean;

    connectWallet: ({ api, name, image }: WalletType) => Promise<void>;
    disconnectWallet: () => Promise<void>;
    refreshWallet: () => Promise<void>;
};
