import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import type { Process as ProcessGlobal } from '@/payload-types'

export function ProcessSection({ process }: { process: ProcessGlobal }) {
  const steps = process.steps || []

  return (
    <section id="process" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading heading={process.heading} subheading={process.subheading} />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <Reveal key={step.id ?? step.number} delay={index * 60} className="relative">
              <p className="font-heading text-4xl font-bold text-primary/20">{step.number}</p>
              <h3 className="mt-2 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
