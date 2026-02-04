 'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';

export default function AOPBusinessPage() {
  const [annualIncome, setAnnualIncome] = useState<string>('');
  const [results, setResults] = useState<{
    annualIncome: number;
    taxableIncome: number;
    totalTax: number;
    incomeAfterTax: number;
    effectiveRate: number;
  }>({
    annualIncome: 0,
    taxableIncome: 0,
    totalTax: 0,
    incomeAfterTax: 0,
    effectiveRate: 0
  });

  const calculateBusinessTax = () => {
    const income = parseFloat(annualIncome) || 0;
    
    if (income === 0) {
      alert('Please enter annual taxable income');
      return;
    }

    let tax = 0;

    // Tax calculation based on AOP & Business slabs
    if (income <= 600000) {
      tax = 0; // 0% tax free
    } else if (income <= 1200000) {
      tax = (income - 600000) * 0.15; // 15%
    } else if (income <= 1600000) {
      tax = 90000 + (income - 1200000) * 0.20; // 15% on first bracket + 20%
    } else if (income <= 3200000) {
      tax = 90000 + 80000 + (income - 1600000) * 0.30; // Previous + 30%
    } else if (income <= 5600000) {
      tax = 90000 + 80000 + 480000 + (income - 3200000) * 0.40; // Previous + 40%
    } else {
      tax = 90000 + 80000 + 480000 + 960000 + (income - 5600000) * 0.45; // Previous + 45%
    }

    const incomeAfterTax = income - tax;
    const effectiveRate = (tax / income) * 100;

    setResults({
      annualIncome: Math.round(income),
      taxableIncome: Math.round(income),
      totalTax: Math.round(tax),
      incomeAfterTax: Math.round(incomeAfterTax),
      effectiveRate: parseFloat(effectiveRate.toFixed(2))
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <>
      <Header />
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
            {/* Left Side - AOP & Business Tax Calculator Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-5 border border-gray-200 max-w-sm mx-auto lg:mx-0">
              <div className="text-center mb-5">
                <h2 className="text-2xl font-bold text-black mb-1">
                  AOP & BUSINESS TAX
                </h2>
                <p className="text-gray-600 text-xs">
                  Calculate tax for business and AOP income
                </p>
              </div>

              {/* Annual Income Input */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-black mb-1.5">
                  Annual Taxable Income (PKR)
                </label>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  placeholder="Enter annual income"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-sm text-black"
                />
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateBusinessTax}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 text-sm"
              >
                Calculate Tax
              </button>

              {/* Results - Always Visible */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-black font-medium text-xs">Annual Income</span>
                  <span className="text-black font-bold text-sm">{formatNumber(results.annualIncome)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-black font-medium text-xs">Total Tax</span>
                  <span className="text-black font-bold text-sm">{formatNumber(results.totalTax)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-black font-medium text-xs">Income After Tax</span>
                  <span className="text-black font-bold text-sm">{formatNumber(results.incomeAfterTax)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-black font-medium text-xs">Effective Tax Rate</span>
                  <span className="text-black font-bold text-sm">{results.effectiveRate}%</span>
                </div>
              </div>

             </div>

            {/* Right Side - Illustration with Text Overlay */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-lg">
                {/* Text Overlay on Top Center */}
                <div className="absolute top-0 left-0 right-0 text-center p-4 z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-black drop-shadow-lg">
                    AOP & Business Tax Calculator
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">Pakistan 2024-2025</p>
                </div>

                <Image
                  src="/aop.png"
                  alt="AOP & Business Tax Calculator"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}