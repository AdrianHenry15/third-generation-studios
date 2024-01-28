import CreatePageNav from "@/components/layout/create/create-page-nav";
import Image from "next/image";

export default async function CreateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-zinc-700 h-screen text-white">
            <CreatePageNav />
            <div className="flex items-center justify-center h-full">
                {/* {children} */}
                {/* CREATE COMPONENT */}
                <div>
                    {/* COMPONENT NAV */}
                    <div>
                        <h2>Basic Info</h2>
                    </div>
                    {/* MAIN SECTION */}
                    <div>
                        {/* IMAGE */}
                        <div>
                            <Image src={""} alt="upload-image" className="flex flex-1" />
                        </div>
                        {/* INFO SECTION */}
                        <div>
                            {/* INPUT */}
                            {/* GENRE */}
                            {/* TAGS */}
                            {/* DESCRIPTION */}
                            {/* CAPTION */}
                            {/* PRIVACY */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
