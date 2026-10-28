'use client'

import { cn } from 'cn'
import { useEffect, useRef, useState } from 'react'

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={visible ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        'translate-y-3 opacity-0 transition-[opacity,transform] duration-500 ease-snappy',
        'data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100',
        'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        className,
      )}
    >
      {children}
    </div>
  )
}
