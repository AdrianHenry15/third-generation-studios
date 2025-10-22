import React from "react";
import { Controller } from "react-hook-form";

interface DropdownProps {
    inputName: string;
    inputLabel: string;
    control: any;
    errors: any;
    options: string[];
    textColor: "light" | "dark";
    onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    inputName,
    textColor,
    inputLabel,
    control,
    errors,
    options,
    onChange,
}) => {
    return (
        <div className="relative">
            <label
                className={`block text-sm font-medium ${
                    textColor === "light" ? "text-gray-300" : "text-gray-700"
                } mb-1 ml-1`}
            >
                {inputLabel}
            </label>
            <Controller
                name={inputName}
                control={control}
                rules={{
                    validate: (value) => value !== "" || `Please select a ${inputLabel.toLowerCase()}`,
                }}
                render={({ field: { onChange: fieldOnChange, value, name, ref } }) => (
                    <div className="relative">
                        <select
                            name={name}
                            value={value || ""}
                            ref={ref}
                            onChange={(e) => {
                                fieldOnChange(e);
                                if (onChange) onChange(e.target.value);
                            }}
                            className="w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white
                                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                       transition-all duration-300"
                        >
                            {options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                )}
            />
            {errors[inputName] && (
                <p className="mt-1 text-sm text-red-400 ml-1">
                    {errors[inputName].message}
                </p>
            )}
        </div>
    );
};

export default Dropdown;