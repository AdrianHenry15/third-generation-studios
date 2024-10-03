import React from "react";

const SplashImageText = () => {
    return (
        <div className="flex z-50 flex-col w-full justify-center items-center">
            <h5 className="text-white text-8xl font-bold text-center">Studio Commerce</h5>
            <button className="hover:text-gray-500 duration-300 ease-in-out transition-colors py-2 flex items-center justify-center bg-white text-black rounded-full w-[70%] mt-24">
                Get Studio Commerce
            </button>
            <button className="hover:text-gray-500 duration-300 ease-in-out transition-colors py-2 flex items-center justify-center bg-black border-white border-[1px] text-white rounded-full w-[70%] mt-4">
                See All Plans
            </button>
        </div>
    );
};

export default SplashImageText;
