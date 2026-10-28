import { getPayload } from 'payload'

import config from '@/payload.config'

export async function getPayloadClient() {
  const payloadConfig = await config
  return getPayload({ config: payloadConfig })
}

export async function getHomePageData() {
  const payload = await getPayloadClient()

  const [
    header,
    hero,
    stats,
    whatWeDo,
    services,
    whyUs,
    process,
    workIntro,
    projects,
    industries,
    testimonialsIntro,
    testimonials,
    insightsIntro,
    posts,
    ctaSection,
    contact,
    footer,
    siteSettings,
  ] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'hero' }),
    payload.findGlobal({ slug: 'stats' }),
    payload.findGlobal({ slug: 'what-we-do' }),
    payload.find({ collection: 'services', limit: 12, sort: '_order' as string }),
    payload.findGlobal({ slug: 'why-us' }),
    payload.findGlobal({ slug: 'process' }),
    payload.findGlobal({ slug: 'work-intro' }),
    payload.find({
      collection: 'projects',
      limit: 6,
      sort: '_order',
      where: { featured: { equals: true } },
    }),
    payload.findGlobal({ slug: 'industries' }),
    payload.findGlobal({ slug: 'testimonials-intro' }),
    payload.find({ collection: 'testimonials', limit: 8, sort: '_order' as string }),
    payload.findGlobal({ slug: 'insights-intro' }),
    payload.find({ collection: 'posts', limit: 3, sort: '-publishedDate' }),
    payload.findGlobal({ slug: 'cta-section' }),
    payload.findGlobal({ slug: 'contact' }),
    payload.findGlobal({ slug: 'footer' }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  return {
    header,
    hero,
    stats,
    whatWeDo,
    services: services.docs,
    whyUs,
    process,
    workIntro,
    projects: projects.docs,
    industries,
    testimonialsIntro,
    testimonials: testimonials.docs,
    insightsIntro,
    posts: posts.docs,
    ctaSection,
    contact,
    footer,
    siteSettings,
  }
}

export type HomePageData = Awaited<ReturnType<typeof getHomePageData>>
