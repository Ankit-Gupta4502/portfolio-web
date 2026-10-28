import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Work (Featured Projects)',
  },
  admin: {
    group: 'Home Page',
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'industry', 'featured', 'updatedAt'],
  },
  orderable: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used in the case study URL: /work/this-slug',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            const base = (data?.clientName as string) || ''
            return base
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          },
        ],
      },
    },
    {
      name: 'industry',
      type: 'text',
      required: true,
    },
    {
      name: 'servicesProvided',
      type: 'array',
      label: 'Services Provided',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Short Summary (shown on card)',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Only featured projects are shown on the homepage (4–6 recommended).',
      },
    },
    {
      name: 'caseStudy',
      type: 'richText',
      label: 'Case Study Content',
      admin: {
        description: 'Optional. Shown if "View Case Study" links to an on-site page.',
      },
    },
    {
      name: 'caseStudyUrl',
      type: 'text',
      label: 'External Case Study URL (optional)',
      admin: {
        description: 'If set, "View Case Study" links here instead of an on-site page.',
      },
    },
  ],
}
