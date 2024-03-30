import React, { ReactNode } from "react";
import ModalContext from "@/contexts/components/ModalContext";
import { useModal } from "@/hooks";

type Props = {
    children: ReactNode;
};

const ModalProvider = function ({ children }: Props) {
    const { isShowing: isShowingSidebar, toggle: toggleShowingSidebar } = useModal();
    return <ModalContext.Provider value={{ isShowingSidebar, toggleShowingSidebar }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
