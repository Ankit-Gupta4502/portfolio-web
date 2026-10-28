import { Reveal } from '@/components/reveal'
import type { Stat as StatsGlobal } from '@/payload-types'

export function StatsSection({ stats }: { stats: StatsGlobal }) {
  const items = stats.items || []
  if (items.length === 0) return null

  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.id ?? item.label} delay={index * 60} className="text-center">
              <p className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
