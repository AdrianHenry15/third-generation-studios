import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/buttons/button";
import { useModalStore } from "@/stores/modal-store";

type NavItem = { name: string; href: string } | { name: string; onClick: () => void };

interface IMobileNavDropdownMenuProps {
    menuRef: React.RefObject<HTMLDivElement | null>;
    navItems: NavItem[];
    isUserIcon: boolean;
}

const MobileNavDropdownMenu = (props: IMobileNavDropdownMenuProps) => {
    const { closeModal, modalType } = useModalStore();
    const { menuRef, navItems, isUserIcon } = props;
    return (
        <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass w-full rounded-b-2xl"
        >
            <div className="px-4 py-4 flex flex-col space-y-4">
                {navItems.map((item) =>
                    "href" in item ? (
                        <Link key={item.name} href={item.href} className="text-gray-300 hover:text-white py-2" onClick={() => closeModal()}>
                            {item.name}
                        </Link>
                    ) : (
                        <button
                            key={item.name}
                            type="button"
                            className="text-left text-gray-300 hover:text-white py-2"
                            onClick={() => {
                                item.onClick();
                                closeModal();
                            }}
                        >
                            {item.name}
                        </button>
                    ),
                )}
                {!isUserIcon && (
                    <Link href="/contact-us" onClick={() => closeModal()}>
                        <Button className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:from-green-500 hover:to-green-700 transition-all duration-300">
                            Get in Touch
                        </Button>
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

export default MobileNavDropdownMenu;
