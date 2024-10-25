import React from "react";

interface ImageContainerProps {
    children: React.ReactNode;
}

const ImageContainer = (props: ImageContainerProps) => {
    return <div className={`flex justify-center items-center relative w-full`}>{props.children}</div>;
};

export default ImageContainer;
