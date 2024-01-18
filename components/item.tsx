import React from "react";
import Image from "next/image";

import ItemContainer from "@/components/containers/item-container";
import ImageContainer from "@/components/containers/image-container";
import ActionOverlay from "@/components/action-overlay";

interface ItemProps {
    title: string;
    img: any;
}

const Item = (props: ItemProps) => {
    return (
        <ItemContainer>
            {/* IMAGE */}
            <ImageContainer>
                <Image
                    className="w-full h-auto max-h-[80px] md:max-h-[130px] xl:max-h-[200px] block object-center object-cover"
                    src={props.img}
                    alt={props.title}
                />
                {/* ACTION OVERLAY */}
                <ActionOverlay />
            </ImageContainer>
            {/* TITLE AND INFO */}
            <p className="text-zinc-300 text-sm w-[80%]">{props.title}</p>
        </ItemContainer>
    );
};

export default Item;
