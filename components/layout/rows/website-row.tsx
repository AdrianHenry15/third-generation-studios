"use client";

import React from "react";

import { WebsiteProjectType } from "@/lib/types";
import WebsiteCard from "../project-cards/website-card";

interface IWebsiteRowProps {
    item: WebsiteProjectType[];
    name: string;
}

const WebsiteRow = (props: IWebsiteRowProps) => {
    return (
        <section className="bg-black relative text-white flex flex-col h-min-content p-10">
            <h5 className="text-white font-semibold text-3xl mb-4">{props.name}</h5>
            <div className="w-full h-[320px] overflow-x-auto pb-6 pt-1 my-14">
                <ul className="flex">
                    {props.item.map((project) => (
                        <li
                            key={project.title}
                            className="relative h-[30vh] max-h-[275px] max-w-[450px] flex-none xs:w-[200px] sm:w-[250px] md:w-[400px]"
                        >
                            <WebsiteCard item={project} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default WebsiteRow;
