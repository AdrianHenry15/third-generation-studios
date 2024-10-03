import React from "react";

interface ISplashIconItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const SplashIconItem = (props: ISplashIconItemProps) => {
    const { icon, title, description } = props;
    return (
        <div className="flex flex-col text-white items-center justify-center py-10">
            <span className="flex mb-4">{icon}</span>
            <h5 className="font-semibold text-xl text-white">{title}</h5>
            <p className="text-white max-w-[257px] text-center mt-2">{description}</p>
        </div>
    );
};

export default SplashIconItem;
