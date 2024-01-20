"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface ItemContextProps {
    item?: any[];
    title?: string;
    fetchURL?: string;
}

const ItemContext = createContext<ItemContextProps>({});

export const ItemProvider: React.FC<{ children: ReactNode } & ItemContextProps> = ({ children, ...props }) => {
    return <ItemContext.Provider value={props}>{children}</ItemContext.Provider>;
};

export const useItemContext = () => {
    return useContext(ItemContext);
};
