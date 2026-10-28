import type { GlobalConfig } from 'payload'

import { iconField } from '@/fields/iconField'

export const Industries: GlobalConfig = {
  slug: 'industries',
  label: 'Industries We Serve',
  admin: {
    group: 'Home Page',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Industries We Serve',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      defaultValue: [
        { icon: 'heart-pulse', name: 'Healthcare' },
        { icon: 'graduation-cap', name: 'Education' },
        { icon: 'building-2', name: 'Real Estate' },
        { icon: 'shopping-cart', name: 'E-commerce' },
        { icon: 'briefcase', name: 'Professional Services' },
        { icon: 'store', name: 'Local Businesses' },
      ],
      fields: [
        iconField(),
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
