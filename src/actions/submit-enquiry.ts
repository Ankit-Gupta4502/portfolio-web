'use server'

import { z } from 'zod'

import { getPayloadClient } from '@/lib/payload'

const enquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.'),
  businessName: z.string().trim().min(2, 'Please enter your business name.'),
  phone: z.string().trim().min(6, 'Please enter a valid phone number.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  website: z.string().trim().optional(),
  serviceRequired: z.string().trim().optional(),
  monthlyBudget: z.string().trim().optional(),
  message: z.string().trim().optional(),
})

export type EnquiryFormState = {
  success: boolean
  message: string
  fieldErrors?: Partial<Record<keyof z.infer<typeof enquirySchema>, string>>
}

export async function submitEnquiry(
  _prevState: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  const raw = {
    fullName: formData.get('fullName')?.toString() ?? '',
    businessName: formData.get('businessName')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    website: formData.get('website')?.toString() ?? '',
    serviceRequired: formData.get('serviceRequired')?.toString() ?? '',
    monthlyBudget: formData.get('monthlyBudget')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? '',
  }

  const parsed = enquirySchema.safeParse(raw)

  if (!parsed.success) {
    const fieldErrors: EnquiryFormState['fieldErrors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof enquirySchema>
      fieldErrors[key] = issue.message
    }
    return {
      success: false,
      message: 'Please check the highlighted fields and try again.',
      fieldErrors,
    }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'submissions',
      data: parsed.data,
    })

    return {
      success: true,
      message: "Thanks! We've received your enquiry and will be in touch within 24 hours.",
    }
  } catch {
    return {
      success: false,
      message: 'Something went wrong on our end. Please try again or email us directly.',
    }
  }
}
