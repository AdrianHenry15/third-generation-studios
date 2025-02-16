import { LockIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const faqType = defineType({
    name: "faq",
    title: "Faqs",
    type: "document",
    icon: LockIcon,
    fields: [
        defineField({
            name: "question",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title",
            },
        }),
        defineField({
            name: "answer",
            type: "text",
        }),
        defineField({
            name: "faqCategories",
            type: "array",
            of: [defineArrayMember({ type: "reference", to: { type: "faqCategory" } })],
        }),
    ],
});
