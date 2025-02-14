import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

interface IInputAltProps {
    inputName: string;
    inputLabel: string;
    placeholder: string;
    control: any;
    errors?: FieldErrors;
    validationRules?: any;
}

const Input = ({ inputName, control, errors, validationRules, placeholder }: IInputAltProps) => {
    const InputClass = "border-2 border-gray-400 my-2 text-black p-2 rounded-sm w-full shadow-md";

    return (
        <Controller
            rules={validationRules}
            name={inputName}
            control={control}
            defaultValue={""}
            render={({ field }) => (
                <div>
                    <input
                        {...field}
                        className={InputClass}
                        type="text"
                        placeholder={placeholder}
                    />
                    {errors && errors[inputName] && (
                        <p className="text-sm text-red-600 ml-4">
                            {errors[inputName].message!.toString()}
                        </p>
                    )}
                </div>
            )}
        ></Controller>
    );
};

export default Input;
