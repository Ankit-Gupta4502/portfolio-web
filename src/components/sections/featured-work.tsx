import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import type { Project, WorkIntro as WorkIntroGlobal } from '@/payload-types'

export function FeaturedWorkSection({
  workIntro,
  projects,
}: {
  workIntro: WorkIntroGlobal
  projects: Project[]
}) {
  return (
    <section id="work" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading heading={workIntro.heading} subheading={workIntro.subheading} />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const image = typeof project.image === 'object' ? project.image : null
            const href = project.caseStudyUrl || `/work/${project.slug}`

            return (
              <Reveal key={project.id} delay={index * 60}>
              <Card className="group overflow-hidden border border-border p-0 shadow-sm transition-[transform,box-shadow] duration-200 ease-snappy hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  {image?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image.url}
                      alt={image.alt || project.clientName}
                      className="size-full object-cover transition-transform duration-300 ease-snappy group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <CardContent className="flex flex-col gap-3 p-6">
                  <Badge variant="secondary" className="w-fit">
                    {project.industry}
                  </Badge>
                  <h3 className="font-heading text-lg font-semibold">{project.clientName}</h3>
                  <p className="text-sm text-muted-foreground">{project.summary}</p>
                  {project.servicesProvided && project.servicesProvided.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {project.servicesProvided.map((s) => (
                        <span
                          key={s.id ?? s.label}
                          className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {s.label}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <Button asChild variant="link" className="mt-1 h-auto w-fit px-0">
                    <Link
                      href={href}
                      target={project.caseStudyUrl ? '_blank' : undefined}
                      rel={project.caseStudyUrl ? 'noopener noreferrer' : undefined}
                    >
                      View Case Study
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
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
