export type PrintfulSyncProductType = {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
};

export type PrintfulProductFileOptionType = {
    id: string;
    value: string;
};

export type PrintfulProductFileType = {
    type: string;
    id: number;
    url: string;
    options: PrintfulProductFileOptionType[];
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

export type PrintfulProductType = {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
};

export type PrintfulSyncVariantOptionType = {
    id: string;
    value: string;
};

export type PrintfulSyncVariantType = {
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
    product: PrintfulProductType;
    files: PrintfulProductFileType[];
    options: PrintfulSyncVariantOptionType[];
    main_category_id: number;
    warehouse_product_id: number;
    warehouse_product_variant_id: number;
    size: string;
    color: string;
    availability_status: string;
};

export type PrintfulProductApiResponse = {
    code: number;
    result: {
        sync_product: PrintfulSyncProductType;
        sync_variants: PrintfulSyncVariantType[];
    };
};
