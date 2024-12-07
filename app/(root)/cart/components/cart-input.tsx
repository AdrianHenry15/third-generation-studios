import { ICity, IState } from "country-state-city";
import React, { useState } from "react";

interface ICartImageProps {
    type: "text" | "select";
    label: string;
    value: string;
    onTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange?: (e: string) => void;
    placeholder: string;
    options?: IState[] | ICity[];
}

const CartInput = (props: ICartImageProps) => {
    const { label, value, onTextChange, onSelectChange, placeholder, type, options } = props;
    const [filteredOptions, setFilteredOptions] = useState<(IState | ICity)[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const id = label.toLowerCase().split(" ").join("-");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (type === "select" && options) {
            const filtered = options.filter((option) => option.name.toLowerCase().includes(inputValue.toLowerCase()));
            setFilteredOptions(filtered);
            setDropdownVisible(filtered.length > 0);
        }

        if (onTextChange) onTextChange(e);
    };

    const handleOptionSelect = (optionName: string) => {
        if (onSelectChange) onSelectChange(optionName);
        setDropdownVisible(false);
    };

    return (
        <div className="mt-4 relative">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type="text"
                id={id}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-black focus:border-black"
                onFocus={() => setDropdownVisible(true)}
                onBlur={() => setTimeout(() => setDropdownVisible(false), 200)} // Delay to allow selecting an option
            />
            {isDropdownVisible && type === "select" && filteredOptions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto">
                    {filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionSelect(option.name)}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartInput;
