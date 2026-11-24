"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function Analytics({ measurementId }: { measurementId: string }) {
    useEffect(() => {
        function recordInquiry() {
            const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void };
            analyticsWindow.gtag?.("event", "generate_lead");
        }
        window.addEventListener("tgs:inquiry-submitted", recordInquiry);
        return () => window.removeEventListener("tgs:inquiry-submitted", recordInquiry);
    }, []);

    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
            <Script id="tgs-ga4" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
                window.gtag = function () { window.dataLayer.push(arguments); };
                window.gtag('js', new Date());
                window.gtag('config', ${JSON.stringify(measurementId)});`}
            </Script>
        </>
    );
}
