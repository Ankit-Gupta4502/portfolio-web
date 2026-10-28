import { Mail, Phone } from 'lucide-react'

import { ContactForm } from '@/components/contact-form'
import { SectionHeading } from '@/components/section-heading'
import type { Contact as ContactGlobal } from '@/payload-types'

export function ContactSection({ contact }: { contact: ContactGlobal }) {
  const serviceOptions = (contact.serviceOptions || []).map((o) => o.label)
  const budgetOptions = (contact.budgetOptions || []).map((o) => o.label)

  return (
    <section id="contact" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          heading={contact.heading}
          subheading={contact.subheading}
          align="left"
          className="mx-0 max-w-none"
        />

        {(contact.email || contact.phone) && (
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-foreground">
                <Mail className="size-4" />
                {contact.email}
              </a>
            ) : null}
            {contact.phone ? (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-foreground">
                <Phone className="size-4" />
                {contact.phone}
              </a>
            ) : null}
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <ContactForm
            serviceOptions={serviceOptions}
            budgetOptions={budgetOptions}
            submitLabel={contact.submitLabel || 'Send Enquiry'}
          />
        </div>
      </div>
    </section>
  )
}
