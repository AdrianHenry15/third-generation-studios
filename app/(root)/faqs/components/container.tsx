import { FaqType } from "@/lib/types";
import React from "react";
import FAQItem from "./item";

interface IFAQContainerProps {
    title: string;
    items: FaqType[];
    id: string;
}

const FAQContainer = (props: IFAQContainerProps) => {
    const { title, items, id } = props;
    return (
        <div id={id} className="flex flex-col w-full flex-1 px-10 lg:px-32 px">
            <h5 className="text-black text-4xl font-semibold">{title}</h5>
            {items.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
        </div>
    );
};

export default FAQContainer;
