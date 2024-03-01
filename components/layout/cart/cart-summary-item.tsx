import Image from "next/image";
import React from "react";

interface ICartSummaryItemProps {
    img: any;
    title: string;
    price: number;
}

const CartSummaryItem = (props: ICartSummaryItemProps) => {
    return (
        <div className="flex w-full items-center py-2 px-4 my-4">
            <div className="flex items-center">
                <Image src={props.img} alt="track-img" className="w-10 aspect-square object-cover" />
            </div>
            <div className="flex justify-between items-center w-full">
                <h5 className="text-white ml-2">{props.title}</h5>
                <h5 className="text-white self-end">${props.price.toFixed(2)}</h5>
            </div>
        </div>
    );
};

export default CartSummaryItem;
