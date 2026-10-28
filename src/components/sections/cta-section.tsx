import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/reveal'
import type { CtaSection as CTAGlobal } from '@/payload-types'

export function CTASection({ cta }: { cta: CTAGlobal }) {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {cta.heading}
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80">{cta.subheading}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {cta.primaryCtaLabel ? (
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href={cta.primaryCtaHref || '/#contact'}>
                {cta.primaryCtaLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : null}
          {cta.secondaryCtaLabel ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href={cta.secondaryCtaHref || '/#contact'}>
                {cta.secondaryCtaLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : null}
        </div>
      </Reveal>
    </section>
  )
}
