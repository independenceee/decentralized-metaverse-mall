import React, { ReactNode } from "react";
import ModalContext from "@/contexts/components/ModalContext";
import { useModal } from "@/hooks";

type Props = {
    children: ReactNode;
};

const ModalProvider = function ({ children }: Props) {
    const { isShowing: isShowingSidebar, toggle: toggleShowingSidebar } = useModal();
    const { isShowing: isShowingWalletLong, toggle: toggleWalletLong } = useModal();
    return (
        <ModalContext.Provider
            value={{
                isShowingSidebar,
                isShowingWalletLong,
                toggleShowingSidebar,
                toggleWalletLong,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
