import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Insight / Article',
    plural: 'Insights',
  },
  admin: {
    group: 'Home Page',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'updatedAt'],
  },
  orderable: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used in the article URL: /insights/this-slug',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            const base = (data?.title as string) || ''
            return base
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short teaser shown on the Insights card.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'Digital Marketing',
    },
    {
      name: 'readTime',
      type: 'text',
      label: 'Read Time',
      defaultValue: '5 min read',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
