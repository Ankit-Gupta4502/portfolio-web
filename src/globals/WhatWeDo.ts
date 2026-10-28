import type { GlobalConfig } from 'payload'

export const WhatWeDo: GlobalConfig = {
  slug: 'what-we-do',
  label: 'What We Do (intro)',
  admin: {
    group: 'Home Page',
    description: 'The service cards below this are managed in the Services collection.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Everything Your Brand Needs to Grow Online.',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue:
        'From strategy to execution, we handle every digital channel that drives real business growth.',
    },
  ],
}
