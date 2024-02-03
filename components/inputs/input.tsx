import React from "react";

interface IInputProps {
    onChange: () => void;
}

const Input = (props: IInputProps) => {
    return <input type="text" onChange={props.onChange} placeholder="Name Your Track" />;
};

export default Input;
