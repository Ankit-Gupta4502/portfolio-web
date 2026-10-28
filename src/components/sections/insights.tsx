import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import type { InsightsIntro as InsightsIntroGlobal, Post } from '@/payload-types'

export function InsightsSection({
  insightsIntro,
  posts,
}: {
  insightsIntro: InsightsIntroGlobal
  posts: Post[]
}) {
  if (posts.length === 0) return null

  return (
    <section id="insights" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading heading={insightsIntro.heading} subheading={insightsIntro.subheading} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const cover = typeof post.coverImage === 'object' ? post.coverImage : null

            return (
              <Reveal key={post.id} delay={index * 60}>
                <Link href={`/insights/${post.slug}`} className="group block">
                  <Card className="h-full overflow-hidden border border-border p-0 shadow-sm transition-[border-color,box-shadow] duration-200 group-hover:border-primary/40 group-hover:shadow-md">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                      {cover?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cover.url}
                          alt={cover.alt || post.title}
                          className="size-full object-cover transition-transform duration-300 ease-snappy group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <CardContent className="flex flex-col gap-2 p-6">
                      <p className="text-xs font-medium text-primary">
                        {post.category} · {post.readTime}
                      </p>
                      <h3 className="font-heading text-lg font-semibold">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-transform duration-150 ease-out group-hover:translate-x-0.5">
                        Read more
                        <ArrowRight className="size-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
