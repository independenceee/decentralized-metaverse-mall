import { WalletType } from "@/types/GenericsType";

export type WalletContextType = {
    wallet: WalletType;
    setWallet: React.Dispatch<React.SetStateAction<WalletType>>;
    loading: boolean;
    connectWallet: ({ name, api, image }: WalletType) => Promise<void>;
    disconnectWallet: () => Promise<void>;
    refreshWallet: () => Promise<void>;
};
