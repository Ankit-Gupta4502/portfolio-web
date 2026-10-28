import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { migrations } from './migrations'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { Submissions } from './collections/Submissions'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { CTASection } from './globals/CTASection'
import { Contact } from './globals/Contact'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Hero } from './globals/Hero'
import { Industries } from './globals/Industries'
import { InsightsIntro } from './globals/InsightsIntro'
import { Process } from './globals/Process'
import { SiteSettings } from './globals/SiteSettings'
import { Stats } from './globals/Stats'
import { TestimonialsIntro } from './globals/TestimonialsIntro'
import { WhatWeDo } from './globals/WhatWeDo'
import { WhyUs } from './globals/WhyUs'
import { WorkIntro } from './globals/WorkIntro'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Temporary: shows which database host Vercel actually passes in (no credentials)
try {
  const dbUrl = new URL(process.env.DATABASE_URL || '')
  console.log('[db]', process.env.VERCEL_ENV ?? 'local', `${dbUrl.username}@${dbUrl.host}`)
} catch {
  console.log('[db]', process.env.VERCEL_ENV ?? 'local', 'DATABASE_URL missing or not a valid URL')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- MITHORA Admin',
    },
  },
  collections: [Services, Projects, Testimonials, Posts, Submissions, Media, Users],
  globals: [
    Header,
    Hero,
    Stats,
    WhatWeDo,
    WhyUs,
    Process,
    WorkIntro,
    Industries,
    TestimonialsIntro,
    InsightsIntro,
    CTASection,
    Contact,
    Footer,
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations,
    // Schema changes are applied explicitly via `pnpm payload migrate:create` + `pnpm payload migrate`,
    // not auto-pushed on every dev server start. Keeps local, staging and production schemas in sync
    // and avoids drizzle-kit's interactive confirmation prompt (which hangs/exits in non-TTY contexts).
    push: false,
  }),
  sharp,
  plugins: [
    // Always registered so the media schema (e.g. `_objectKey`) is identical with or without a token;
    // the adapter disables itself when BLOB_READ_WRITE_TOKEN is unset.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      alwaysInsertFields: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
