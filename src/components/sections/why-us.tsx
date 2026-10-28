import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Icon } from '@/lib/icon-map'
import type { WhyUs as WhyUsGlobal } from '@/payload-types'

export function WhyUsSection({ whyUs }: { whyUs: WhyUsGlobal }) {
  const points = whyUs.points || []

  return (
    <section id="about" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading heading={whyUs.heading} subheading={whyUs.subheading} />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {points.map((point, index) => (
            <Reveal key={point.id ?? point.title} delay={index * 60} className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon name={point.icon} className="size-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold">{point.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{point.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
