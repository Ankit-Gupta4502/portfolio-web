'use client'

import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { Header as HeaderGlobal } from '@/payload-types'

export function SiteHeader({ header }: { header: HeaderGlobal }) {
  const [open, setOpen] = useState(false)
  const navItems = header.navItems || []

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight">
          {header.siteName}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.id ?? item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild>
            <Link href={header.ctaHref || '/#contact'}>
              {header.ctaLabel || "Let's Talk"}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <SheetTitle className="px-6 pt-6 font-heading text-lg font-bold">
              {header.siteName}
            </SheetTitle>
            <nav className="mt-4 flex flex-col gap-1 px-6">
              {navItems.map((item) => (
                <SheetClose asChild key={item.id ?? item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-2 py-3 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-4 px-6">
              <SheetClose asChild>
                <Button asChild className="w-full">
                  <Link href={header.ctaHref || '/#contact'}>
                    {header.ctaLabel || "Let's Talk"}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
