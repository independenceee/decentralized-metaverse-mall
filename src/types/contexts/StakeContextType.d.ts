import { Lucid, TxHash } from "lucid-cardano";

export type StakeContextType = {
    stakeInfomation: any;
    registerStakeKey: ({ lucid, poolId }: { lucid: Lucid; poolId?: string }) => Promise<TxHash>;
    deregisterStakeKey: ({ lucid }: { lucid: Lucid }) => Promise<TxHash>;
    delegateToStakePool: ({ lucid, poolId }: { lucid: Lucid; poolId?: string }) => Promise<TxHash>;
    withdrawRewards: ({ lucid }: { lucid: Lucid }) => Promise<TxHash>;
};
