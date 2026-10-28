import type { GlobalConfig } from 'payload'

import { navItemsField } from '@/fields/linkField'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header / Navigation',
  admin: {
    group: 'Header & Footer',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'MITHORA',
    },
    navItemsField('navItems', [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/#about' },
      { label: 'Services', href: '/#services' },
      { label: 'Work', href: '/#work' },
      { label: 'Industries', href: '/#industries' },
      { label: 'Insights', href: '/#insights' },
      { label: 'Contact', href: '/#contact' },
    ]),
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: "Let's Talk",
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '/#contact',
    },
  ],
}
