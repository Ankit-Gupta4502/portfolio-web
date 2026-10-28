import type { GlobalConfig } from 'payload'

export const TestimonialsIntro: GlobalConfig = {
  slug: 'testimonials-intro',
  label: 'Testimonials (intro)',
  admin: {
    group: 'Home Page',
    description: 'The testimonial cards below this are managed in the Testimonials collection.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'What Our Clients Say',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
  ],
}
