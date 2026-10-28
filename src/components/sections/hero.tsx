import { ArrowRight, Megaphone, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import type { Hero as HeroGlobal } from '@/payload-types'

export function HeroSection({ hero }: { hero: HeroGlobal }) {
  const bgImage =
    hero.backgroundImage && typeof hero.backgroundImage === 'object'
      ? hero.backgroundImage.url
      : undefined

  return (
    <section id="home" className="relative overflow-hidden bg-foreground text-background">
      {bgImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 size-full object-cover opacity-20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-foreground/80" aria-hidden="true" />
        </>
      ) : null}

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-[-10%] right-[-10%] size-[36rem] rounded-full bg-primary/30 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] size-[28rem] rounded-full bg-primary/15 blur-[120px]"
        aria-hidden="true"
      />

      {/* Fine grid, faded toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-36">
        <div className="col-span-7 flex flex-col items-start text-left">
          {hero.eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/5 px-4 py-1.5 text-xs font-medium tracking-wide text-background/80 uppercase backdrop-blur-sm transition-[opacity,transform] duration-500 ease-snappy starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none">
              <Sparkles className="size-3.5 text-primary" />
              {hero.eyebrow}
            </span>
          ) : null}

          <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight transition-[opacity,transform] delay-75 duration-500 ease-snappy starting:translate-y-3 starting:opacity-0 motion-reduce:transition-none sm:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-xl text-lg text-background/70 transition-[opacity,transform] delay-150 duration-500 ease-snappy starting:translate-y-3 starting:opacity-0 motion-reduce:transition-none">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 transition-[opacity,transform] delay-200 duration-500 ease-snappy starting:translate-y-3 starting:opacity-0 motion-reduce:transition-none">
            {hero.primaryCtaLabel ? (
              <Button asChild size="lg">
                <Link href={hero.primaryCtaHref || '/#contact'}>
                  {hero.primaryCtaLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
            {hero.secondaryCtaLabel ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <Link href={hero.secondaryCtaHref || '/#work'}>
                  {hero.secondaryCtaLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>

        {/* Floating metric cards — decorative, purely CSS/SVG, no imagery needed */}
        <div className="relative col-span-5 hidden h-[26rem] lg:block">
          <div
            className="absolute top-0 right-6 w-60 rounded-2xl border border-background/10 bg-background/[0.06] p-5 shadow-2xl shadow-black/40 backdrop-blur-md transition-[opacity,transform] delay-300 duration-700 ease-snappy starting:translate-y-6 starting:-rotate-6 starting:opacity-0"
            style={{ transform: 'rotate(-4deg)' }}
          >
            <div className="flex items-center gap-2 text-xs text-background/60">
              <TrendingUp className="size-3.5 text-primary" />
              Lead Growth
            </div>
            <p className="mt-2 font-heading text-3xl font-bold">+128%</p>
            <p className="mt-1 text-xs text-background/50">vs. last quarter</p>
          </div>

          <div
            className="absolute top-40 left-0 w-56 rounded-2xl border border-background/10 bg-background/[0.06] p-5 shadow-2xl shadow-black/40 backdrop-blur-md transition-[opacity,transform] delay-500 duration-700 ease-snappy starting:translate-y-6 starting:rotate-6 starting:opacity-0"
            style={{ transform: 'rotate(3deg)' }}
          >
            <div className="flex items-center gap-2 text-xs text-background/60">
              <Megaphone className="size-3.5 text-primary" />
              Audience Reached
            </div>
            <p className="mt-2 font-heading text-3xl font-bold">5.2M+</p>
            <p className="mt-1 text-xs text-background/50">across active campaigns</p>
          </div>

          <div
            className="absolute bottom-0 right-2 w-48 rounded-2xl border border-primary/30 bg-primary/90 p-5 text-primary-foreground shadow-2xl shadow-primary/30 backdrop-blur-md transition-[opacity,transform] delay-700 duration-700 ease-snappy starting:translate-y-6 starting:-rotate-3 starting:opacity-0"
            style={{ transform: 'rotate(-2deg)' }}
          >
            <p className="text-xs opacity-80">Avg. ROAS</p>
            <p className="mt-2 font-heading text-3xl font-bold">4.8x</p>
          </div>
        </div>
      </div>
    </section>
  )
}
