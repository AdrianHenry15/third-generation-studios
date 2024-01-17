import React from "react";

interface ImageContainerProps {
    children: React.ReactNode;
    rectangle?: boolean;
    square?: boolean;
    circle?: boolean;
}

const ImageContainer = (props: ImageContainerProps) => {
    const { rectangle, square, circle } = props;
    const SquareClass = square ? "w-[200px] h-[200px]" : "";
    const RectangleClass = rectangle ? "w-[200px] h-[300px]" : "";
    const CircleClass = circle ? "w-[200px] h-[200px] rounded-full" : "";

    return <div className={`${SquareClass} ${RectangleClass} ${CircleClass} relative`}>{props.children}</div>;
};

export default ImageContainer;
