import { StaticImageData } from "next/image";

export interface PrintfulOrderRecipient {
    name: string;
    address1: string;
    city: string;
    state_code: string;
    country_code: string;
    zip: string;
}

export interface PrintfulOrderFile {
    type: string; // Example: 'front', 'back', etc.
    url: string;
}

export interface PrintfulOrderItem {
    variant_id: number;
    quantity: number;
    files: File[];
}

export interface PrintfulOrderPackingSlip {
    email: string;
    phone: string;
    message: string;
    logo_url: string | StaticImageData;
}

export interface PrintfulOrderRequest {
    recipient: PrintfulOrderRecipient;
    items: PrintfulOrderItem[];
    packing_slip: PrintfulOrderPackingSlip;
}
