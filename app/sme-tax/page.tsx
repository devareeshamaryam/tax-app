 'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';

// NTR Options
const NTR_OPTIONS = [
  'Standard Tax on Profit (Normal Regime)',
  'Final Tax Regime (FTR) on Gross Turnover'
];

export default function SpecialRegimePage() {
  const [selectedNTR, setSelectedNTR] = useState<string>('Standard Tax on Profit (Normal Regime)');
  const [grossTurnover, setGrossTurnover] = useState<string>('');
  const [results, setResults] = useState<{
    grossTurnover: number;
    taxableIncome: number;
    totalTax: number;
    taxRate: number;
  }>({
    grossTurnover: 0,
    taxableIncome: 0,
    totalTax: 0,
    taxRate: 0
  });

  const calculateTax = () => {
    const turnover = parseFloat(grossTurnover) || 0;
    
    if (turnover === 0) {
      alert('Please enter gross turnover');
      return;
    }

    let taxRate = 0;
    let totalTax = 0;

    if (selectedNTR === 'Standard Tax on Profit (Normal Regime)') {
      // Standard Tax on Profit
      if (turnover <= 100000000) { // Up to 100 million
        taxRate = 7.5;
        totalTax = turnover * 0.075;
      } else if (turnover <= 250000000) { // 100M - 250M
        taxRate = 15;
        totalTax = turnover * 0.15;
      } else {
        taxRate = 15;
        totalTax = turnover * 0.15;
      }
    } else {
      // Final Tax Regime (FTR) on Gross Turnover
      if (turnover <= 100000000) { // Up to 100 million
        taxRate = 0.25;
        totalTax = turnover * 0.0025;
      } else if (turnover <= 250000000) { // 100M - 250M
        taxRate = 0.50;
        totalTax = turnover * 0.005;
      } else {
        taxRate = 0.50;
        totalTax = turnover * 0.005;
      }
    }

    setResults({
      grossTurnover: Math.round(turnover),
      taxableIncome: Math.round(turnover),
      totalTax: Math.round(totalTax),
      taxRate: taxRate
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
            {/* Left Side - Special Regime Tax Calculator Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-5 border border-gray-200 max-w-sm mx-auto lg:mx-0">
              {/* NTR Selection Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  NTR
                </label>
                <select
                  value={selectedNTR}
                  onChange={(e) => setSelectedNTR(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-base text-black bg-white cursor-pointer"
                >
                  {NTR_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option === 'Standard Tax on Profit (Normal Regime)' ? 'Standard Tax on Profit (Normal Regime)' : 'Final Tax Regime (FTR) on Gross Turnover'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gross Turnover Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Gross Turnover
                </label>
                <input
                  type="number"
                  value={grossTurnover}
                  onChange={(e) => setGrossTurnover(e.target.value)}
                  placeholder="Enter gross turnover"
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-base text-black"
                />
              </div>

              {/* Taxable Income Display (optional, can be same as gross turnover) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Taxable Income
                </label>
                <input
                  type="text"
                  value={formatNumber(results.taxableIncome)}
                  placeholder="Taxable income"
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg bg-gray-50 text-base text-black"
                  readOnly
                />
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
                  <span className="text-gray-800 font-medium text-sm">Taxable Income</span>
                  <span className="text-black font-semibold text-base">{formatNumber(results.taxableIncome)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-gray-800 font-medium text-sm">Total Tax</span>
                  <span className="text-black font-semibold text-base">{formatNumber(results.totalTax)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-800 font-medium text-sm">Tax Rate</span>
                  <span className="text-black font-semibold text-base">{results.taxRate}%</span>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration with Text Overlay */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-lg">
                {/* Text Overlay on Top Center */}
                <div className="absolute top-0 left-0 right-0 text-center p-4 z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-black drop-shadow-lg">
                    Special Tax Regime Small & Medium Enterprises
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">Pakistan 2025-2026</p>
                </div>

                <Image
                  src="/smetax.png"
                  alt="Special Tax Regime SME Calculator"
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