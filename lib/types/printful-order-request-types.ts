// Root  for the entire structure
export interface PrintfulOrderRequest {
    created: Date;
    updated: Date;
    external_id: string;
    shipping: string;
    recipient: PrintfulOrderRequestRecipient;
    items: PrintfulOrderRequestItem[];
    retail_costs: PrintfulOrderRequestRetailCosts;
    gift?: PrintfulOrderRequestGift;
    packing_slip?: PrintfulOrderRequestPackingSlip;
}

// Recipient information
export interface PrintfulOrderRequestRecipient {
    name: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state_code: string;
    state_name: string;
    country_code: string;
    country_name: string;
    zip: string;
    phone: string;
    email: string;
    tax_number?: string;
}

// Individual order item
export interface PrintfulOrderRequestItem {
    id: number;
    external_id: string;
    variant_id: number;
    sync_variant_id: number;
    external_variant_id: string;
    warehouse_product_variant_id: number;
    product_template_id: number;
    external_product_id: string;
    quantity: number;
    price: string;
    retail_price: string;
    name: string;
    product: PrintfulOrderRequestProductDetails;
    files: PrintfulOrderRequestProductFile[];
    options: PrintfulOrderRequestProductOption[];
    sku?: string | null;
    discontinued: boolean;
    out_of_stock: boolean;
}

// Product details
export interface PrintfulOrderRequestProductDetails {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
}

// Product file details
export interface PrintfulOrderRequestProductFile {
    type: string;
    url: string;
    options: PrintfulOrderRequestFileOption[];
    filename: string;
    visible: boolean;
    position: PrintfulOrderRequestFilePosition;
}

// Options for product files
export interface PrintfulOrderRequestFileOption {
    id: string;
    value: string;
}

// Position of file on the product
export interface PrintfulOrderRequestFilePosition {
    area_width: number;
    area_height: number;
    width: number;
    height: number;
    top: number;
    left: number;
    limit_to_print_area: boolean;
}

// Options for order items
export interface PrintfulOrderRequestProductOption {
    id: string;
    value: string;
}

// Retail costs summary
export interface PrintfulOrderRequestRetailCosts {
    currency: string;
    subtotal: string;
    discount: string;
    shipping: string;
    tax: string;
}

// Gift details
export interface PrintfulOrderRequestGift {
    subject: string;
    message: string;
}

// Packing slip details
export interface PrintfulOrderRequestPackingSlip {
    email: string;
    phone: string;
    message: string;
    logo_url?: string;
    store_name?: string;
    custom_order_id?: string;
}
