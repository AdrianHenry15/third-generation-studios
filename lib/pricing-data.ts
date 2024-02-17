import { LicenseDataType, LicenseType } from "./types";

export const MusicLicenseData: LicenseDataType[] = [
    { title: "Basic License", price: 10, fileType: "MP3", value: LicenseType.BASIC },
    { title: "Standard License", price: 20, fileType: "MP3", value: LicenseType.STANDARD },
    { title: "Premium License", price: 30, fileType: "WAV", value: LicenseType.PREMIUM },
    // { title: "Premium Plus", price: "50", fileType: "WAV, STEMS, MP3" },
    // { title: "Unlimited", price: "200", fileType: "WAV, STEMS, MP3" },
    // { title: "Exclusive", price: "2000", fileType: "WAV, STEMS, MP3" },
];

export const WebsitePricingData: LicenseDataType[] = [
    { title: "Basic", price: 250, description: "Online Presence", value: LicenseType.BASIC },
    { title: "Standard", price: 500, description: "More Dynamic", value: LicenseType.STANDARD },
    { title: "Premium", price: 2000, description: "More Sophisticated", value: LicenseType.PREMIUM },
];
