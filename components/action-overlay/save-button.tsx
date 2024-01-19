import React, { useState } from "react";

import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const SaveButton = () => {
    const [saved, setSaved] = useState(false);

    return (
        <p onClick={() => setSaved(!saved)}>
            {saved ? (
                <FaBookmark className="absolute top-4 left-11 text-gray-300" />
            ) : (
                <FaRegBookmark className="absolute top-4 left-11 text-gray-300" />
            )}
        </p>
    );
};

export default SaveButton;
