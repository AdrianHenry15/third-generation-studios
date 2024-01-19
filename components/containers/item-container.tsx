import React from "react";

interface ItemContainerProps {
    children: React.ReactNode;
}

const ItemContainer = (props: ItemContainerProps) => {
    return <div className="flex flex-col relative hover:scale-105 scale-100 transition-transform duration-300">{props.children}</div>;
};

export default ItemContainer;
