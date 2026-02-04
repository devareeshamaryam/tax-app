 'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';

// Define tax categories with their respective items
const TAX_CATEGORIES = {
  'Sale of rice': { rate: 0.015, description: 'Rice products' },
  'Sale of cottonseed': { rate: 0.015, description: 'Cottonseed products' },
  'Sale of edible oil': { rate: 0.02, description: 'Edible oil products' },
  'Sale of cigarettes': { rate: 0.02, description: 'Cigarette products' },
  'Sale of pharma products': { rate: 0.02, description: 'Pharmaceutical products' },
  'Sale of gold & silver': { rate: 0.02, description: 'Precious metals' },
  'Sale of FMCG': { rate: 0.025, description: 'Fast-moving consumer goods' },
  'Sale of fertilizer': { rate: 0.025, description: 'Fertilizer products' },
  'Sale of electronics excluding mobile phones': { rate: 0.03, description: 'Electronics (non-mobile)' },
  'Sale of sugar': { rate: 0.03, description: 'Sugar products' },
  'Sale of cement steel & edible oil by distributors': { rate: 0.04, description: 'Cement, steel & edible oil distribution' },
  'Sales of dealers, sub-dealers, wholesalers & retailers': { rate: 0.05, description: 'Retail & wholesale operations' },
  'Sale of other goods by companies including toll manufacturers': { rate: 0.05, description: 'Company sales including toll manufacturing' },
  'Sale of other goods by AOPs & Individual Including toll manufacturers': { rate: 0.10, description: 'AOP & individual sales including toll manufacturing' },
  'Sales & supplies by taxpayers in Textile & articles thereof': { rate: 0.15, description: 'Textile products and articles' },
  'Sales & supplies by taxpayers in Carpets': { rate: 0.15, description: 'Carpet products' },
  'Sales & supplies by taxpayers in Leather & articles thereof': { rate: 0.15, description: 'Leather products and articles' },
  'Sales & supplies by taxpayers in Artificial leather': { rate: 0.15, description: 'Artificial leather products' },
  'Sales & supplies by taxpayers in Footwear': { rate: 0.15, description: 'Footwear products' },
  'Sales & supplies by taxpayers in Surgical goods': { rate: 0.15, description: 'Surgical equipment and goods' },
  'Sales & supplies by taxpayers in Sports goods': { rate: 0.15, description: 'Sports equipment and goods' },
  'Local supplies by yarn traders to above mentioned sectors': { rate: 0.15, description: 'Yarn supplies to specified sectors' }
};

const ATL_CATEGORIES = [
  'ATL',
  'Non-ATL (Filer)',
  'Non-ATL (Non-Filer)'
];

export default function SupplyGoodsPage() {
  const [netProfit, setNetProfit] = useState<string>('');
  const [atlCategory, setAtlCategory] = useState<string>('ATL');
  const [selectedCategory, setSelectedCategory] = useState<string>('Sale of rice');
  const [results, setResults] = useState<{
    netProfit: number;
    taxableIncome: number;
    totalTax: number;
    incomeAfterTax: number;
    effectiveRate: number;
  }>({
    netProfit: 0,
    taxableIncome: 0,
    totalTax: 0,
    incomeAfterTax: 0,
    effectiveRate: 0
  });

  const calculateSupplyTax = () => {
    const profit = parseFloat(netProfit) || 0;
    
    if (profit === 0) {
      alert('Please enter net profit');
      return;
    }

    // Get the tax rate for selected category
    const categoryData = TAX_CATEGORIES[selectedCategory as keyof typeof TAX_CATEGORIES];
    let taxRate = categoryData?.rate || 0.05;

    // Adjust tax rate based on ATL category
    if (atlCategory === 'Non-ATL (Filer)') {
      taxRate = taxRate * 2; // Double tax for non-ATL filers
    } else if (atlCategory === 'Non-ATL (Non-Filer)') {
      taxRate = taxRate * 4; // Quadruple tax for non-ATL non-filers
    }

    const taxableIncome = profit;
    const totalTax = profit * taxRate;
    const incomeAfterTax = profit - totalTax;
    const effectiveRate = (totalTax / profit) * 100;

    setResults({
      netProfit: Math.round(profit),
      taxableIncome: Math.round(taxableIncome),
      totalTax: Math.round(totalTax),
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
            {/* Left Side - Supply of Goods Tax Calculator Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-5 border border-gray-200 max-w-sm mx-auto lg:mx-0">
              <div className="text-center mb-5">
                <h2 className="text-2xl font-bold text-black mb-1">
                  SUPPLY OF GOODS TAX
                </h2>
                <p className="text-gray-600 text-xs">
                  Calculate tax for supply of goods in Pakistan
                </p>
              </div>

              {/* Net Profit Input */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-black mb-1.5">
                  Net Profit (PKR)
                </label>
                <input
                  type="number"
                  value={netProfit}
                  onChange={(e) => setNetProfit(e.target.value)}
                  placeholder="Enter net profit"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-sm text-black"
                />
              </div>

              {/* ATL Category Dropdown */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-black mb-1.5">
                  ATL Category
                </label>
                <select
                  value={atlCategory}
                  onChange={(e) => setAtlCategory(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-sm text-black bg-white cursor-pointer"
                >
                  {ATL_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Selection Dropdown */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-black mb-1.5">
                  Choose Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-sm text-black bg-white cursor-pointer max-h-48 overflow-y-auto"
                >
                  {Object.keys(TAX_CATEGORIES).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateSupplyTax}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 text-sm"
              >
                Calculate Tax
              </button>

              {/* Results - Always Visible */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-black font-medium text-xs">Taxable Income</span>
                  <span className="text-black font-bold text-sm">{formatNumber(results.taxableIncome)}</span>
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
                    Supply of Goods Tax Calculator
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">Pakistan 2024-2025</p>
                </div>

                <Image
                  src="/goods.png"
                  alt="Supply of Goods Tax Calculator"
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