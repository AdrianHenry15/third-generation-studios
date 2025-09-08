"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface IPrivacyPolicyCheckboxProps {
    inputName: string;
    control: any;
    validationRules?: any;
}

const PrivacyPolicyCheckbox = ({ inputName, control, validationRules }: IPrivacyPolicyCheckboxProps) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        let timer: any;
        if (error) {
            timer = setTimeout(() => {
                setError(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [error]);

    return (
        <Controller
            rules={validationRules}
            name={inputName}
            control={control}
            defaultValue={true}
            render={({ field: { onChange, value, name, ref } }) => (
                <div className="flex flex-col">
                    <div className="flex items-start gap-2">
                        <div className="flex h-5 items-center mt-1">
                            <input
                                id={inputName}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-800"
                                name={name}
                                checked={value}
                                ref={ref}
                                onChange={(e) => {
                                    onChange(e.target.checked);
                                    if (!e.target.checked) setError(true);
                                }}
                            />
                        </div>
                        <label htmlFor={inputName} className="text-sm text-gray-400 leading-tight">
                            By submitting this form, you agree to our
                            <Link
                                href="/privacy-policy"
                                target="_blank"
                                className="text-green-400 hover:text-green-300 mx-1 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            and consent to be contacted regarding your inquiry.
                        </label>
                    </div>

                    <div
                        className={`text-red-400 text-xs mt-2 ml-6 transition-opacity duration-300 ${error ? "opacity-100" : "opacity-0"}`}
                    >
                        You must accept the terms to proceed
                    </div>
                </div>
            )}
        />
    );
};

export default PrivacyPolicyCheckbox;
