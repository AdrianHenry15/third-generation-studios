import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

interface IInputProps {
    inputName: string;
    inputLabel: string;
    placeholder: string;
    control: any;
    errors?: FieldErrors;
    errorRequiredText?: string;
    errorPatternText?: string;
}

const Input = ({ inputName, control, errors, errorRequiredText, errorPatternText, placeholder }: IInputProps) => {
    const InputClass = "border-2 border-gray-400 my-2 p-2 rounded-sm w-full shadow-md";

    return (
        <Controller
            name={inputName}
            control={control}
            defaultValue={""}
            render={({ field }) => (
                <div>
                    <input {...field} className={InputClass} type="text" placeholder={placeholder} />
                    {errors && errors[inputName] && errors[inputName]?.type === "required" && (
                        <p className="text-sm text-red-600 ml-4">{errorRequiredText}</p>
                    )}
                    {errors && errors[inputName] && errors[inputName]?.type === "pattern" && (
                        <p className="text-sm text-red-600 ml-4">{errorPatternText}</p>
                    )}
                </div>
            )}
        ></Controller>
    );
};

export default Input;
