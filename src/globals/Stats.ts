import type { GlobalConfig } from 'payload'

export const Stats: GlobalConfig = {
  slug: 'stats',
  label: 'Trust / Quick Stats',
  admin: {
    group: 'Home Page',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      defaultValue: [
        { value: '120+', label: 'Projects Delivered' },
        { value: '15+', label: 'Industries Served' },
        { value: '5M+', label: 'Audience Reached' },
        { value: '6', label: 'Digital Services' },
      ],
      admin: {
        description: 'Use only verified figures.',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
