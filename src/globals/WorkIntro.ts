import type { GlobalConfig } from 'payload'

export const WorkIntro: GlobalConfig = {
  slug: 'work-intro',
  label: 'Featured Work (intro)',
  admin: {
    group: 'Home Page',
    description: 'The project cards below this are managed in the Work collection.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Featured Work',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: 'A few of the brands we have helped grow.',
    },
  ],
}
