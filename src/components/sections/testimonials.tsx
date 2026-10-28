import { Star } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import type { Testimonial, TestimonialsIntro as TestimonialsIntroGlobal } from '@/payload-types'

export function TestimonialsSection({
  testimonialsIntro,
  testimonials,
}: {
  testimonialsIntro: TestimonialsIntroGlobal
  testimonials: Testimonial[]
}) {
  if (testimonials.length === 0) return null

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          heading={testimonialsIntro.heading}
          subheading={testimonialsIntro.subheading}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const avatar = typeof testimonial.avatar === 'object' ? testimonial.avatar : null
            const rating = testimonial.rating || 5

            return (
              <Reveal key={testimonial.id} delay={index * 60}>
                <Card className="h-full border border-border shadow-sm">
                  <CardContent className="flex h-full flex-col gap-4 pt-2">
                    <div className="flex items-center gap-0.5 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${i < rating ? 'fill-primary' : 'fill-none text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                    <p className="flex-1 text-sm text-muted-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {avatar?.url ? (
                          <AvatarImage src={avatar.url} alt={testimonial.clientName} />
                        ) : null}
                        <AvatarFallback>{testimonial.clientName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{testimonial.clientName}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.businessName}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
