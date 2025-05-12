// schemas/product.ts
import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required().max(50),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'productImage',
            title: 'Product Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'productGallery',
            title: 'Product Gallery',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid',
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required().max(500),
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().min(0),
        }),
        defineField({
            name: 'discountPercent',
            title: 'Discount Percentage',
            type: 'number',
            validation: Rule => Rule.min(0).max(100),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'sizes',
            title: 'Available Sizes',
            type: 'array',
            of: [{ type: 'string' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'colors',
            title: 'Available Colors',
            type: 'array',
            of: [{ type: 'string' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
        }),
        defineField({
            name: 'stock',
            title: 'Stock Quantity',
            type: 'number',
            validation: Rule => Rule.required().min(0),
        }),
        defineField({
            name: 'sku',
            title: 'SKU',
            type: 'string',
        }),
        defineField({
            name: 'isNew',
            title: 'Mark as New Arrival',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured Product',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'price',
            media: 'productImage',
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle: `$${subtitle}`,
                media,
            }
        },
    },
})
