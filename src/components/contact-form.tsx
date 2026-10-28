'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import { submitEnquiry, type EnquiryFormState } from '@/actions/submit-enquiry'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const initialState: EnquiryFormState = { success: false, message: '' }

export function ContactForm({
  serviceOptions,
  budgetOptions,
  submitLabel,
}: {
  serviceOptions: string[]
  budgetOptions: string[]
  submitLabel: string
}) {
  const [state, formAction, isPending] = useActionState(submitEnquiry, initialState)

  useEffect(() => {
    if (!state.message) return
    if (state.success) {
      toast.success(state.message)
    } else if (!state.fieldErrors) {
      toast.error(state.message)
    }
  }, [state])

  if (state.success) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <p className="font-heading text-lg font-semibold">Enquiry sent!</p>
        <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" required />
        {state.fieldErrors?.fullName ? (
          <p className="text-xs text-destructive">{state.fieldErrors.fullName}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input id="businessName" name="businessName" required />
        {state.fieldErrors?.businessName ? (
          <p className="text-xs text-destructive">{state.fieldErrors.businessName}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" type="tel" required />
        {state.fieldErrors?.phone ? (
          <p className="text-xs text-destructive">{state.fieldErrors.phone}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
        {state.fieldErrors?.email ? (
          <p className="text-xs text-destructive">{state.fieldErrors.email}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="website">Website</Label>
        <Input id="website" name="website" placeholder="https://" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="serviceRequired">Service Required</Label>
        <Select name="serviceRequired">
          <SelectTrigger id="serviceRequired" className="w-full">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="monthlyBudget">Monthly Marketing Budget</Label>
        <Select name="monthlyBudget">
          <SelectTrigger id="monthlyBudget" className="w-full">
            <SelectValue placeholder="Select a budget range" />
          </SelectTrigger>
          <SelectContent>
            {budgetOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={4} />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? 'Sending…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
