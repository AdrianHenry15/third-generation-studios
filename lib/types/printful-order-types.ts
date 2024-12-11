export type PrintfulOrderItem = {
    id?: number; // Line item ID
    external_id?: string; // Line item ID from the external system
    variant_id?: number; // Variant ID of the item ordered
    sync_variant_id?: number; // Sync variant ID of the item ordered
    external_variant_id?: string; // External variant ID of the item ordered
    warehouse_product_variant_id?: number; // Warehousing product variant ID of the item ordered
    product_template_id?: number; // Product Template ID to generate printfiles from
    external_product_id?: string; // External Product ID associated with a Product Template
    quantity: number; // Number of items ordered (Limited to 1000 for one item)
    price?: string; // Printful price of the item
    retail_price?: string; // Original retail price to display on the packing slip
    name?: string; // Display name of the item
    product?: ProductVariant; // Short information about the Printful Product and Variant
    files?: File[]; // Array of attached printfiles / preview images
    options?: ItemOption[]; // Array of additional options for this product
    sku?: string; // Product identifier (SKU) from the external system
    discontinued?: boolean; // Whether the item belongs to a discontinued product
    out_of_stock?: boolean; // Whether the item is temporarily unavailable
};

export type ProductVariant = {
    id: number; // Variant ID
    name: string; // Name of the variant
    product_id: number; // ID of the parent product
    image?: string; // Image URL of the variant
};

export type File = {
    type: string; // File type (e.g., preview, source)
    url: string; // URL of the file
    options?: Record<string, string>; // Additional options for the file
};

export type ItemOption = {
    id: string; // Option ID
    value: string; // Value of the option
};
