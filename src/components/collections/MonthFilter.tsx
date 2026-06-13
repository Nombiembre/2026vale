import React, { useEffect, useRef } from 'react'
import { useStore } from '@nanostores/react'
import { $yearStore, $monthStore } from '~/utils/filterStore'
import type { monthType } from '~/utils/filterStore'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(useGSAP);

interface MonthFilterProps {
  monthsByYear: Record<string, number[]>
}

const monthName = (i: number) => {
  const name = new Date(2020, i, 1).toLocaleString('es-ES', { month: 'long' })
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const monthSlug = (i: number): monthType => {
  return [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ][i] as monthType
}

const MonthFilter: React.FC<MonthFilterProps> = ({ monthsByYear }) => {
  const selectedYear = useStore($yearStore)
  const selectedMonth = useStore($monthStore)
  const containerRef = useRef<HTMLDivElement>(null)
  const prevYearRef = useRef<string>(selectedYear)

  const months =
    selectedYear === 'all' ? [] : (monthsByYear[selectedYear] ?? [])

  const handleMonthClick = (month: monthType) => {
    $monthStore.set(month)

    const url = new URL(window.location.href)

    if (month !== 'all') {
      url.searchParams.set('month', month)
    } else {
      url.searchParams.delete('month')
    }

    window.history.pushState({}, '', url)
  }

  useEffect(() => {
    const url = new URL(window.location.href)

    const month = (url.searchParams.get('month') as monthType | null) ?? 'all'

    $monthStore.set(month)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const buttons = container.querySelectorAll('.month-button ')
    if (buttons.length === 0) return

    prevYearRef.current = selectedYear
  }, [selectedYear])

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    const buttons = container.querySelectorAll('.month-button ')
    gsap.to(buttons, {
      opacity: 1,
      x: 0,
      duration: 0.25,
      stagger: 0.3,
      ease: 'power2.out',
      clearProps: 'all',
    })
  }, [selectedYear])

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-6 md:w-full">
      <div ref={containerRef} className="flex flex-wrap gap-y-2">
        {months.map((monthIndex) => (
          <button
            key={monthIndex}
            type="button"
            value={monthSlug(monthIndex)}
            onClick={() => handleMonthClick(monthSlug(monthIndex))}
            style={{ opacity: 0 }}
            className={`
  month-button button-filter
  ${selectedMonth === monthSlug(monthIndex) ? 'selectedfilter' : ''}
`}
          >
            {monthName(monthIndex)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MonthFilter
