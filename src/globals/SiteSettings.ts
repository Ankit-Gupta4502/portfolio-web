import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'SEO & Site Settings',
  admin: {
    group: 'Header & Footer',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
      defaultValue: 'MITHORA — Digital Marketing & Advertising Agency',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      required: true,
      defaultValue:
        'Mithora is a digital marketing & advertising agency helping businesses build stronger brands, reach the right audience and generate quality leads.',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Social Share Image',
    },
  ],
}
