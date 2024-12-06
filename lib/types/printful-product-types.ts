export type PrintfulProductsViewType = {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
};

export type PrintfulProductType = {
    id: number;
    main_category_id: number;
    type: string;
    type_name: string;
    title: string;
    brand: string;
    model: string;
    image: string;
    variant_count: number;
    currency: string;
    files: PrintfulFileType[];
    options: PrintfulOptionType[];
    is_discontinued: boolean;
    avg_fulfillment_time: number;
    description: string;
    techniques: PrintfulTechniqueType[];
    origin_country: string;
};

export type PrintfulFileType = {
    id: string;
    type: string;
    title: string;
    additional_price: string;
    options: PrintfulFileOptionType[];
};

export type PrintfulFileOptionType = {
    id: string;
    type: string;
    title: string;
    additional_price: number;
};

export type PrintfulOptionType = {
    id: string;
    title: string;
    type: string;
    values: Record<string, string>;
    additional_price: string;
    additional_price_breakdown: Record<string, string>;
};

export type PrintfulTechniqueType = {
    key: string;
    display_name: string;
    is_default: boolean;
};

export type PrintfulProductsResponseType = {
    code: number;
    result: PrintfulProductType[];
};
