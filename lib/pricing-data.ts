import { LicenseDataType, LicenseType } from "./types";

export const WebsitePricingData: LicenseDataType[] = [
    { title: "Basic", price: 250, description: "Online Presence", value: LicenseType.BASIC },
    { title: "Standard", price: 500, description: "More Dynamic", value: LicenseType.STANDARD },
    { title: "Premium", price: 2000, description: "More Sophisticated", value: LicenseType.PREMIUM },
];
