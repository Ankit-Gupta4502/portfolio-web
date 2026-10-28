import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { getPayloadClient } from '@/lib/payload'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const project = result.docs[0]

  if (!project) notFound()

  const image = typeof project.image === 'object' ? project.image : null

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Badge variant="secondary">{project.industry}</Badge>
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {project.clientName}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{project.summary}</p>

      {project.servicesProvided && project.servicesProvided.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
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

      {image?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.url}
          alt={image.alt || project.clientName}
          className="mt-8 aspect-[16/9] w-full rounded-xl object-cover"
        />
      ) : null}

      {project.caseStudy ? (
        <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
          <RichText data={project.caseStudy} />
        </div>
      ) : null}
    </article>
  )
}
