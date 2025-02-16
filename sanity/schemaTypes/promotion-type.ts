import { SparkleIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const promotionType = defineType({
    name: "promotion",
    title: "Promotions",
    type: "document",
    icon: SparkleIcon,
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
            name: "description",
            title: "Description",
            type: "text",
            description: "A short description of the promotion.",
        }),
        defineField({
            name: "discountPercentage",
            title: "Discount Percentage",
            type: "number",
            validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
            name: "startDate",
            title: "Start Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "endDate",
            title: "End Date",
            type: "datetime",
            validation: (Rule) =>
                Rule.required().custom((endDate, context) => {
                    const startDate = context.document?.startDate;

                    if (typeof endDate !== "string" || typeof startDate !== "string") {
                        return "Start date and end date must be valid date strings.";
                    }

                    return new Date(endDate) >= new Date(startDate)
                        ? true
                        : "End date must be after the start date.";
                }),
        }),
        defineField({
            name: "icon",
            title: "Promotion Icon",
            type: "string",
            options: {
                list: [
                    { title: "Sparkle", value: "sparkle" },
                    { title: "Star", value: "star" },
                    { title: "Discount", value: "discount" },
                    { title: "Gift", value: "gift" },
                ],
            },
            initialValue: "sparkle",
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Upcoming", value: "upcoming" },
                    { title: "Active", value: "active" },
                    { title: "Expired", value: "expired" },
                ],
            },
            initialValue: "upcoming",
        }),
    ],
});
