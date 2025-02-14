"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface IAuthorizationCheckboxProps {
    inputName: string;
    control: any;
    validationRules?: any;
}

const AuthorizationCheckbox = ({
    inputName,
    control,
    validationRules,
}: IAuthorizationCheckboxProps) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        let timer: any;
        if (error) {
            timer = setTimeout(() => {
                setError(false);
            }, 5000); // Display error for 5 seconds
        }
        return () => clearTimeout(timer);
    }, [error]);
    return (
        <Controller
            rules={validationRules}
            name={inputName}
            control={control}
            defaultValue={true}
            render={({ field }) => (
                <div className="flex flex-col">
                    <div className="flex items-start" onClick={() => setError(true)}>
                        <div className=" flex cursor-not-allowed">
                            <input
                                className="mr-2 pointer-events-none"
                                type="checkbox"
                                {...field}
                                defaultChecked
                                onChange={(e) => {
                                    field.onChange(e.target.checked);
                                    console.log("Checkbox value:", e.target.checked);
                                }}
                            />
                        </div>
                        <label className="text-xs text-zinc-400">
                            By clicking here, you authorize Brite Exterior Services, to reach out to
                            you by call, email, or text in accordance with our
                            <Link
                                target="_blank"
                                className="text-blue-500 ml-1 hover:underline underline-offset-2"
                                href="/privacy-policy"
                            >
                                Privacy Policy
                            </Link>
                            . You can reply "STOP" to opt out at any time.
                        </label>
                    </div>
                    {/* ERROR */}
                    <aside
                        className={`text-red-600 text-xs mt-2 ml-6 ${
                            error ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        You must be authorized to proceed
                    </aside>
                </div>
            )}
        ></Controller>
    );
};

export default AuthorizationCheckbox;
