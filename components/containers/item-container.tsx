import React from "react";

interface ItemContainerProps {
    children: React.ReactNode;
}

const ItemContainer = (props: ItemContainerProps) => {
    return <div className="flex flex-col relative">{props.children}</div>;
};

export default ItemContainer;
