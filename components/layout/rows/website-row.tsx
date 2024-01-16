"use client";

import React from "react";

import { WebsiteProjectType } from "@/lib/types";
import WebsiteItem from "../websites/website-item";

interface IWebsiteRowProps {
    item: WebsiteProjectType[];
    name: string;
}

const WebsiteRow = (props: IWebsiteRowProps) => {
    return (
        <section className="bg-black relative text-white flex flex-col h-min-content p-10">
            <h5 className="text-white font-semibold text-3xl">{props.name}</h5>
            <div className="w-full overflow-x-auto">
                <ul className="flex">
                    {props.item.map((project) => (
                        <li
                            key={project.title}
                            className="relative h-[30vh] max-h-[275px] max-w-[450px] flex-none xs:w-[200px] sm:w-[200px] md:w-[250px]"
                        >
                            <WebsiteItem item={project} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default WebsiteRow;
