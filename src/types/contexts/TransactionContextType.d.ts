import { Lucid, TxHash } from "lucid-cardano";
import { AccountType } from "@/types/GenericsType";

export type TransactionContextType = {
    sendNativeTokens: ({ lucid, accounts }: { lucid: Lucid; accounts: Array<AccountType> }) => Promise<TxHash>;
};
