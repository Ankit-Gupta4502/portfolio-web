import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Section',
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
      defaultValue: "Let's Talk About Your Business",
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: 'Tell us a bit about your business and we will get back to you shortly.',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Contact Email (shown on page)',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Contact Phone (shown on page)',
    },
    {
      name: 'serviceOptions',
      type: 'array',
      label: 'Service Required — dropdown options',
      minRows: 1,
      defaultValue: [
        { label: 'Social Media Marketing' },
        { label: 'Meta Advertising' },
        { label: 'Google Ads' },
        { label: 'Website Development' },
        { label: 'Google Business Profile' },
        { label: 'Lead Generation' },
        { label: 'Not sure yet' },
      ],
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'budgetOptions',
      type: 'array',
      label: 'Monthly Marketing Budget — dropdown options',
      minRows: 1,
      defaultValue: [
        { label: 'Under ₹25,000' },
        { label: '₹25,000 – ₹50,000' },
        { label: '₹50,000 – ₹1,00,000' },
        { label: 'Above ₹1,00,000' },
      ],
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: "Thanks! We've received your enquiry and will be in touch within 24 hours.",
    },
    {
      name: 'submitLabel',
      type: 'text',
      defaultValue: 'Send Enquiry',
    },
  ],
}
