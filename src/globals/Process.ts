import type { GlobalConfig } from 'payload'

export const Process: GlobalConfig = {
  slug: 'process',
  label: 'Our Process',
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
      defaultValue: 'Our Process',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      defaultValue: [
        {
          number: '01',
          title: 'Discover',
          description: 'Understand the business, audience and goals.',
        },
        {
          number: '02',
          title: 'Strategize',
          description: 'Build the marketing and advertising strategy.',
        },
        {
          number: '03',
          title: 'Create',
          description: 'Develop content, creatives, campaigns and digital assets.',
        },
        {
          number: '04',
          title: 'Launch',
          description: 'Put the strategy into action.',
        },
        {
          number: '05',
          title: 'Optimize',
          description: 'Track performance and continuously improve.',
        },
      ],
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
