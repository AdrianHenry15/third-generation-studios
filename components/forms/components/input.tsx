import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

interface IInputProps {
    inputName: string;
    inputLabel: string;
    placeholder: string;
    control: any;
    errors?: FieldErrors;
    validationRules?: any;
    type?: string;
}

const Input = ({ 
    inputName, 
    inputLabel,
    control, 
    errors, 
    validationRules, 
    placeholder,
    type = "text"
}: IInputProps) => {
    return (
        <Controller
            rules={validationRules}
            name={inputName}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <div className="relative">
                    <label 
                        htmlFor={inputName}
                        className="block text-sm font-medium text-gray-300 mb-1 ml-1"
                    >
                        {inputLabel}
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-green-500/10 blur opacity-0 group-hover:opacity-100 -z-10 transition-opacity"></div>
                        <input 
                            {...field} 
                            id={inputName}
                            type={type}
                            placeholder={placeholder}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500
                                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                      transition-all duration-300"
                        />
                    </div>
                    {errors && errors[inputName] && (
                        <p className="mt-1 text-sm text-red-400 ml-1">
                            {errors[inputName].message?.toString()}
                        </p>
                    )}
                </div>
            )}
        />
    );
};

export default Input;