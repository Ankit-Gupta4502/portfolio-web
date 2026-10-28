import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Icon } from '@/lib/icon-map'
import type { Industry as IndustriesGlobal } from '@/payload-types'

export function IndustriesSection({ industries }: { industries: IndustriesGlobal }) {
  const items = industries.items || []

  return (
    <section id="industries" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading heading={industries.heading} subheading={industries.subheading} />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item, index) => (
            <Reveal
              key={item.id ?? item.name}
              delay={index * 50}
              className="flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-background px-4 py-8 text-center transition-colors duration-200 hover:border-primary/40"
            >
              <Icon name={item.icon} className="size-7 text-primary" />
              <p className="text-sm font-medium">{item.name}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
