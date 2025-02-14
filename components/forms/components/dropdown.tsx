import React from "react";
import { Controller } from "react-hook-form";

interface DropdownProps {
    inputName: string;
    inputLabel: string;
    control: any;
    errors: any;
    options: string[];
    textColor: "light" | "dark";
    onChange?: (value: string) => void; // Add onChange prop here
}

const Dropdown: React.FC<DropdownProps> = ({
    inputName,
    textColor,
    inputLabel,
    control,
    errors,
    options,
    onChange, // Destructure the onChange prop
}) => {
    return (
        <div className="mb-4">
            <label
                className={`${
                    textColor === "light" ? "text-white" : "text-gray-700"
                } block text-sm font-medium`}
            >
                {inputLabel}
            </label>
            <Controller
                name={inputName}
                control={control}
                rules={{ required: `${inputLabel} is required` }}
                render={({ field }) => (
                    <select
                        {...field}
                        onChange={(e) => {
                            // Call onChange from props when the dropdown value changes
                            field.onChange(e); // Ensure the form control value is updated
                            onChange!(e.target.value); // Trigger the external onChange handler
                        }}
                        className="mt-1 block w-full px-3 py-2  text-gray-700 border-gray-700 border-[1px] bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="">Select an option</option>
                        {options.map((option, index) => (
                            <option className="text-gray-700" key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
            />
            {errors[inputName] && (
                <p className="text-red-500 text-xs mt-1">{errors[inputName].message}</p>
            )}
        </div>
    );
};

export default Dropdown;
