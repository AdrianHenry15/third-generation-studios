import React from "react";

interface ITypeLabelProps {
    type: any;
}

const TypeLabel: React.FC<ITypeLabelProps> = ({ type }) => {
    const getTypeColor = (type: any) => {
        switch (type.toLowerCase()) {
            case "released":
                return "bg-blue-500";
            case "unreleased":
                return "bg-green-500";
            case "remix":
                return "bg-purple-500";
            case "demo":
                return "bg-yellow-500";
            case "work in progress":
                return "bg-orange-500";
            default:
                return "bg-gray-500";
        }
    };

    return <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(type)}`}>{type}</span>;
};

export default TypeLabel;
