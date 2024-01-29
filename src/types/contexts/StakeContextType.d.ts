import { Lucid, TxHash } from "lucid-cardano";

export type StakeContextType = {
    registerStakeKey: (lucid: Lucid) => Promise<TxHash>;
    delegateToStakePool: (lucid: Lucid) => Promise<TxHash>;
    withdrawRewards: (lucid: Lucid) => Promise<TxHash>;
};
