'use client'

import { useEffect, useRef } from 'react'

export function PhoneMockup() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bars = chartRef.current?.querySelectorAll('.chart-bar')
    if (bars) {
      setTimeout(() => {
        bars.forEach((bar) => {
          const height = bar.getAttribute('data-height')
          if (height) {
            ;(bar as HTMLElement).style.height = `${height}%`
          }
        })
      }, 500)
    }
  }, [])

  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="w-[320px] h-[650px] bg-white rounded-[40px] shadow-[0_40px_80px_rgba(44,74,69,0.15),0_0_0_1px_rgba(44,74,69,0.05)] p-3 relative z-10">
        <div className="w-full h-full bg-cream rounded-[32px] overflow-hidden">
          {/* Header */}
          <div className="bg-forest text-white p-5">
            <h3 className="font-display text-lg">Arjun&apos;s Dashboard</h3>
            <p className="text-xs opacity-70">14 months old</p>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Weight Card */}
            <div className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-sm text-forest">Weight</span>
                <span className="badge badge-success">On track</span>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-display text-3xl text-forest">10.2</span>
                <span className="text-sm text-forest/60">kg</span>
              </div>
              {/* Chart */}
              <div className="h-[60px] bg-mist rounded-xl flex items-end p-2 gap-1.5" ref={chartRef}>
                {[35, 48, 57, 69, 81, 100].map((height, i) => (
                  <div
                    key={i}
                    className={`chart-bar flex-1 rounded-t transition-all duration-500 ease-out ${i === 5 ? 'bg-coral' : 'bg-sage'}`}
                    data-height={height}
                    style={{ height: '4px' }}
                  />
                ))}
              </div>
            </div>

            {/* Milestone Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-sm text-forest">Next Milestone</span>
                <span className="badge badge-coral">Due 15m</span>
              </div>
              <p className="text-sm text-forest">Stands without support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-8 bg-white rounded-2xl p-4 shadow-lg flex items-center gap-3 z-20 animate-float hidden lg:flex">
        <div className="w-10 h-10 bg-mist rounded-xl flex items-center justify-center text-2xl">🩺</div>
        <div>
          <p className="font-semibold text-sm text-forest">Symptom Check</p>
          <p className="text-xs text-sage">Under 60 seconds</p>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl p-4 shadow-lg flex items-center gap-3 z-20 animate-float hidden lg:flex" style={{ animationDelay: '1s' }}>
        <div className="w-10 h-10 bg-mist rounded-xl flex items-center justify-center text-2xl">📊</div>
        <div>
          <p className="font-semibold text-sm text-forest">Growth Tracking</p>
          <p className="text-xs text-sage">WHO percentiles</p>
        </div>
      </div>
    </div>
  )
}
