import type { GlobalConfig } from 'payload'

export const InsightsIntro: GlobalConfig = {
  slug: 'insights-intro',
  label: 'Insights (intro)',
  admin: {
    group: 'Home Page',
    description: 'The articles below this are managed in the Insights collection.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Ideas. Trends. Digital Growth.',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
  ],
}
