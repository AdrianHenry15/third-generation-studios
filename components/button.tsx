import React from "react";

interface IButtonProps {
    name: string;
    className?: string;
    icon?: React.ReactNode;
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
            className={`${props.className} font-semibold flex items-center justify-center transition-all cursor-pointer hover:scale-105 duration-300 ease-in-out py-2 rounded-lg px-10`}
        >
            {props.name}
            {props.icon ? props.icon : null}
        </button>
    );
};

export default Button;
