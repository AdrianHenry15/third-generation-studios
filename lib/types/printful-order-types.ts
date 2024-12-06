export interface PrintfulOrderResponseType {
    code: number;
    paging: PrintfulOrderPagingInfoType;
    result: PrintfulOrderType[];
}

export interface PrintfulOrderPagingInfoType {
    total: number;
    offset: number;
    limit: number;
}

export interface PrintfulOrderType {
    id: number;
    external_id: string;
    store: number;
    status: string;
    shipping: string;
    shipping_service_name: string;
    created: number;
    updated: number;
    recipient: PrintfulOrderRecipientInfoType;
    items: PrintfulOrderItemType[];
    branding_items?: PrintfulOrderItemType[];
    incomplete_items?: PrintfulOrderIncompleteItemType[];
    costs: PrintfulOrderCostsType;
    retail_costs: PrintfulOrderCostsType;
    pricing_breakdown?: PrintfulOrderPricingBreakdownType[];
    shipments?: PrintfulOrderShipmentType[];
    gift?: PrintfulOrderGiftType;
    packing_slip?: PrintfulOrderPackingSlipType;
}

export interface PrintfulOrderRecipientInfoType {
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

export interface PrintfulOrderItemType {
    id: number;
    external_id: string;
    variant_id: number;
    sync_variant_id: number;
    external_variant_id: string;
    warehouse_product_variant_id: number;
    product_template_id: number;
    quantity: number;
    price: string;
    retail_price: string;
    name: string;
    product: PrintfulOrderProductDetailsType;
    files: PrintfulOrderFileDetailsType[];
    options?: PrintfulOrderFileItemOptionType[];
    sku?: string | null;
    discontinued?: boolean;
    out_of_stock?: boolean;
}

export interface PrintfulOrderProductDetailsType {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
}

export interface PrintfulOrderFileDetailsType {
    type: string;
    id: number;
    url: string;
    options?: PrintfulOrderFileItemOptionType[];
    hash: string;
    filename: string;
    mime_type: string;
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

export interface PrintfulOrderFileItemOptionType {
    id: string;
    value: string;
}

export interface PrintfulOrderIncompleteItemType {
    name: string;
    quantity: number;
    sync_variant_id: number;
    external_variant_id: string;
    external_line_item_id: string;
}

export interface PrintfulOrderCostsType {
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

export interface PrintfulOrderPricingBreakdownType {
    customer_pays: string;
    printful_price: string;
    profit: string;
    currency_symbol: string;
}

export interface PrintfulOrderShipmentType {
    id: number;
    carrier: string;
    service: string;
    tracking_number: string | number;
    tracking_url: string;
    created: number;
    ship_date: string;
    shipped_at: number;
    reshipment: boolean;
    items: PrintfulOrderShipmentItemType[];
}

export interface PrintfulOrderShipmentItemType {
    item_id: number;
    quantity: number;
    picked: number;
    printed: number;
}

export interface PrintfulOrderGiftType {
    subject: string;
    message: string;
}

export interface PrintfulOrderPackingSlipType {
    email: string;
    phone: string;
    message: string;
    logo_url: string;
    store_name: string;
    custom_order_id: string;
}
