"use client";

import { LicenseDataType } from "@/lib/types";
import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

interface IDropdownProps {
    inputName: string;
    inputLabel: string;
    control: any;
    errors: FieldErrors;
    options: LicenseDataType[];
    errorText: string;
}

const Dropdown = ({ inputName, inputLabel, options, errorText, control, errors }: IDropdownProps) => {
    const InputClass = "border-2 border-gray-400 my-2 p-2 rounded-sm w-full shadow-md";

    return (
        <div className="py-2 w-full">
            <label className="font-semibold text-lg mb-2 underline">{inputLabel}</label>
            <Controller
                name={inputName}
                control={control}
                defaultValue={options[0].title}
                render={({ field }) => (
                    <select className={`${InputClass} py-4`} {...field}>
                        {options.map((service) => (
                            <option key={service.title} value={service.title}>
                                {service.title}
                            </option>
                        ))}
                    </select>
                )}
            />
            {errors[inputName] && errors[inputName]?.type === "required" && <p className="text-sm text-red-600 ml-4">{errorText}</p>}
        </div>
    );
};

export default Dropdown;
