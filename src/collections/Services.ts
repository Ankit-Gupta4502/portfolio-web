import type { CollectionConfig } from 'payload'

import { iconField } from '@/fields/iconField'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services (What We Do)',
  },
  admin: {
    group: 'Home Page',
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'updatedAt'],
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
    iconField(),
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
  ],
}
