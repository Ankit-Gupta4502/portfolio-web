import { Card, CardContent } from '@/components/ui/card'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Icon } from '@/lib/icon-map'
import type { Service, WhatWeDo as WhatWeDoGlobal } from '@/payload-types'

export function WhatWeDoSection({
  whatWeDo,
  services,
}: {
  whatWeDo: WhatWeDoGlobal
  services: Service[]
}) {
  return (
    <section id="services" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading heading={whatWeDo.heading} subheading={whatWeDo.subheading} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 60}>
              <Card className="h-full border border-border shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/40 hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-4 pt-2">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon name={service.icon} className="size-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
