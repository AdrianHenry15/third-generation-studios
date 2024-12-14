export interface PrintfulOrderResponse {
    id: number;
    external_id: string;
    store: number;
    status: string;
    shipping: string;
    shipping_service_name: string;
    created: number;
    updated: number;
    recipient: PrintfulOrderResponseRecipient;
    items: PrintfulOrderResponseItem[];
    branding_items: PrintfulOrderResponseBrandingItem[];
    incomplete_items: PrintfulOrderResponseIncompleteItem[];
    costs: PrintfulOrderResponseCosts;
    retail_costs: PrintfulOrderResponseRetailCosts;
    pricing_breakdown: PrintfulOrderResponsePricingBreakdown[];
    shipments: PrintfulOrderResponseShipment[];
    gift?: PrintfulOrderResponseGift;
    packing_slip?: PrintfulOrderResponsePackingSlip;
}

export interface PrintfulOrderResponseRecipient {
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
    phone?: string;
    email: string;
    tax_number?: string;
}

export interface PrintfulOrderResponseItem {
    id: number;
    external_id: string;
    variant_id: number;
    sync_variant_id: number;
    external_variant_id?: string;
    warehouse_product_variant_id?: number;
    product_template_id?: number;
    quantity: number;
    price: string;
    retail_price: string;
    name: string;
    product: PrintfulOrderResponseProduct;
    files: PrintfulOrderResponseFile[];
    options: PrintfulOrderResponseOption[];
    sku?: string | null;
    discontinued: boolean;
    out_of_stock: boolean;
}

export interface PrintfulOrderResponseProduct {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
}

export interface PrintfulOrderResponseFile {
    type: string;
    id: number;
    url: string;
    options: PrintfulOrderResponseOption[];
    hash: string;
    filename: string;
    mime_: string;
    size: number;
    width: number;
    height: number;
    dpi: number;
    status: string;
    created: number;
    thumbnail_url: string;
    preview_url: string;
    visible: boolean;
    is_temporary: boolean;
}

export interface PrintfulOrderResponseOption {
    id: string;
    value: string;
}

export interface PrintfulOrderResponseBrandingItem extends PrintfulOrderResponseItem {}

export interface PrintfulOrderResponseIncompleteItem {
    name: string;
    quantity: number;
    sync_variant_id: number;
    external_variant_id: string;
    external_line_item_id: string;
}

export interface PrintfulOrderResponseCosts {
    currency: string;
    subtotal: string;
    discount: string;
    shipping: string;
    digitization: string;
    additional_fee: string;
    fulfillment_fee: string;
    retail_delivery_fee: string;
    tax: string;
    vat: string;
    total: string;
}

export interface PrintfulOrderResponseRetailCosts {
    currency: string;
    subtotal: string;
    discount: string;
    shipping: string;
    tax: string;
    vat: string;
    total: string;
}

export interface PrintfulOrderResponsePricingBreakdown {
    customer_pays: string;
    printful_price: string;
    profit: string;
    currency_symbol: string;
}

export interface PrintfulOrderResponseShipment {
    id: number;
    carrier: string;
    service: string;
    tracking_number: number;
    tracking_url: string;
    created: number;
    ship_date: string;
    shipped_at: number;
    reshipment: boolean;
    items: PrintfulOrderResponseShipmentItem[];
}

export interface PrintfulOrderResponseShipmentItem {
    item_id: number;
    quantity: number;
    picked: number;
    printed: number;
}

export interface PrintfulOrderResponseGift {
    subject: string;
    message: string;
}

export interface PrintfulOrderResponsePackingSlip {
    email: string;
    phone: string;
    message: string;
    logo_url: string;
    store_name: string;
    custom_order_id?: string;
}
