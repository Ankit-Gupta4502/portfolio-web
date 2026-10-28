import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    group: 'Home Page',
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'businessName', 'rating', 'updatedAt'],
  },
  orderable: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'businessName',
      type: 'text',
      required: true,
      label: 'Business Name',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
  ],
}
