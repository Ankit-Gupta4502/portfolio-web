import 'dotenv/config'

import { getPayload } from 'payload'
import sharp from 'sharp'

import type { Payload } from 'payload'

import config from './payload.config'

function placeholderSvg({
  width,
  height,
  bg,
  label,
}: {
  width: number
  height: number
  bg: string
  label: string
}) {
  const initial = (label.trim().charAt(0) || '?').toUpperCase()
  const markSize = Math.round(height * 0.62)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="${bg}" />
    <circle cx="${width * 0.86}" cy="${height * 0.12}" r="${height * 0.6}" fill="rgba(255,255,255,0.08)" />
    <circle cx="${width * 0.1}" cy="${height * 1.02}" r="${height * 0.42}" fill="rgba(255,255,255,0.07)" />
    <circle cx="${width * 0.1}" cy="${height * 1.02}" r="${height * 0.42}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
    <text x="${width * 0.08}" y="${height * 0.82}" dominant-baseline="middle"
      font-family="Arial, sans-serif" font-size="${markSize}" font-weight="800"
      fill="rgba(255,255,255,0.16)">${initial}</text>
  </svg>`
}

async function makeImageBuffer(opts: { width: number; height: number; bg: string; label: string }) {
  const svg = placeholderSvg(opts)
  return sharp(Buffer.from(svg)).png().toBuffer()
}

async function createMedia(
  payload: Payload,
  opts: { width: number; height: number; bg: string; label: string; alt: string; filename: string },
) {
  const data = await makeImageBuffer(opts)
  const doc = await payload.create({
    collection: 'media',
    data: { alt: opts.alt },
    file: {
      data,
      mimetype: 'image/png',
      name: opts.filename,
      size: data.length,
    },
  })
  return doc
}

const CARD_COLORS = ['#4C1D95', '#1D4ED8', '#047857', '#B45309', '#BE123C', '#0E7490']

export const seed = async (payload: Payload) => {
  payload.logger.info('Seeding MITHORA demo content...')

  // ---------- Admin user ----------
  const adminEmail = 'admin123@gmail.com'
  const existingAdmin = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
    limit: 1,
  })
  if (existingAdmin.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email: adminEmail, password: 'admin123' },
    })
    payload.logger.info(`Created admin user ${adminEmail}`)
  }

  // ---------- Services ----------
  const existingServices = await payload.find({ collection: 'services', limit: 1 })
  if (existingServices.totalDocs === 0) {
    const services = [
      {
        title: 'Social Media Marketing',
        icon: 'share-2',
        description:
          'Content strategy, reels, posts, engagement and account management.',
      },
      {
        title: 'Meta Advertising',
        icon: 'target',
        description: 'Facebook & Instagram campaigns for awareness, leads and conversions.',
      },
      {
        title: 'Google Ads',
        icon: 'search',
        description: 'Search and performance campaigns for high-intent audiences.',
      },
      {
        title: 'Website Development',
        icon: 'monitor',
        description: 'Modern, responsive websites designed for conversions.',
      },
      {
        title: 'Google Business Profile',
        icon: 'map-pin',
        description: 'Local SEO, profile optimization, posts, photos and reputation management.',
      },
      {
        title: 'Lead Generation',
        icon: 'trending-up',
        description: 'Strategies and campaigns focused on relevant business enquiries.',
      },
    ] as const

    for (const service of services) {
      await payload.create({ collection: 'services', data: service })
    }
    payload.logger.info(`Created ${services.length} services`)
  }

  // ---------- Projects (Featured Work) ----------
  {
    const projects = [
      {
        clientName: 'Hariyali Clinic',
        slug: 'hariyali-clinic',
        industry: 'Healthcare',
        servicesProvided: [{ label: 'Meta Ads' }, { label: 'Google Business Profile' }],
        summary: 'Grew monthly patient enquiries through targeted local Meta campaigns and a revamped Google Business Profile.',
      },
      {
        clientName: 'BrightPath Academy',
        slug: 'brightpath-academy',
        industry: 'Education',
        servicesProvided: [{ label: 'Social Media' }, { label: 'Lead Generation' }],
        summary: 'Built an always-on admissions funnel across Instagram and Facebook that filled two enrollment cycles early.',
      },
      {
        clientName: 'Urban Nest Realty',
        slug: 'urban-nest-realty',
        industry: 'Real Estate',
        servicesProvided: [{ label: 'Google Ads' }, { label: 'Website' }],
        summary: 'Launched a new conversion-focused website and search campaigns that cut cost-per-lead significantly.',
      },
      {
        clientName: 'Zestly Foods',
        slug: 'zestly-foods',
        industry: 'E-commerce',
        servicesProvided: [{ label: 'Meta Ads' }, { label: 'Social Media' }],
        summary: 'Scaled a DTC food brand with creative-led Meta campaigns and consistent organic content.',
      },
      {
        clientName: 'Kapoor & Associates',
        slug: 'kapoor-associates',
        industry: 'Professional Services',
        servicesProvided: [{ label: 'Google Business Profile' }, { label: 'Local SEO' }],
        summary: 'Improved local search visibility, driving a steady stream of consultation enquiries.',
      },
      {
        clientName: 'Cornerstone Cafe',
        slug: 'cornerstone-cafe',
        industry: 'Local Businesses',
        servicesProvided: [{ label: 'Social Media' }, { label: 'Google Business Profile' }],
        summary: 'Turned a single neighborhood cafe into a locally recognized brand with consistent content and reviews.',
      },
    ]

    let createdCount = 0
    for (const [index, project] of projects.entries()) {
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: project.slug } },
        limit: 1,
      })
      if (existing.totalDocs > 0) continue

      const image = await createMedia(payload, {
        width: 1200,
        height: 900,
        bg: CARD_COLORS[index % CARD_COLORS.length],
        label: project.clientName,
        alt: `${project.clientName} project cover`,
        filename: `${project.slug}.png`,
      })

      await payload.create({
        collection: 'projects',
        data: {
          ...project,
          image: image.id,
          featured: true,
        },
      })
      createdCount += 1
    }
    if (createdCount > 0) payload.logger.info(`Created ${createdCount} projects`)
  }

  // ---------- Testimonials ----------
  const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 })
  if (existingTestimonials.totalDocs === 0) {
    const testimonials = [
      {
        clientName: 'Rohan Mehta',
        businessName: 'Hariyali Clinic',
        rating: 5,
        quote:
          'Mithora completely changed how we think about marketing. Enquiries went up and we finally understand where our leads come from.',
      },
      {
        clientName: 'Simran Kaur',
        businessName: 'BrightPath Academy',
        rating: 5,
        quote:
          'Professional, fast, and genuinely invested in our growth. Our admissions pipeline has never looked better.',
      },
      {
        clientName: 'Arjun Nair',
        businessName: 'Urban Nest Realty',
        rating: 5,
        quote:
          'The new website alone paid for itself in the first month. The team is responsive and easy to work with.',
      },
      {
        clientName: 'Priya Sharma',
        businessName: 'Zestly Foods',
        rating: 4,
        quote:
          'Great creative work and solid reporting every month. We always know what is working and what is not.',
      },
    ]

    for (const testimonial of testimonials) {
      await payload.create({ collection: 'testimonials', data: testimonial })
    }
    payload.logger.info(`Created ${testimonials.length} testimonials`)
  }

  // ---------- Insights ----------
  const existingPosts = await payload.find({ collection: 'posts', limit: 1 })
  if (existingPosts.totalDocs === 0) {
    const posts = [
      {
        title: 'Meta Ads for Better Leads',
        slug: 'meta-ads-for-better-leads',
        excerpt: 'How to structure Facebook & Instagram campaigns that generate real business enquiries, not just clicks.',
        category: 'Meta Ads',
        readTime: '4 min read',
      },
      {
        title: 'Building a Strong Google Business Profile',
        slug: 'strong-google-business-profile',
        excerpt: 'The profile optimizations most local businesses miss, and why they quietly cost you customers.',
        category: 'Local SEO',
        readTime: '5 min read',
      },
      {
        title: 'Social Media Mistakes Businesses Should Avoid',
        slug: 'social-media-mistakes-to-avoid',
        excerpt: 'Common pitfalls that keep business pages from turning followers into customers.',
        category: 'Social Media',
        readTime: '6 min read',
      },
    ]

    for (const [index, post] of posts.entries()) {
      const cover = await createMedia(payload, {
        width: 1600,
        height: 1000,
        bg: CARD_COLORS[(index + 2) % CARD_COLORS.length],
        label: post.category,
        alt: `${post.title} cover`,
        filename: `${post.slug}.png`,
      })

      await payload.create({
        collection: 'posts',
        data: {
          ...post,
          coverImage: cover.id,
          publishedDate: new Date().toISOString(),
          content: {
            root: {
              type: 'root',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  direction: 'ltr',
                  children: [
                    {
                      type: 'text',
                      version: 1,
                      text: post.excerpt,
                      format: 0,
                      detail: 0,
                      mode: 'normal',
                      style: '',
                    },
                  ],
                },
              ],
            },
          },
        },
      })
    }
    payload.logger.info(`Created ${posts.length} insights articles`)
  }

  payload.logger.info('MITHORA demo content seeded successfully.')
}

async function main() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  await seed(payload)
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed] failed', err)
  process.exit(1)
})
