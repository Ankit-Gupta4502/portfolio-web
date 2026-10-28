import type { CollectionConfig } from 'payload'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: {
    singular: 'Enquiry',
    plural: 'Contact Enquiries',
  },
  admin: {
    group: 'Leads',
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'businessName', 'serviceRequired', 'createdAt'],
    description: 'Enquiries submitted through the website contact form.',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'businessName',
      type: 'text',
      required: true,
      label: 'Business Name',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website (optional)',
    },
    {
      name: 'serviceRequired',
      type: 'text',
      label: 'Service Required',
    },
    {
      name: 'monthlyBudget',
      type: 'text',
      label: 'Monthly Marketing Budget',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
      ],
    },
  ],
}
