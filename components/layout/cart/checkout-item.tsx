import { SongType } from "@/lib/types";
import React from "react";

interface ICheckoutItemProps {
    item: SongType;
    removeItem: () => void;
}

const CheckoutItem = (props: ICheckoutItemProps) => {
    return (
        <div key={props.item.id}>
            <p>{props.item.title}</p>
            <p>Price: ${props.item.price}</p>
            <button onClick={() => props.removeItem}>Remove</button>
        </div>
    );
};

export default CheckoutItem;
