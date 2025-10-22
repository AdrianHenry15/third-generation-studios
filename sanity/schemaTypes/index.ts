import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blogs/block-content-type";
import { blogCategoryType } from "./blogs/blog-category-type";
import { postType } from "./blogs/post-type";
import { authorType } from "./blogs/author-type";
import { newsletterType } from "./newsletter-type";
import { promotionType } from "./promotion-type";
import { faqCategoryType } from "./faqs/faq-category-type";
import { faqType } from "./faqs/faq-type";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [blockContentType, postType, authorType, newsletterType, promotionType, blogCategoryType, faqCategoryType, faqType],
};
