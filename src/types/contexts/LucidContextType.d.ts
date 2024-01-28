import { WalletType } from "@/types/GenericsType";
import { Lucid } from "lucid-cardano";

export type LucidContextType = {
    lucid: Lucid;
    setLucid: React.Dispatch<React.SetStateAction<Lucid>>;
};
