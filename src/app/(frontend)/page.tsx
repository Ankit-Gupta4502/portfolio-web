import { ContactSection } from '@/components/sections/contact-section'
import { CTASection } from '@/components/sections/cta-section'
import { FeaturedWorkSection } from '@/components/sections/featured-work'
import { HeroSection } from '@/components/sections/hero'
import { IndustriesSection } from '@/components/sections/industries'
import { InsightsSection } from '@/components/sections/insights'
import { ProcessSection } from '@/components/sections/process'
import { StatsSection } from '@/components/sections/stats'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { WhatWeDoSection } from '@/components/sections/what-we-do'
import { WhyUsSection } from '@/components/sections/why-us'
import { getHomePageData } from '@/lib/payload'

export default async function HomePage() {
  const data = await getHomePageData()

  return (
    <>
      <HeroSection hero={data.hero} />
      <StatsSection stats={data.stats} />
      <WhatWeDoSection whatWeDo={data.whatWeDo} services={data.services} />
      <WhyUsSection whyUs={data.whyUs} />
      <ProcessSection process={data.process} />
      <FeaturedWorkSection workIntro={data.workIntro} projects={data.projects} />
      <IndustriesSection industries={data.industries} />
      <TestimonialsSection
        testimonialsIntro={data.testimonialsIntro}
        testimonials={data.testimonials}
      />
      <InsightsSection insightsIntro={data.insightsIntro} posts={data.posts} />
      <CTASection cta={data.ctaSection} />
      <ContactSection contact={data.contact} />
    </>
  )
}
