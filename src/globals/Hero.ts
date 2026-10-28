import type { GlobalConfig } from 'payload'

import { ctaFields } from '@/fields/linkField'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero Section',
  admin: {
    group: 'Home Page',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow (small label above headline)',
      defaultValue: 'Digital Marketing & Advertising Agency',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'We Make Brands Grow.',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      required: true,
      defaultValue:
        'Mithora is a digital marketing & advertising agency helping businesses build stronger brands, reach the right audience and generate quality leads.',
    },
    ...ctaFields('primary', 'Primary Button (e.g. Start a Project)'),
    ...ctaFields('secondary', 'Secondary Button (e.g. View Our Work)'),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional background image/texture for the hero section.',
      },
    },
  ],
}
