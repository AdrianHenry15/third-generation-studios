"use client";

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

interface IBackButtonProps {
    title: string;
    link: string;
}

export default function BackButton(props: IBackButtonProps) {
    const { title, link } = props;

    return (
        <Link
            href={link}
            className="mt-6 py-2 w-min whitespace-nowrap flex items-center text-gray-200 rounded-md hover:text-green-600 transition"
        >
            <FaChevronLeft size={12} className="mr-4" />
            <p>{title}</p>
        </Link>
    );
}
