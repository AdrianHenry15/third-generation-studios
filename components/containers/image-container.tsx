import React from "react";

interface ImageContainerProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const ImageContainer = (props: ImageContainerProps) => {
    return (
        <div onClick={props.onClick} className={`flex justify-center items-center relative`}>
            {props.children}
        </div>
    );
};

export default ImageContainer;
