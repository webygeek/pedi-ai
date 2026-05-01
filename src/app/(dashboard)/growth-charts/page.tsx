'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ============================================================================
// Types
// ============================================================================

interface Child {
  id: string
  name: string
  dateOfBirth: string
  gender: 'male' | 'female'
  currentAge: string
}

interface Measurement {
  date: string
  ageInMonths: number
  weight: number // kg
  height: number // cm
  headCircumference: number // cm
}

interface GrowthDataPoint {
  date: string
  ageMonths: number
  value: number
}

interface PercentileBand {
  percentile: number
  label: string
  color: string
  gradientId: string
}

// ============================================================================
// Sample Data
// ============================================================================

const sampleChildren: Child[] = [
  {
    id: '1',
    name: 'Arjun',
    dateOfBirth: '2025-02-15',
    gender: 'male',
    currentAge: '14 months',
  },
  {
    id: '2',
    name: 'Priya',
    dateOfBirth: '2024-08-20',
    gender: 'female',
    currentAge: '20 months',
  },
]

const sampleMeasurements: Record<string, Measurement[]> = {
  '1': [
    { date: '2025-03-15', ageInMonths: 1, weight: 4.5, height: 54.0, headCircumference: 37.0 },
    { date: '2025-04-15', ageInMonths: 2, weight: 5.6, height: 58.0, headCircumference: 39.0 },
    { date: '2025-05-15', ageInMonths: 3, weight: 6.4, height: 61.5, headCircumference: 40.5 },
    { date: '2025-06-15', ageInMonths: 4, weight: 7.0, height: 64.0, headCircumference: 41.5 },
    { date: '2025-07-15', ageInMonths: 5, weight: 7.5, height: 66.0, headCircumference: 42.5 },
    { date: '2025-08-15', ageInMonths: 6, weight: 8.0, height: 68.0, headCircumference: 43.5 },
    { date: '2025-09-15', ageInMonths: 7, weight: 8.3, height: 70.0, headCircumference: 44.0 },
    { date: '2025-10-15', ageInMonths: 8, weight: 8.7, height: 72.0, headCircumference: 44.5 },
    { date: '2025-11-15', ageInMonths: 9, weight: 9.0, height: 73.5, headCircumference: 45.0 },
    { date: '2025-12-15', ageInMonths: 10, weight: 9.3, height: 75.0, headCircumference: 45.5 },
    { date: '2026-01-15', ageInMonths: 11, weight: 9.5, height: 76.5, headCircumference: 46.0 },
    { date: '2026-02-15', ageInMonths: 12, weight: 9.8, height: 78.0, headCircumference: 46.5 },
    { date: '2026-03-15', ageInMonths: 13, weight: 10.0, height: 79.0, headCircumference: 46.8 },
    { date: '2026-04-15', ageInMonths: 14, weight: 10.2, height: 80.0, headCircumference: 47.0 },
  ],
  '2': [
    { date: '2024-09-20', ageInMonths: 1, weight: 4.2, height: 53.0, headCircumference: 36.5 },
    { date: '2024-10-20', ageInMonths: 2, weight: 5.3, height: 57.0, headCircumference: 38.5 },
    { date: '2024-11-20', ageInMonths: 3, weight: 6.0, height: 60.0, headCircumference: 40.0 },
    { date: '2024-12-20', ageInMonths: 4, weight: 6.6, height: 62.5, headCircumference: 41.0 },
    { date: '2025-01-20', ageInMonths: 5, weight: 7.1, height: 65.0, headCircumference: 42.0 },
    { date: '2025-02-20', ageInMonths: 6, weight: 7.5, height: 67.0, headCircumference: 43.0 },
    { date: '2025-03-20', ageInMonths: 7, weight: 7.9, height: 69.0, headCircumference: 43.5 },
    { date: '2025-04-20', ageInMonths: 8, weight: 8.2, height: 71.0, headCircumference: 44.0 },
    { date: '2025-05-20', ageInMonths: 9, weight: 8.5, height: 72.5, headCircumference: 44.5 },
    { date: '2025-06-20', ageInMonths: 10, weight: 8.8, height: 74.0, headCircumference: 45.0 },
    { date: '2025-07-20', ageInMonths: 11, weight: 9.1, height: 75.5, headCircumference: 45.3 },
    { date: '2025-08-20', ageInMonths: 12, weight: 9.4, height: 77.0, headCircumference: 45.5 },
    { date: '2025-09-20', ageInMonths: 13, weight: 9.6, height: 78.0, headCircumference: 45.8 },
    { date: '2025-10-20', ageInMonths: 14, weight: 9.8, height: 79.0, headCircumference: 46.0 },
    { date: '2025-11-20', ageInMonths: 15, weight: 10.0, height: 80.0, headCircumference: 46.2 },
    { date: '2025-12-20', ageInMonths: 16, weight: 10.2, height: 81.0, headCircumference: 46.4 },
    { date: '2026-01-20', ageInMonths: 17, weight: 10.4, height: 82.0, headCircumference: 46.6 },
    { date: '2026-02-20', ageInMonths: 18, weight: 10.6, height: 83.0, headCircumference: 46.8 },
    { date: '2026-03-20', ageInMonths: 19, weight: 10.7, height: 84.0, headCircumference: 47.0 },
    { date: '2026-04-20', ageInMonths: 20, weight: 10.9, height: 85.0, headCircumference: 47.2 },
  ],
}

// WHO Growth Standards for boys (0-24 months) - Weight-for-age percentiles (kg)
const whoWeightBoys: Record<number, Record<number, number>> = {
  3: { 0: 2.5, 3: 5.0, 6: 6.4, 9: 7.2, 12: 7.8, 15: 8.3, 18: 8.8, 21: 9.2, 24: 9.7 },
  15: { 0: 2.9, 3: 5.8, 6: 7.3, 9: 8.2, 12: 8.9, 15: 9.5, 18: 10.0, 21: 10.5, 24: 11.0 },
  50: { 0: 3.3, 3: 6.4, 6: 7.9, 9: 8.9, 12: 9.6, 15: 10.3, 18: 10.9, 21: 11.5, 24: 12.2 },
  85: { 0: 3.9, 3: 7.2, 6: 8.8, 9: 9.9, 12: 10.8, 15: 11.6, 18: 12.3, 21: 13.0, 24: 13.7 },
  97: { 0: 4.4, 3: 8.0, 6: 9.7, 9: 10.8, 12: 11.8, 15: 12.6, 18: 13.5, 21: 14.2, 24: 15.0 },
}

// WHO Growth Standards for boys - Length-for-age percentiles (cm)
const whoHeightBoys: Record<number, Record<number, number>> = {
  3: { 0: 46.1, 3: 54.7, 6: 61.1, 9: 66.0, 12: 70.0, 15: 73.2, 18: 76.1, 21: 78.7, 24: 81.3 },
  15: { 0: 47.1, 3: 56.0, 6: 62.5, 9: 67.6, 12: 71.6, 15: 74.9, 18: 77.8, 21: 80.5, 24: 83.2 },
  50: { 0: 49.9, 3: 58.4, 6: 65.1, 9: 70.1, 12: 74.3, 15: 77.8, 18: 80.9, 21: 83.9, 24: 86.8 },
  85: { 0: 52.0, 3: 60.5, 6: 67.2, 9: 72.2, 12: 76.5, 15: 80.2, 18: 83.6, 21: 86.7, 24: 89.8 },
  97: { 0: 53.5, 3: 62.0, 6: 68.9, 9: 74.0, 12: 78.3, 15: 82.0, 18: 85.5, 21: 88.8, 24: 92.0 },
}

// WHO Growth Standards for boys - Head circumference-for-age percentiles (cm)
const whoHeadCircBoys: Record<number, Record<number, number>> = {
  3: { 0: 32.1, 3: 37.1, 6: 39.5, 9: 41.0, 12: 42.0, 15: 43.0, 18: 43.8, 21: 44.5, 24: 45.1 },
  15: { 0: 33.0, 3: 38.1, 6: 40.5, 9: 42.0, 12: 43.1, 15: 44.1, 18: 44.9, 21: 45.6, 24: 46.2 },
  50: { 0: 34.5, 3: 39.1, 6: 41.8, 9: 43.4, 12: 44.5, 15: 45.5, 18: 46.3, 21: 47.0, 24: 47.6 },
  85: { 0: 36.0, 3: 40.5, 6: 43.0, 9: 44.7, 12: 45.9, 15: 46.9, 18: 47.7, 21: 48.4, 24: 49.0 },
  97: { 0: 37.2, 3: 41.5, 6: 44.0, 9: 45.7, 12: 46.9, 15: 48.0, 18: 48.7, 21: 49.4, 24: 50.0 },
}

// ============================================================================
// Utility Functions
// ============================================================================

function interpolateWHO(value: Record<number, number>, ageMonths: number): number {
  const ages = Object.keys(value).map(Number).sort((a, b) => a - b)
  if (ageMonths <= ages[0]) return value[ages[0]]
  if (ageMonths >= ages[ages.length - 1]) return value[ages[ages.length - 1]]

  for (let i = 0; i < ages.length - 1; i++) {
    if (ageMonths >= ages[i] && ageMonths <= ages[i + 1]) {
      const ratio = (ageMonths - ages[i]) / (ages[i + 1] - ages[i])
      return value[ages[i]] + ratio * (value[ages[i + 1]] - value[ages[i]])
    }
  }
  return value[ages[ages.length - 1]]
}

function calculatePercentile(value: number, metric: 'weight' | 'height' | 'hc', ageMonths: number, gender: 'male' | 'female'): number {
  const whoData = metric === 'weight'
    ? Object.entries(whoWeightBoys).map(([p, data]) => ({ percentile: parseInt(p), value: interpolateWHO(data, ageMonths) }))
    : metric === 'height'
    ? Object.entries(whoHeightBoys).map(([p, data]) => ({ percentile: parseInt(p), value: interpolateWHO(data, ageMonths) }))
    : Object.entries(whoHeadCircBoys).map(([p, data]) => ({ percentile: parseInt(p), value: interpolateWHO(data, ageMonths) }))

  const sorted = whoData.sort((a, b) => a.percentile - b.percentile)

  if (value <= sorted[0].value) return Math.max(1, sorted[0].percentile - 5)
  if (value >= sorted[sorted.length - 1].value) return Math.min(99, sorted[sorted.length - 1].percentile + 5)

  for (let i = 0; i < sorted.length - 1; i++) {
    if (value >= sorted[i].value && value <= sorted[i + 1].value) {
      const ratio = (value - sorted[i].value) / (sorted[i + 1].value - sorted[i].value)
      return Math.round(sorted[i].percentile + ratio * (sorted[i + 1].percentile - sorted[i].percentile))
    }
  }
  return 50
}

function getTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
  const diff = current - previous
  if (Math.abs(diff) < 3) return 'stable'
  return diff > 0 ? 'up' : 'down'
}

function getTimeRangeData(measurements: Measurement[], months: number): Measurement[] {
  if (months === 0) return measurements
  const maxAge = Math.max(...measurements.map(m => m.ageInMonths))
  return measurements.filter(m => m.ageInMonths >= maxAge - months)
}

// ============================================================================
// Components
// ============================================================================

function ChildSelector({
  children,
  selectedChild,
  onSelect,
}: {
  children: Child[]
  selectedChild: Child
  onSelect: (child: Child) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm border border-mist/50 hover:border-sage/30 transition-all"
      >
        <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
          <span className="text-sage font-semibold text-lg">{selectedChild.name[0]}</span>
        </div>
        <div className="text-left">
          <p className="font-semibold text-forest">{selectedChild.name}</p>
          <p className="text-sm text-forest/60">{selectedChild.currentAge}</p>
        </div>
        <svg
          className={`w-5 h-5 text-forest/40 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-mist/50 py-2 z-50">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => {
                onSelect(child)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-mist/50 transition-colors ${
                child.id === selectedChild.id ? 'bg-mist/30' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                <span className="text-sage font-semibold">{child.name[0]}</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-forest">{child.name}</p>
                <p className="text-xs text-forest/60">{child.currentAge}</p>
              </div>
              {child.id === selectedChild.id && (
                <svg className="w-5 h-5 text-sage ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function GrowthChart({
  measurements,
  metric,
  timeRange,
  gender,
}: {
  measurements: Measurement[]
  metric: 'weight' | 'height' | 'hc'
  timeRange: number
  gender: 'male' | 'female'
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: Measurement } | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const filteredData = getTimeRangeData(measurements, timeRange)

  const getMetricValue = (m: Measurement) => {
    return metric === 'weight' ? m.weight : metric === 'height' ? m.height : m.headCircumference
  }

  const getMetricLabel = () => {
    return metric === 'weight' ? 'Weight (kg)' : metric === 'height' ? 'Height (cm)' : 'Head Circumference (cm)'
  }

  const getWHOData = () => {
    const whoData = metric === 'weight'
      ? whoWeightBoys
      : metric === 'height'
      ? whoHeightBoys
      : whoHeadCircBoys

    return {
      p3: Object.entries(whoData[3] || {}).map(([age, val]) => ({ age: parseInt(age), value: val })),
      p15: Object.entries(whoData[15] || {}).map(([age, val]) => ({ age: parseInt(age), value: val })),
      p50: Object.entries(whoData[50] || {}).map(([age, val]) => ({ age: parseInt(age), value: val })),
      p85: Object.entries(whoData[85] || {}).map(([age, val]) => ({ age: parseInt(age), value: val })),
      p97: Object.entries(whoData[97] || {}).map(([age, val]) => ({ age: parseInt(age), value: val })),
    }
  }

  const chartWidth = 700
  const chartHeight = 350
  const padding = { top: 40, right: 40, bottom: 60, left: 70 }

  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const ages = filteredData.map(m => m.ageInMonths)
  const values = filteredData.map(getMetricValue)

  const minAge = Math.min(...ages) - 1
  const maxAge = Math.max(...ages) + 1
  const minValue = Math.min(...values, ...getWHOData().p3.map(p => p.value)) * 0.9
  const maxValue = Math.max(...values, ...getWHOData().p97.map(p => p.value)) * 1.05

  const scaleX = (age: number) => ((age - minAge) / (maxAge - minAge)) * innerWidth + padding.left
  const scaleY = (value: number) => innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight + padding.top

  const whoData = getWHOData()

  const pathD = (data: { age: number; value: number }[]) => {
    if (data.length === 0) return ''
    return data
      .filter(d => d.age >= minAge && d.age <= maxAge)
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.age)} ${scaleY(d.value)}`)
      .join(' ')
  }

  const areaPathD = (lower: { age: number; value: number }[], upper: { age: number; value: number }[]) => {
    if (lower.length === 0 || upper.length === 0) return ''
    const filteredLower = lower.filter(d => d.age >= minAge && d.age <= maxAge)
    const filteredUpper = upper.filter(d => d.age >= minAge && d.age <= maxAge).reverse()
    const combined = [...filteredLower, ...filteredUpper]
    if (combined.length === 0) return ''
    return combined.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.age)} ${scaleY(d.value)}`).join(' ') + ' Z'
  }

  const measurementPoints = filteredData.map((m, i) => ({
    x: scaleX(m.ageInMonths),
    y: scaleY(getMetricValue(m)),
    data: m,
  }))

  const lastPoint = measurementPoints[measurementPoints.length - 1]

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    let closest: typeof hoveredPoint = null
    let closestDist = 30

    for (const point of measurementPoints) {
      const dist = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2))
      if (dist < closestDist) {
        closest = point
        closestDist = dist
      }
    }

    if (closest) {
      setHoveredPoint(closest)
      setTooltipPos({ x: closest.x, y: closest.y })
    } else {
      setHoveredPoint(null)
    }
  }

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredPoint(null)}
      >
        <defs>
          <linearGradient id="sageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7bada6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7bada6" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="coralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c04f7a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#c04f7a" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="measurementGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7bada6" />
            <stop offset="100%" stopColor="#c04f7a" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3, 4, 5].map(i => {
          const y = padding.top + (i * innerHeight) / 5
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="#e8efee"
                strokeWidth="1"
                strokeDasharray={i === 0 ? 'none' : '4 4'}
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-forest/50"
              >
                {(maxValue - (i * (maxValue - minValue)) / 5).toFixed(metric === 'weight' ? 1 : 0)}
              </text>
            </g>
          )
        })}

        {/* X-axis labels */}
        {filteredData.map(m => (
          <text
            key={m.ageInMonths}
            x={scaleX(m.ageInMonths)}
            y={chartHeight - padding.bottom + 25}
            textAnchor="middle"
            className="text-xs fill-forest/50"
          >
            {m.ageInMonths}m
          </text>
        ))}

        {/* WHO Percentile bands */}
        <path d={areaPathD(whoData.p3, whoData.p15)} fill="url(#sageGradient)" />
        <path d={areaPathD(whoData.p15, whoData.p50)} fill="url(#sageGradient)" />
        <path d={areaPathD(whoData.p50, whoData.p85)} fill="url(#sageGradient)" />
        <path d={areaPathD(whoData.p85, whoData.p97)} fill="url(#sageGradient)" />

        {/* WHO percentile lines */}
        <path d={pathD(whoData.p3)} fill="none" stroke="#7bada6" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        <path d={pathD(whoData.p15)} fill="none" stroke="#7bada6" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <path d={pathD(whoData.p50)} fill="none" stroke="#7bada6" strokeWidth="1.5" opacity="0.8" />
        <path d={pathD(whoData.p85)} fill="none" stroke="#7bada6" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <path d={pathD(whoData.p97)} fill="none" stroke="#7bada6" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />

        {/* Measurement line */}
        {measurementPoints.length > 1 && (
          <path
            d={measurementPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
            fill="none"
            stroke="url(#measurementGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
        )}

        {/* Measurement points */}
        {measurementPoints.map((point, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r={i === measurementPoints.length - 1 ? 10 : 6}
              fill={i === measurementPoints.length - 1 ? '#c04f7a' : 'white'}
              stroke={i === measurementPoints.length - 1 ? '#c04f7a' : '#7bada6'}
              strokeWidth="3"
              className="transition-all duration-200"
              style={{
                filter: i === measurementPoints.length - 1 ? 'url(#glow)' : 'none',
              }}
            />
          </g>
        ))}

        {/* Last point highlight pulse */}
        {lastPoint && (
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r="14"
            fill="none"
            stroke="#c04f7a"
            strokeWidth="2"
            opacity="0.5"
            className="animate-ping"
          />
        )}

        {/* Hover highlight */}
        {hoveredPoint && (
          <>
            <circle
              cx={hoveredPoint.x}
              cy={hoveredPoint.y}
              r="12"
              fill="#c04f7a"
              opacity="0.2"
            />
            <circle
              cx={hoveredPoint.x}
              cy={hoveredPoint.y}
              r="8"
              fill="white"
              stroke="#c04f7a"
              strokeWidth="3"
            />
          </>
        )}

        {/* Y-axis label */}
        <text
          x={20}
          y={chartHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90, 20, ${chartHeight / 2})`}
          className="text-sm fill-forest/70 font-medium"
        >
          {getMetricLabel()}
        </text>

        {/* X-axis label */}
        <text
          x={chartWidth / 2}
          y={chartHeight - 10}
          textAnchor="middle"
          className="text-sm fill-forest/70 font-medium"
        >
          Age (months)
        </text>

        {/* Legend */}
        <g transform={`translate(${chartWidth - padding.right - 120}, ${padding.top - 10})`}>
          <text x="0" y="0" className="text-xs fill-forest/60 font-medium">Percentile Bands</text>
          <rect x="0" y="10" width="16" height="10" fill="url(#sageGradient)" rx="2" />
          <text x="22" y="18" className="text-xs fill-forest/50">3rd - 97th</text>
          <rect x="0" y="26" width="16" height="2" stroke="#7bada6" strokeWidth="1.5" />
          <text x="22" y="34" className="text-xs fill-forest/50">50th (WHO)</text>
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredPoint && (
        <div
          className="absolute pointer-events-none bg-forest text-white px-4 py-2 rounded-xl shadow-lg text-sm z-50 whitespace-nowrap"
          style={{
            left: tooltipPos.x > chartWidth / 2 ? tooltipPos.x - 130 : tooltipPos.x + 15,
            top: tooltipPos.y - 60,
          }}
        >
          <p className="font-semibold">{hoveredPoint.data.date}</p>
          <p className="text-white/80">{hoveredPoint.data.ageInMonths} months</p>
          <p className="text-coral-light font-medium mt-1">
            {getMetricValue(hoveredPoint.data).toFixed(metric === 'weight' ? 2 : 1)} {metric === 'weight' ? 'kg' : 'cm'}
          </p>
        </div>
      )}
    </div>
  )
}

function PercentileCard({
  metric,
  measurements,
  gender,
}: {
  metric: 'weight' | 'height' | 'hc'
  measurements: Measurement[]
  gender: 'male' | 'female'
}) {
  const getMetricValue = (m: Measurement) =>
    metric === 'weight' ? m.weight : metric === 'height' ? m.height : m.headCircumference

  const current = measurements[measurements.length - 1]
  const previous = measurements[measurements.length - 2]

  if (!current) return null

  const currentPercentile = calculatePercentile(getMetricValue(current), metric, current.ageInMonths, gender)
  const previousPercentile = previous ? calculatePercentile(getMetricValue(previous), metric, previous.ageInMonths, gender) : currentPercentile

  const trend = getTrend(currentPercentile, previousPercentile)

  const metricLabels = {
    weight: 'Weight',
    height: 'Height',
    hc: 'Head Circumference',
  }

  const metricIcons = {
    weight: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    height: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    ),
    hc: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5c-4.5 0-8 2-8 5.5 0 2.5 1.5 4.5 3.5 5.5v5c0 1 .5 2 2 2h5c1.5 0 2-1 2-2v-5c2-1 3.5-3 3.5-5.5 0-3.5-3.5-5.5-8-5.5z" />
      </svg>
    ),
  }

  const getTrendIcon = () => {
    if (trend === 'up') {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      )
    }
    if (trend === 'down') {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      )
    }
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    )
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-sage'
    if (trend === 'down') return 'text-coral'
    return 'text-forest/40'
  }

  const getPercentileColor = () => {
    if (currentPercentile >= 15 && currentPercentile <= 85) return 'text-sage'
    if (currentPercentile < 3 || currentPercentile > 97) return 'text-coral'
    return 'text-forest'
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-mist/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-mist flex items-center justify-center text-sage">
            {metricIcons[metric]}
          </div>
          <div>
            <p className="text-sm text-forest/60">{metricLabels[metric]}</p>
            <p className="text-xs text-forest/40">
              {current.ageInMonths} months old
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-1 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-sm font-medium">
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{Math.abs(currentPercentile - previousPercentile)}
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className={`font-display text-4xl font-semibold ${getPercentileColor()}`}>
          {currentPercentile}
        </span>
        <span className="text-lg text-forest/60">th</span>
        <span className="text-sm text-forest/40 ml-2">percentile</span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 h-2 bg-mist rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              currentPercentile >= 15 && currentPercentile <= 85
                ? 'bg-sage'
                : currentPercentile < 3 || currentPercentile > 97
                ? 'bg-coral'
                : 'bg-forest'
            }`}
            style={{ width: `${currentPercentile}%` }}
          />
        </div>
      </div>

      <p className="mt-3 text-sm text-forest/60">
        {currentPercentile >= 15 && currentPercentile <= 85
          ? 'Within normal range'
          : currentPercentile < 15
          ? 'Below average - consult pediatrician'
          : 'Above average - consult pediatrician'}
      </p>
    </div>
  )
}

function InsightsCard({
  measurements,
  gender,
}: {
  measurements: Measurement[]
  gender: 'male' | 'female'
}) {
  const weightP = calculatePercentile(measurements[measurements.length - 1].weight, 'weight', measurements[measurements.length - 1].ageInMonths, gender)
  const heightP = calculatePercentile(measurements[measurements.length - 1].height, 'height', measurements[measurements.length - 1].ageInMonths, gender)

  const prevWeightP = calculatePercentile(measurements[measurements.length - 2]?.weight || 0, 'weight', measurements[measurements.length - 2]?.ageInMonths || 0, gender)
  const prevHeightP = calculatePercentile(measurements[measurements.length - 2]?.height || 0, 'height', measurements[measurements.length - 2]?.ageInMonths || 0, gender)

  const weightTrend = getTrend(weightP, prevWeightP)
  const heightTrend = getTrend(heightP, prevHeightP)

  const hasCrossedPercentile = Math.abs(weightP - prevWeightP) > 10 || Math.abs(heightP - prevHeightP) > 10

  const insights = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      text: `Arjun's weight has been ${weightTrend === 'up' ? 'tracking upward' : weightTrend === 'down' ? 'tracking slightly lower' : 'stable'} along the ${weightP}th percentile.`,
      color: 'sage',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      text: `Height percentile (${heightP}th) shows ${heightTrend === 'up' ? 'excellent growth trajectory' : heightTrend === 'down' ? 'slight decrease' : 'steady progress'}.`,
      color: heightTrend === 'up' ? 'sage' : heightTrend === 'down' ? 'coral' : 'forest',
    },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-mist/50">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-sage/20 flex items-center justify-center text-sage">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="font-display text-lg text-forest">Growth Insights</h3>
          <p className="text-sm text-forest/60">Your child's growth pattern</p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <div key={i} className="flex gap-3 p-4 bg-mist/30 rounded-xl">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-${insight.color}`}>
              {insight.icon}
            </div>
            <p className="text-sm text-forest/80 leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>

      {hasCrossedPercentile && (
        <div className="mt-4 p-4 bg-coral/10 rounded-xl border border-coral/20">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-coral mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-coral">Percentile Change Detected</p>
              <p className="text-xs text-coral/80 mt-1">
                A significant change in percentile was observed. While this can be normal, we recommend discussing this with your pediatrician at your next visit.
              </p>
            </div>
          </div>
        </div>
      )}

      {!hasCrossedPercentile && weightP >= 15 && weightP <= 85 && heightP >= 15 && heightP <= 85 && (
        <div className="mt-4 p-4 bg-sage/10 rounded-xl border border-sage/20">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-sage mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-forest">Normal Growth Pattern</p>
              <p className="text-xs text-forest/70 mt-1">
                Arjun's growth is tracking consistently within the normal range for his age. Keep up the great care!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AddMeasurementModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean
  onClose: () => void
  onSave: (measurement: Omit<Measurement, 'date'> & { date: string }) => void
}) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [headCircumference, setHeadCircumference] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!date) newErrors.date = 'Date is required'
    if (!weight) {
      newErrors.weight = 'Weight is required'
    } else {
      const w = parseFloat(weight)
      if (isNaN(w) || w < 1 || w > 30) {
        newErrors.weight = 'Weight must be between 1-30 kg'
      }
    }

    if (!height) {
      newErrors.height = 'Height is required'
    } else {
      const h = parseFloat(height)
      if (isNaN(h) || h < 30 || h > 120) {
        newErrors.height = 'Height must be between 30-120 cm'
      }
    }

    if (headCircumference) {
      const hc = parseFloat(headCircumference)
      if (isNaN(hc) || hc < 25 || hc > 60) {
        newErrors.headCircumference = 'Head circumference must be between 25-60 cm'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const birthDate = new Date('2025-02-15')
    const measurementDate = new Date(date)
    const ageMonths = Math.floor(
      (measurementDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
    )

    onSave({
      date,
      ageInMonths: ageMonths,
      weight: parseFloat(weight),
      height: parseFloat(height),
      headCircumference: headCircumference ? parseFloat(headCircumference) : 0,
    })

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onClose()
      setWeight('')
      setHeight('')
      setHeadCircumference('')
      setDate(new Date().toISOString().split('T')[0])
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-forest/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-fade-up">
        {showSuccess ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage/20 flex items-center justify-center animate-bounce">
              <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-forest mb-2">Saved!</h3>
            <p className="text-forest/60">Measurement added successfully</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-forest">Add Measurement</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-mist flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-forest/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-forest/80 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.date ? 'border-coral' : 'border-mist'} focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all`}
                />
                {errors.date && <p className="text-coral text-xs mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-forest/80 mb-2">Weight (kg)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g., 10.5"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.weight ? 'border-coral' : 'border-mist'} focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all pr-16`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-forest/40">kg</span>
                </div>
                {errors.weight && <p className="text-coral text-xs mt-1">{errors.weight}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-forest/80 mb-2">Height (cm)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g., 80.0"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.height ? 'border-coral' : 'border-mist'} focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all pr-16`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-forest/40">cm</span>
                </div>
                {errors.height && <p className="text-coral text-xs mt-1">{errors.height}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-forest/80 mb-2">
                  Head Circumference (cm) <span className="text-forest/40 font-normal">optional</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={headCircumference}
                    onChange={(e) => setHeadCircumference(e.target.value)}
                    placeholder="e.g., 47.0"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.headCircumference ? 'border-coral' : 'border-mist'} focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all pr-16`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-forest/40">cm</span>
                </div>
                {errors.headCircumference && <p className="text-coral text-xs mt-1">{errors.headCircumference}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-coral text-white font-semibold hover:bg-coral-light transition-colors"
                >
                  Save Measurement
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function GrowthChartsPage() {
  const [selectedChild, setSelectedChild] = useState<Child>(sampleChildren[0])
  const [measurements, setMeasurements] = useState<Measurement[]>(sampleMeasurements['1'])
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'height' | 'hc'>('weight')
  const [timeRange, setTimeRange] = useState<number>(12)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleChildSelect = (child: Child) => {
    setSelectedChild(child)
    setMeasurements(sampleMeasurements[child.id] || [])
  }

  const handleAddMeasurement = (measurement: Omit<Measurement, 'date' | 'ageInMonths'> & { date: string }) => {
    const birthDate = new Date(selectedChild.dateOfBirth)
    const measurementDate = new Date(measurement.date)
    const ageInMonths = Math.floor(
      (measurementDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
    )

    const newMeasurement: Measurement = {
      ...measurement,
      ageInMonths,
    }

    setMeasurements((prev) => [...prev, newMeasurement].sort((a, b) => a.ageInMonths - b.ageInMonths))
  }

  const metricOptions: { value: 'weight' | 'height' | 'hc'; label: string }[] = [
    { value: 'weight', label: 'Weight' },
    { value: 'height', label: 'Height' },
    { value: 'hc', label: 'Head Circ.' },
  ]

  const timeRangeOptions: { value: number; label: string }[] = [
    { value: 3, label: '3 mo' },
    { value: 6, label: '6 mo' },
    { value: 12, label: '1 yr' },
    { value: 0, label: 'All' },
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-forest/60 mb-2">
              <Link href="/dashboard" className="hover:text-sage transition-colors">Dashboard</Link>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>Growth Charts</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sage/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3v18h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl text-forest">Growth Monitoring</h1>
                <p className="text-forest/60 text-sm">Track your child&apos;s growth progress</p>
              </div>
            </div>
          </div>

          <ChildSelector
            children={sampleChildren}
            selectedChild={selectedChild}
            onSelect={handleChildSelect}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Metric Toggle */}
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-mist/50">
          {metricOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedMetric(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedMetric === option.value
                  ? 'bg-sage text-white shadow-sm'
                  : 'text-forest/60 hover:text-forest hover:bg-mist/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Time Range */}
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-mist/50">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === option.value
                  ? 'bg-forest text-white shadow-sm'
                  : 'text-forest/60 hover:text-forest hover:bg-mist/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Add Measurement Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-coral text-white font-medium hover:bg-coral-light transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Measurement
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-mist/50 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg text-forest">Growth Chart</h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-t from-sage to-coral" />
              <span className="text-forest/60">Latest</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sage/20" />
              <span className="text-forest/60">WHO Percentiles</span>
            </div>
          </div>
        </div>
        <GrowthChart
          measurements={measurements}
          metric={selectedMetric}
          timeRange={timeRange}
          gender={selectedChild.gender}
        />
      </div>

      {/* Percentile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <PercentileCard
          metric="weight"
          measurements={measurements}
          gender={selectedChild.gender}
        />
        <PercentileCard
          metric="height"
          measurements={measurements}
          gender={selectedChild.gender}
        />
        <PercentileCard
          metric="hc"
          measurements={measurements}
          gender={selectedChild.gender}
        />
      </div>

      {/* Insights */}
      <InsightsCard measurements={measurements} gender={selectedChild.gender} />

      {/* Add Measurement Modal */}
      <AddMeasurementModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddMeasurement}
      />
    </div>
  )
}
