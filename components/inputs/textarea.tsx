import React from "react";
import { Controller } from "react-hook-form";

interface TextareaProps {
    inputName: string;
    inputLabel: string;
    placeholder: string;
    control: any;
    validationRules?: any;
}

const Textarea: React.FC<TextareaProps> = ({
    inputName,
    inputLabel,
    placeholder,
    control,
    validationRules,
}) => {
    return (
        <div className="relative">
            <label 
                htmlFor={inputName}
                className="block text-sm font-medium text-gray-300 mb-1 ml-1"
            >
                {inputLabel}
            </label>
            <Controller
                name={inputName}
                control={control}
                rules={validationRules}
                defaultValue=""
                render={({ field: { onChange, value, name, ref } }) => (
                    <textarea
                        name={name}
                        value={value || ""}
                        onChange={onChange}
                        ref={ref}
                        id={inputName}
                        placeholder={placeholder}
                        rows={4}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500
                                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                   transition-all duration-300 resize-none"
                    />
                )}
            />
        </div>
    );
};

export default Textarea;