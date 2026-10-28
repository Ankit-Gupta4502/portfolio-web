import { cn } from 'cn'

import { Reveal } from '@/components/reveal'

export function SectionHeading({
  heading,
  subheading,
  align = 'center',
  className,
}: {
  heading: string
  subheading?: string | null
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      <div
        className={cn(
          'mb-4 flex items-center gap-2',
          align === 'center' ? 'justify-center' : 'justify-start',
        )}
      >
        <span className="h-1.5 w-6 rounded-full bg-primary" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
      </div>
      <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
        {heading}
      </h2>
      {subheading ? (
        <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
      ) : null}
    </Reveal>
  )
}
