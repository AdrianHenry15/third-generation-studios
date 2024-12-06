export type PrintfulSyncProduct = {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
};

export type PrintfulProductFileOption = {
    id: string;
    value: string;
};

export type PrintfulProductFile = {
    type: string;
    id: number;
    url: string;
    options: PrintfulProductFileOption[];
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
    stitch_count_tier: string;
};

export type PrintfulProduct = {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
};

export type PrintfulSyncVariantOption = {
    id: string;
    value: string;
};

export type PrintfulSyncVariant = {
    id: number;
    external_id: string;
    sync_product_id: number;
    name: string;
    synced: boolean;
    variant_id: number;
    retail_price: string;
    currency: string;
    is_ignored: boolean;
    sku: string;
    product: PrintfulProduct;
    files: PrintfulProductFile[];
    options: PrintfulSyncVariantOption[];
    main_category_id: number;
    warehouse_product_id: number;
    warehouse_product_variant_id: number;
    size: string;
    color: string;
    availability_status: string;
};

export type PrintfulApiResponse = {
    code: number;
    result: {
        sync_product: PrintfulSyncProduct;
        sync_variants: PrintfulSyncVariant[];
    };
};
