import React, { createContext } from "react";
import { StakeContextType } from "@/types/contexts/StakeContextType";

const StakeContext = createContext<StakeContextType>(null!);

export default StakeContext;
