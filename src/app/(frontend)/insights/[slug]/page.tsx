import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '@/lib/payload'

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const post = result.docs[0]

  if (!post) notFound()

  const cover = typeof post.coverImage === 'object' ? post.coverImage : null
  const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-primary">
        {post.category} · {post.readTime} · {date}
      </p>
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {post.title}
      </h1>

      {cover?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover.url}
          alt={cover.alt || post.title}
          className="mt-8 aspect-[16/9] w-full rounded-xl object-cover"
        />
      ) : null}

      <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
        <RichText data={post.content} />
      </div>
    </article>
  )
}
