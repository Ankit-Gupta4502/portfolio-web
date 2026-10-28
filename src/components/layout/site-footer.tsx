import Link from 'next/link'

import { socialIconMap } from '@/components/social-icons'
import type { Footer as FooterGlobal } from '@/payload-types'

export function SiteFooter({ footer }: { footer: FooterGlobal }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-xl font-bold tracking-tight">MITHORA</p>
            <p className="mt-2 text-sm text-muted-foreground">{footer.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              {(footer.socialLinks || []).map((social) => {
                const SocialIcon = social.platform ? socialIconMap[social.platform] : undefined
                if (!SocialIcon) return null
                return (
                  <a
                    key={social.id ?? social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <SocialIcon className="size-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Quick Links</p>
            <ul className="mt-4 space-y-3">
              {(footer.quickLinks || []).map((link) => (
                <li key={link.id ?? link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Services</p>
            <ul className="mt-4 space-y-3">
              {(footer.servicesLinks || []).map((service) => (
                <li key={service.id ?? service.label} className="text-sm text-muted-foreground">
                  {service.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Get in touch</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Ready to grow your brand? Reach out and let&apos;s talk.
            </p>
            <Link
              href="/#contact"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Contact us →
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-8 text-center text-sm text-muted-foreground">
          © {year} {footer.copyrightText}
        </div>
      </div>
    </footer>
  )
}
