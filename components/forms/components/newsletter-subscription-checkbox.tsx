import React from "react";

interface INewsletterSubscriptionCheckboxProps {
    inputName: string;
    control: any;
}

const NewsletterSubscriptionCheckbox: React.FC<INewsletterSubscriptionCheckboxProps> = ({ inputName, control }) => {
    return (
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                id={inputName}
                {...control.register(inputName)}
                className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor={inputName} className="text-sm text-gray-300 select-none cursor-pointer">
                Subscribe me to the newsletter
            </label>
        </div>
    );
};

export default NewsletterSubscriptionCheckbox;
