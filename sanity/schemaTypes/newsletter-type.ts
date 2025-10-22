import { PresentationIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const newsletterType = defineType({
    name: "newsletter",
    title: "Newsletters",
    type: "document",
    icon: PresentationIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [
                {
                    type: "block",
                },
                {
                    type: "image",
                    options: { hotspot: true },
                },
            ],
        }),
        defineField({
            name: "subscribers",
            title: "Subscribers",
            type: "array",
            of: [{ type: "email" }],
            description: "List of subscriber emails.",
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Draft", value: "draft" },
                    { title: "Published", value: "published" },
                    { title: "Archived", value: "archived" },
                ],
            },
            initialValue: "draft",
        }),
    ],
});
