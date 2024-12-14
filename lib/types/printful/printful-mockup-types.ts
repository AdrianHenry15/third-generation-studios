export interface PrintfulMockupRequest {
    variant_ids: number[]; // Array of variant IDs
    format: string; // File format (e.g., "jpg")
    width: number; // Desired width of the output image
    product_options: Record<string, any>; // Object for product options, can be empty
    option_groups: string[]; // Array of option group strings
    options: string[]; // Array of option strings
    files: PrintfulMockupFile[]; // Array of files to be used in the mockup
    product_template_id: number; // ID of the product template
}

export interface PrintfulMockupFile {
    placement: string; // Placement of the file (e.g., "front")
    image_url: string; // URL of the image file
    position: PrintfulMockupPosition; // Positioning details for the image
    options: PrintfulMockupOption[]; // Array of additional file options
}

export interface PrintfulMockupPosition {
    area_width: number; // Width of the printable area
    area_height: number; // Height of the printable area
    width: number; // Width of the image within the area
    height: number; // Height of the image within the area
    top: number; // Top offset of the image
    left: number; // Left offset of the image
}

export interface PrintfulMockupOption {
    id: string; // Option ID (e.g., "template_type")
    value: string; // Option value (e.g., "native")
}
