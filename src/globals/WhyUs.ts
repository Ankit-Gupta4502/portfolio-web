import type { GlobalConfig } from 'payload'

import { iconField } from '@/fields/iconField'

export const WhyUs: GlobalConfig = {
  slug: 'why-us',
  label: 'Why MITHORA?',
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
      defaultValue: "We Don't Just Create Content. We Create Growth Systems.",
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'points',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      defaultValue: [
        {
          icon: 'target',
          title: 'Strategy First',
          description: 'Every campaign starts with a clear objective.',
        },
        {
          icon: 'palette',
          title: 'Creative That Connects',
          description: 'Content designed to capture attention and communicate your brand.',
        },
        {
          icon: 'bar-chart-3',
          title: 'Performance Focused',
          description: 'Campaigns monitored and optimized using data.',
        },
        {
          icon: 'handshake',
          title: 'One Digital Partner',
          description:
            'Strategy, content, advertising, website and lead generation under one roof.',
        },
      ],
      fields: [
        iconField(),
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
