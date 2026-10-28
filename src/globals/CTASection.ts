import type { GlobalConfig } from 'payload'

import { ctaFields } from '@/fields/linkField'

export const CTASection: GlobalConfig = {
  slug: 'cta-section',
  label: 'Strong CTA Section',
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
      defaultValue: 'Ready to Grow Your Brand?',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: "Let's turn your digital presence into a growth engine.",
    },
    ...ctaFields('primary', 'Primary Button (e.g. Start a Project)'),
    ...ctaFields('secondary', 'Secondary Button (e.g. Talk to Our Team)'),
  ],
}
