import React from "react";

interface IButtonProps {
    name: string;
    className?: string;
    icon?: React.ReactNode;
    roundedFull?: boolean;
    altColor?: boolean;
    onClick?: () => void;
    onSubmit?: () => void;
    submit?: boolean;
}

const Button = (props: IButtonProps) => {
    return (
        <button
            onSubmit={props.submit ? props.onSubmit : () => {}}
            type={props.submit ? "submit" : "button"}
            onClick={props.onClick}
            className={`${props.className} ${props.roundedFull ? "rounded-full" : "rounded-lg"} ${
                props.altColor
                    ? "text-black bg-white opacity-50 transition-all duration-300 ease-in-out hover:opacity-100"
                    : "bg-black transition-all duration-300 ease-in-out border-2 border-transparent hover:border-white text-white"
            } flex items-center py-2 px-6 shadow-lg`}
        >
            {props.name}
            {props.icon ? props.icon : null}
        </button>
    );
};

export default Button;
