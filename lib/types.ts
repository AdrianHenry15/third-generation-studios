export type NavMenuType = {
    title: string;
    link: string;
};

export type WebsiteType = {
    id: string;
    img: any;
    title: string;
    overview: string;
    release_date: string;
    link: string; // Add link property
    backdrop_path: any;
};

export type AvailablePlansType = "Studio Basic" | "Studio Plus" | "Studio Pro" | "Studio Commerce";

export interface PrintfulProductType {
    id: number; // Unique identifier for the product
    name: string; // Product name
    thumbnail_url: string; // URL to the product thumbnail image
    retail_price: string; // Retail price (as a string for currency handling)
    synced: boolean; // Whether the product is synced with a store
    variants: PrintfulVariantType[]; // Array of product variants
}

export interface PrintfulVariantType {
    id: number; // Unique identifier for the variant
    name: string; // Variant name (e.g., "Size M")
    retail_price: string; // Retail price for this variant
    stock: number | null; // Stock quantity (null if not tracked)
}

export interface PrintfulOrderType {
    id?: number; // Optional: Order ID returned by Printful after creation
    external_id?: string; // Optional: Your custom external ID for the order
    recipient: PrintfulRecipientType; // Order recipient information
    items: PrintfulOrderItemType[]; // Array of items in the order
    retail_costs?: PrintfulRetailCostsType; // Optional: Retail costs breakdown
    status?: string; // Optional: Order status (returned by Printful API)
}

export interface PrintfulRecipientType {
    name: string; // Recipient's full name
    address1: string; // First address line
    address2?: string; // Optional: Second address line
    city: string; // City
    state_code: string; // State/region code
    country_code: string; // 2-letter country code
    zip: string; // ZIP or postal code
    phone?: string; // Optional: Phone number
    email?: string; // Optional: Email address
}

export interface PrintfulOrderItemType {
    sync_variant_id: number; // ID of the synced product variant
    quantity: number; // Quantity of the item
    retail_price?: string; // Optional: Custom retail price for this item
    name?: string; // Optional: Custom name for this item
    files?: PrintfulFileType[]; // Optional: Print files (e.g., custom designs)
}

export interface PrintfulFileType {
    id?: number; // Optional: File ID (if saved in Printful library)
    type: string; // File type (e.g., "preview" or "print")
    url: string; // URL to the file
}

export interface PrintfulRetailCostsType {
    subtotal: string; // Subtotal cost
    discount: string; // Discount applied
    shipping: string; // Shipping cost
    tax: string; // Tax applied
    total: string; // Total cost
}
