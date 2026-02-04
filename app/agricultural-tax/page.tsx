 'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';

// Tax slab information for Punjab Agricultural Income
const TAX_SLABS = [
  { limit: 600000, rate: 0, label: 'Up to 600,000', description: '0% (tax free)' },
  { limit: 1200000, rate: 0.15, label: '600,001 – 1,200,000', description: '15%' },
  { limit: 1600000, rate: 0.20, label: '1,200,001 – 1,600,000', description: '20%' },
  { limit: 3200000, rate: 0.30, label: '1,600,001 – 3,200,000', description: '30%' },
  { limit: 5600000, rate: 0.40, label: '3,200,001 – 5,600,000', description: '40%' },
  { limit: Infinity, rate: 0.45, label: 'Above 5,600,000', description: '45%' }
];

const YEARS = [
  '2025-2026'
];

export default function AgricultureTaxPage() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('2025-2026');
  const [results, setResults] = useState<{
    monthlyIncome: number;
    monthlyTax: number;
    incomeAfterTax: number;
    yearlyIncome: number;
    yearlyTax: number;
    yearlyIncomeAfterTax: number;
  }>({
    monthlyIncome: 0,
    monthlyTax: 0,
    incomeAfterTax: 0,
    yearlyIncome: 0,
    yearlyTax: 0,
    yearlyIncomeAfterTax: 0
  });

  const calculateAgricultureTax = (annualIncome: number): number => {
    let tax = 0;

    if (annualIncome <= 600000) {
      tax = 0; // 0% tax free
    } else if (annualIncome <= 1200000) {
      tax = (annualIncome - 600000) * 0.15; // 15%
    } else if (annualIncome <= 1600000) {
      tax = 90000 + (annualIncome - 1200000) * 0.20; // 15% on first bracket + 20%
    } else if (annualIncome <= 3200000) {
      tax = 90000 + 80000 + (annualIncome - 1600000) * 0.30; // Previous + 30%
    } else if (annualIncome <= 5600000) {
      tax = 90000 + 80000 + 480000 + (annualIncome - 3200000) * 0.40; // Previous + 40%
    } else {
      tax = 90000 + 80000 + 480000 + 960000 + (annualIncome - 5600000) * 0.45; // Previous + 45%
    }

    return tax;
  };

  const calculateTax = () => {
    const monthly = parseFloat(monthlyIncome) || 0;
    
    if (monthly === 0) {
      alert('Please enter monthly income');
      return;
    }

    const yearly = monthly * 12;
    const yearlyTaxAmount = calculateAgricultureTax(yearly);
    const monthlyTaxAmount = yearlyTaxAmount / 12;

    setResults({
      monthlyIncome: Math.round(monthly),
      monthlyTax: Math.round(monthlyTaxAmount),
      incomeAfterTax: Math.round(monthly - monthlyTaxAmount),
      yearlyIncome: Math.round(yearly),
      yearlyTax: Math.round(yearlyTaxAmount),
      yearlyIncomeAfterTax: Math.round(yearly - yearlyTaxAmount)
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <>
      <Header />
      <section className="pt-32 pb-20 bg-white">
         

          <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
            {/* Left Side - Agriculture Tax Calculator Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-5 border border-gray-200 max-w-sm mx-auto lg:mx-0">
              {/* Monthly Income Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Monthly Income
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="Enter monthly income"
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-base text-black"
                />
              </div>

              {/* Year Selection Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Choose Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-base text-black bg-white cursor-pointer"
                >
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateTax}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 text-sm mb-5"
              >
                Calculate Tax
              </button>

              {/* Results - Always Visible */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-gray-800 font-medium text-sm">Monthly Income</span>
                  <span className="text-black font-semibold text-base">{formatNumber(results.monthlyIncome)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-gray-800 font-medium text-sm">Monthly Tax</span>
                  <span className="text-black font-semibold text-base">{formatNumber(results.monthlyTax)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-gray-800 font-medium text-sm">Income After Tax</span>
                  <span className="text-black font-semibold text-base">{formatNumber(results.incomeAfterTax)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-gray-800 font-medium text-sm">Yearly Income</span>
                  <span className="text-black font-semibold text-base">{formatNumber(results.yearlyIncome)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-gray-800 font-medium text-sm">Yearly Tax</span>
                  <span className="text-black font-semibold text-base">{formatNumber(results.yearlyTax)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-800 font-medium text-sm">Yearly Income After Tax</span>
                  <span className="text-black font-semibold text-base">{formatNumber(results.yearlyIncomeAfterTax)}</span>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration with Text Overlay */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-lg">
                {/* Text Overlay on Top Center */}
                <div className="absolute top-0 left-0 right-0 text-center p-4 z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-black drop-shadow-lg">
                    Punjab Agricultural Income Tax Calculator
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">Pakistan 2025-2026</p>
                </div>

                <Image
                  src="/arg.png"
                  alt="Punjab Agricultural Income Tax Calculator"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
       </section>
    </>
  );
}