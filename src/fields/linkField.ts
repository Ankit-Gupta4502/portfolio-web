import type { Field } from 'payload'

export function navItemsField(name = 'navItems', defaultValue?: Record<string, string>[]): Field {
  return {
    name,
    type: 'array',
    labels: { singular: 'Link', plural: 'Links' },
    ...(defaultValue ? { defaultValue } : {}),
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
      },
      {
        name: 'href',
        type: 'text',
        required: true,
      },
    ],
  }
}

export function ctaFields(prefix: 'primary' | 'secondary', labelName = ''): Field[] {
  const title = labelName || (prefix === 'primary' ? 'Primary Button' : 'Secondary Button')
  return [
    {
      name: `${prefix}CtaLabel`,
      type: 'text',
      label: `${title} Label`,
    },
    {
      name: `${prefix}CtaHref`,
      type: 'text',
      label: `${title} Link`,
    },
  ]
}
