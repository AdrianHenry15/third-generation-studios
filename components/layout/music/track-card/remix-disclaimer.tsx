"use client";

import { Info } from "lucide-react";
import React from "react";
import RemixDisclaimerModal from "../../../modals/remix-disclaimer-modal";

const RemixDisclaimer = () => {
    const [showRemixDisclaimer, setShowRemixDisclaimer] = React.useState(false);

    {
        /* Remix Disclaimer Modal */
    }
    {
        showRemixDisclaimer && <RemixDisclaimerModal setShowRemixDisclaimer={setShowRemixDisclaimer} />;
    }
    return (
        <button
            type="button"
            aria-label="Remix Information"
            onClick={() => setShowRemixDisclaimer(true)}
            className="absolute top-3 left-10 text-white/80 drop-shadow focus:outline-none hover:text-white transition-colors"
        >
            <Info size={20} />
        </button>
    );
};

export default RemixDisclaimer;
