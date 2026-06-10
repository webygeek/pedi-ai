'use client'

import { useState } from 'react'
import { TrendingUp, Baby, Ruler, Calendar, Info } from 'lucide-react'

interface GrowthReference {
  age: string
  heightBoys: { p3: number; p50: number; p97: number }
  heightGirls: { p3: number; p50: number; p97: number }
  weightBoys: { p3: number; p50: number; p97: number }
  weightGirls: { p3: number; p50: number; p97: number }
  bmiBoys: { p3: number; p50: number; p97: number }
  bmiGirls: { p3: number; p50: number; p97: number }
}

const growthData: GrowthReference[] = [
  { age: '0m', heightBoys: { p3: 46.1, p50: 49.9, p97: 53.7 }, heightGirls: { p3: 45.4, p50: 49.1, p97: 52.8 }, weightBoys: { p3: 2.5, p50: 3.3, p97: 4.4 }, weightGirls: { p3: 2.4, p50: 3.2, p97: 4.2 }, bmiBoys: { p3: 10.5, p50: 13.1, p97: 16.3 }, bmiGirls: { p3: 10.2, p50: 12.7, p97: 15.9 } },
  { age: '3m', heightBoys: { p3: 57.6, p50: 61.4, p97: 65.2 }, heightGirls: { p3: 56.2, p50: 59.8, p97: 63.4 }, weightBoys: { p3: 5.0, p50: 6.4, p97: 7.9 }, weightGirls: { p3: 4.5, p50: 5.8, p97: 7.2 }, bmiBoys: { p3: 13.1, p50: 15.9, p97: 18.8 }, bmiGirls: { p3: 12.5, p50: 15.2, p97: 18.1 } },
  { age: '6m', heightBoys: { p3: 63.6, p50: 67.6, p97: 71.6 }, heightGirls: { p3: 61.5, p50: 65.7, p97: 69.9 }, weightBoys: { p3: 6.6, p50: 7.9, p97: 9.5 }, weightGirls: { p3: 6.0, p50: 7.3, p97: 8.8 }, bmiBoys: { p3: 14.2, p50: 16.6, p97: 19.5 }, bmiGirls: { p3: 13.6, p50: 16.0, p97: 18.9 } },
  { age: '12m', heightBoys: { p3: 71.3, p50: 75.7, p97: 80.1 }, heightGirls: { p3: 69.2, p50: 74.0, p97: 78.8 }, weightBoys: { p3: 8.3, p50: 10.1, p97: 12.2 }, weightGirls: { p3: 7.6, p50: 9.5, p97: 11.5 }, bmiBoys: { p3: 14.6, p50: 16.9, p97: 19.6 }, bmiGirls: { p3: 14.0, p50: 16.3, p97: 19.1 } },
  { age: '2y', heightBoys: { p3: 82.1, p50: 87.8, p97: 93.5 }, heightGirls: { p3: 80.0, p50: 86.4, p97: 92.8 }, weightBoys: { p3: 10.3, p50: 12.7, p97: 15.4 }, weightGirls: { p3: 9.7, p50: 12.2, p97: 14.9 }, bmiBoys: { p3: 13.7, p50: 15.9, p97: 18.3 }, bmiGirls: { p3: 13.4, p50: 15.6, p97: 18.2 } },
  { age: '3y', heightBoys: { p3: 90.0, p50: 96.1, p97: 102.2 }, heightGirls: { p3: 88.3, p50: 95.1, p97: 101.9 }, weightBoys: { p3: 12.6, p50: 15.1, p97: 18.3 }, weightGirls: { p3: 12.1, p50: 14.8, p97: 18.1 }, bmiBoys: { p3: 13.5, p50: 15.6, p97: 18.1 }, bmiGirls: { p3: 13.3, p50: 15.4, p97: 18.1 } },
  { age: '4y', heightBoys: { p3: 96.1, p50: 103.3, p97: 110.5 }, heightGirls: { p3: 94.6, p50: 102.7, p97: 110.8 }, weightBoys: { p3: 14.2, p50: 17.3, p97: 21.2 }, weightGirls: { p3: 13.6, p50: 17.0, p97: 21.5 }, bmiBoys: { p3: 13.4, p50: 15.4, p97: 17.9 }, bmiGirls: { p3: 13.2, p50: 15.3, p97: 18.0 } },
  { age: '5y', heightBoys: { p3: 101.8, p50: 110.0, p97: 118.2 }, heightGirls: { p3: 100.4, p50: 109.4, p97: 118.4 }, weightBoys: { p3: 15.7, p50: 19.4, p97: 24.2 }, weightGirls: { p3: 15.1, p50: 19.0, p97: 24.9 }, bmiBoys: { p3: 13.4, p50: 15.3, p97: 17.8 }, bmiGirls: { p3: 13.1, p50: 15.2, p97: 18.0 } },
]

function getDataForGender<T>(data: GrowthReference, gender: 'boys' | 'girls', getter: (d: GrowthReference) => T): T {
  return getter(data)
}

export default function GrowthReferencePage() {
  const [selectedAge, setSelectedAge] = useState('12m')
  const [selectedGender, setSelectedGender] = useState<'boys' | 'girls'>('boys')

  const currentData = growthData.find(d => d.age === selectedAge) || growthData[0]

  const getHeight = (data: GrowthReference) => selectedGender === 'boys' ? data.heightBoys : data.heightGirls
  const getWeight = (data: GrowthReference) => selectedGender === 'boys' ? data.weightBoys : data.weightGirls
  const getBmi = (data: GrowthReference) => selectedGender === 'boys' ? data.bmiBoys : data.bmiGirls

  const height = getHeight(currentData)
  const weight = getWeight(currentData)
  const bmi = getBmi(currentData)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-forest">Growth Reference Charts</h1>
          <p className="text-forest/60 mt-1">WHO Child Growth Standards for clinical reference</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <Info className="w-4 h-4 text-blue-600" />
          <span className="text-blue-800">Based on WHO Standards 2006</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Baby, label: 'Age Range', value: 'Birth to 5 Years' },
          { icon: Ruler, label: 'Measurements', value: 'cm and kg' },
          { icon: TrendingUp, label: 'Percentiles', value: 'P3, P50, P97' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-mist/50 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-sage" />
            </div>
            <div>
              <p className="text-xs text-forest/50">{stat.label}</p>
              <p className="text-sm font-medium text-forest">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm">
        <div className="flex flex-wrap gap-6">
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-forest mb-2">Gender</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedGender('boys')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedGender === 'boys'
                    ? 'bg-blue-500 text-white'
                    : 'bg-cream text-forest hover:bg-mist'
                }`}
              >
                Boys
              </button>
              <button
                onClick={() => setSelectedGender('girls')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedGender === 'girls'
                    ? 'bg-pink-500 text-white'
                    : 'bg-cream text-forest hover:bg-mist'
                }`}
              >
                Girls
              </button>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-forest mb-2">Age</label>
            <div className="flex flex-wrap gap-2">
              {growthData.map((data) => (
                <button
                  key={data.age}
                  onClick={() => setSelectedAge(data.age)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedAge === data.age
                      ? 'bg-[#2c4a45] text-white'
                      : 'bg-cream text-forest hover:bg-mist'
                  }`}
                >
                  {data.age}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Growth Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Height */}
        <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Ruler className="w-5 h-5 text-sage" />
            <h3 className="font-display text-lg text-forest">Height (cm)</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
              <span className="text-sm text-forest/60">3rd Percentile</span>
              <span className="font-bold text-forest">{height.p3}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-sage/10 rounded-xl">
              <span className="text-sm text-forest/60">50th Percentile</span>
              <span className="font-bold text-sage">{height.p50}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
              <span className="text-sm text-forest/60">97th Percentile</span>
              <span className="font-bold text-forest">{height.p97}</span>
            </div>
          </div>
        </div>

        {/* Weight */}
        <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-sage" />
            <h3 className="font-display text-lg text-forest">Weight (kg)</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
              <span className="text-sm text-forest/60">3rd Percentile</span>
              <span className="font-bold text-forest">{weight.p3}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-sage/10 rounded-xl">
              <span className="text-sm text-forest/60">50th Percentile</span>
              <span className="font-bold text-sage">{weight.p50}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
              <span className="text-sm text-forest/60">97th Percentile</span>
              <span className="font-bold text-forest">{weight.p97}</span>
            </div>
          </div>
        </div>

        {/* BMI */}
        <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-sage" />
            <h3 className="font-display text-lg text-forest">BMI (kg/m²)</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
              <span className="text-sm text-forest/60">3rd Percentile</span>
              <span className="font-bold text-forest">{bmi.p3}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-sage/10 rounded-xl">
              <span className="text-sm text-forest/60">50th Percentile</span>
              <span className="font-bold text-sage">{bmi.p50}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
              <span className="text-sm text-forest/60">97th Percentile</span>
              <span className="font-bold text-forest">{bmi.p97}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Table */}
      <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm overflow-x-auto">
        <h3 className="font-display text-lg text-forest mb-4">
          Complete Reference Table - {selectedGender === 'boys' ? 'Boys' : 'Girls'}
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-mist/50">
              <th className="text-left py-3 px-4 font-medium text-forest">Age</th>
              <th className="text-right py-3 px-4 font-medium text-forest">P3</th>
              <th className="text-right py-3 px-4 font-medium text-sage">P50</th>
              <th className="text-right py-3 px-4 font-medium text-forest">P97</th>
            </tr>
          </thead>
          <tbody>
            {growthData.map((row) => {
              const h = selectedGender === 'boys' ? row.heightBoys : row.heightGirls
              return (
                <tr key={row.age} className={`border-b border-mist/30 ${selectedAge === row.age ? 'bg-sage/5' : ''}`}>
                  <td className="py-3 px-4 font-medium text-forest">{row.age}</td>
                  <td className="py-3 px-4 text-right text-forest/70">{h.p3}</td>
                  <td className="py-3 px-4 text-right font-medium text-sage">{h.p50}</td>
                  <td className="py-3 px-4 text-right text-forest/70">{h.p97}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Z-Score Interpretation */}
      <div className="bg-gradient-to-r from-sage/10 to-cream rounded-2xl p-6 border border-sage/20">
        <h3 className="font-display text-lg text-forest mb-4">Understanding Z-Scores</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          {[
            { range: '> +3 SD', color: 'bg-red-100 text-red-800', label: 'Obese/Excessively tall' },
            { range: '+2 to +3 SD', color: 'bg-amber-100 text-amber-800', label: 'Overweight/Tall' },
            { range: '-2 to +2 SD', color: 'bg-green-100 text-green-800', label: 'Normal range' },
            { range: '< -3 SD', color: 'bg-red-100 text-red-800', label: 'Severe wasting/short' },
          ].map((item, idx) => (
            <div key={idx} className={`p-3 rounded-xl ${item.color}`}>
              <p className="font-semibold">{item.range}</p>
              <p className="text-xs opacity-80 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
