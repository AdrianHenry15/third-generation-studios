import React from "react";

interface ImageContainerProps {
    children: React.ReactNode;
}

const ImageContainer = (props: ImageContainerProps) => {
    return <div className={`flex justify-center items-center relative`}>{props.children}</div>;
};

export default ImageContainer;
