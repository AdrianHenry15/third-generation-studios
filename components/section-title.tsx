import React from "react";

interface ISectionTitleProps {
    title: string;
}

const SectionTitle = (props: ISectionTitleProps) => {
    return (
        <div className="py-44 text-center">
            <p className="text-sm text-red-600 font-bold">{props.title}</p>
        </div>
    );
};

export default SectionTitle;
