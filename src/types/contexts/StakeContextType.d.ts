import { Lucid, TxHash } from "lucid-cardano";

export type StakeContextType = {
    registerStakeKey: (lucid: Lucid) => Promise<TxHash>;
    deregisterStakeKey: (lucid: Lucid) => Promise<TxHash>;
    delegateToStakePool: (lucid: Lucid, pool?: string) => Promise<TxHash>;
    withdrawRewards: (lucid: Lucid) => Promise<TxHash>;
};
