import type { GlobalConfig } from 'payload'

import { navItemsField } from '@/fields/linkField'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Header & Footer',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Digital Growth. Real Results.',
    },
    navItemsField('quickLinks', [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/#about' },
      { label: 'Services', href: '/#services' },
      { label: 'Work', href: '/#work' },
      { label: 'Contact', href: '/#contact' },
    ]),
    {
      name: 'servicesLinks',
      type: 'array',
      labels: { singular: 'Service', plural: 'Services' },
      defaultValue: [
        { label: 'Social Media' },
        { label: 'Meta Ads' },
        { label: 'Google Ads' },
        { label: 'Website' },
        { label: 'Local SEO' },
        { label: 'Lead Generation' },
      ],
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'socialLinks',
      type: 'array',
      labels: { singular: 'Social Link', plural: 'Social Links' },
      defaultValue: [
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'youtube', url: 'https://youtube.com' },
      ],
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'X / Twitter', value: 'twitter' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: 'MITHORA. All Rights Reserved.',
      admin: {
        description: 'The current year is added automatically before this text.',
      },
    },
  ],
}
