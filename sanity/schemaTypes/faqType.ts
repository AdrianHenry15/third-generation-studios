import { AddDocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const faqType = defineType({
    name: "category",
    title: "Category",
    type: "document",
    icon: AddDocumentIcon,
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
            name: "categories",
            type: "array",
            of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
        }),
    ],
});
