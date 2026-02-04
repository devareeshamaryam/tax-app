 'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function IncomeTaxSection() {
  const [salary, setSalary] = useState<string>('');
  const [taxYear, setTaxYear] = useState<string>('2025-2026');
  const [results, setResults] = useState<{
    monthlyIncome: number;
    monthlyTax: number;
    monthlyIncomeAfterTax: number;
    yearlyIncome: number;
    yearlyTax: number;
    yearlyIncomeAfterTax: number;
  }>({
    monthlyIncome: 0,
    monthlyTax: 0,
    monthlyIncomeAfterTax: 0,
    yearlyIncome: 0,
    yearlyTax: 0,
    yearlyIncomeAfterTax: 0
  });

  // Generate years from 2014 (FY 2015-16) to 2025 (FY 2026-27)
  const generateYears = () => {
    const years = [];
    for (let year = 2025; year >= 2014; year--) {
      years.push(`${year}-${year + 1}`);
    }
    return years;
  };

  const calculateTax = () => {
    const monthlySalary = parseFloat(salary) || 0;
    const annualSalary = monthlySalary * 12;
    
    let yearlyTax = 0;
    const year = taxYear.split('-')[0]; // Get starting year from "2023-2024" format
    
    // Tax calculation based on year
    switch(year) {
      case '2025': // FY 2026-27 (Latest)
        if (annualSalary <= 600000) {
          yearlyTax = 0;
        } else if (annualSalary <= 1200000) {
          yearlyTax = (annualSalary - 600000) * 0.01;
        } else if (annualSalary <= 2200000) {
          yearlyTax = 6000 + (annualSalary - 1200000) * 0.11;
        } else if (annualSalary <= 3200000) {
          yearlyTax = 116000 + (annualSalary - 2200000) * 0.23;
        } else if (annualSalary <= 4100000) {
          yearlyTax = 346000 + (annualSalary - 3200000) * 0.30;
        } else {
          yearlyTax = 616000 + (annualSalary - 4100000) * 0.35;
        }
        break;
        
      case '2024': // FY 2025-26
        if (annualSalary <= 600000) {
          yearlyTax = 0;
        } else if (annualSalary <= 1200000) {
          yearlyTax = (annualSalary - 600000) * 0.01;
        } else if (annualSalary <= 2200000) {
          yearlyTax = 6000 + (annualSalary - 1200000) * 0.11;
        } else if (annualSalary <= 3200000) {
          yearlyTax = 116000 + (annualSalary - 2200000) * 0.23;
        } else if (annualSalary <= 4100000) {
          yearlyTax = 346000 + (annualSalary - 3200000) * 0.30;
        } else {
          yearlyTax = 616000 + (annualSalary - 4100000) * 0.35;
        }
        break;
        
      case '2023': // FY 2024-25 (similar to 2023-24)
        if (annualSalary <= 600000) {
          yearlyTax = 0;
        } else if (annualSalary <= 1200000) {
          yearlyTax = (annualSalary - 600000) * 0.025;
        } else if (annualSalary <= 2400000) {
          yearlyTax = 15000 + (annualSalary - 1200000) * 0.125;
        } else if (annualSalary <= 3600000) {
          yearlyTax = 165000 + (annualSalary - 2400000) * 0.225;
        } else if (annualSalary <= 6000000) {
          yearlyTax = 435000 + (annualSalary - 3600000) * 0.275;
        } else {
          yearlyTax = 1095000 + (annualSalary - 6000000) * 0.35;
        }
        break;
        
      case '2022': // FY 2023-24
        if (annualSalary <= 600000) {
          yearlyTax = 0;
        } else if (annualSalary <= 1200000) {
          yearlyTax = (annualSalary - 600000) * 0.025;
        } else if (annualSalary <= 2400000) {
          yearlyTax = 15000 + (annualSalary - 1200000) * 0.125;
        } else if (annualSalary <= 3600000) {
          yearlyTax = 165000 + (annualSalary - 2400000) * 0.225;
        } else if (annualSalary <= 6000000) {
          yearlyTax = 435000 + (annualSalary - 3600000) * 0.275;
        } else {
          yearlyTax = 1095000 + (annualSalary - 6000000) * 0.35;
        }
        break;
        
      case '2021': // FY 2022-23 (Progressive structure)
        if (annualSalary <= 600000) {
          yearlyTax = 0;
        } else if (annualSalary <= 1200000) {
          yearlyTax = (annualSalary - 600000) * 0.05;
        } else if (annualSalary <= 2400000) {
          yearlyTax = 30000 + (annualSalary - 1200000) * 0.15;
        } else if (annualSalary <= 3600000) {
          yearlyTax = 210000 + (annualSalary - 2400000) * 0.25;
        } else if (annualSalary <= 6000000) {
          yearlyTax = 510000 + (annualSalary - 3600000) * 0.30;
        } else {
          yearlyTax = 1230000 + (annualSalary - 6000000) * 0.35;
        }
        break;
        
      case '2020': // FY 2021-22
        if (annualSalary <= 600000) {
          yearlyTax = 0;
        } else if (annualSalary <= 1200000) {
          yearlyTax = (annualSalary - 600000) * 0.05;
        } else if (annualSalary <= 1800000) {
          yearlyTax = 30000 + (annualSalary - 1200000) * 0.10;
        } else if (annualSalary <= 2500000) {
          yearlyTax = 90000 + (annualSalary - 1800000) * 0.15;
        } else if (annualSalary <= 3500000) {
          yearlyTax = 195000 + (annualSalary - 2500000) * 0.175;
        } else if (annualSalary <= 5000000) {
          yearlyTax = 370000 + (annualSalary - 3500000) * 0.20;
        } else if (annualSalary <= 8000000) {
          yearlyTax = 670000 + (annualSalary - 5000000) * 0.225;
        } else if (annualSalary <= 12000000) {
          yearlyTax = 1345000 + (annualSalary - 8000000) * 0.25;
        } else if (annualSalary <= 30000000) {
          yearlyTax = 2345000 + (annualSalary - 12000000) * 0.275;
        } else if (annualSalary <= 50000000) {
          yearlyTax = 7295000 + (annualSalary - 30000000) * 0.30;
        } else if (annualSalary <= 75000000) {
          yearlyTax = 13295000 + (annualSalary - 50000000) * 0.325;
        } else {
          yearlyTax = 21420000 + (annualSalary - 75000000) * 0.35;
        }
        break;
        
      case '2019': // FY 2020-21
        if (annualSalary <= 600000) {
          yearlyTax = 0;
        } else if (annualSalary <= 1200000) {
          yearlyTax = (annualSalary - 600000) * 0.05;
        } else if (annualSalary <= 2400000) {
          yearlyTax = 30000 + (annualSalary - 1200000) * 0.10;
        } else if (annualSalary <= 3600000) {
          yearlyTax = 150000 + (annualSalary - 2400000) * 0.15;
        } else if (annualSalary <= 6000000) {
          yearlyTax = 330000 + (annualSalary - 3600000) * 0.175;
        } else if (annualSalary <= 12000000) {
          yearlyTax = 750000 + (annualSalary - 6000000) * 0.20;
        } else {
          yearlyTax = 1950000 + (annualSalary - 12000000) * 0.25;
        }
        break;
        
      case '2018': // FY 2019-20
        if (annualSalary <= 400000) {
          yearlyTax = 0;
        } else if (annualSalary <= 800000) {
          yearlyTax = (annualSalary - 400000) * 0.05;
        } else if (annualSalary <= 1200000) {
          yearlyTax = 20000 + (annualSalary - 800000) * 0.10;
        } else if (annualSalary <= 2400000) {
          yearlyTax = 60000 + (annualSalary - 1200000) * 0.15;
        } else if (annualSalary <= 3600000) {
          yearlyTax = 240000 + (annualSalary - 2400000) * 0.175;
        } else if (annualSalary <= 6000000) {
          yearlyTax = 450000 + (annualSalary - 3600000) * 0.20;
        } else if (annualSalary <= 12000000) {
          yearlyTax = 930000 + (annualSalary - 6000000) * 0.225;
        } else {
          yearlyTax = 2280000 + (annualSalary - 12000000) * 0.25;
        }
        break;
        
      case '2017': // FY 2018-19
        if (annualSalary <= 400000) {
          yearlyTax = 0;
        } else if (annualSalary <= 750000) {
          yearlyTax = (annualSalary - 400000) * 0.05;
        } else if (annualSalary <= 1500000) {
          yearlyTax = 17500 + (annualSalary - 750000) * 0.10;
        } else if (annualSalary <= 2500000) {
          yearlyTax = 92500 + (annualSalary - 1500000) * 0.15;
        } else if (annualSalary <= 3500000) {
          yearlyTax = 242500 + (annualSalary - 2500000) * 0.175;
        } else if (annualSalary <= 5000000) {
          yearlyTax = 417500 + (annualSalary - 3500000) * 0.20;
        } else if (annualSalary <= 8000000) {
          yearlyTax = 717500 + (annualSalary - 5000000) * 0.225;
        } else if (annualSalary <= 12000000) {
          yearlyTax = 1392500 + (annualSalary - 8000000) * 0.25;
        } else {
          yearlyTax = 2392500 + (annualSalary - 12000000) * 0.30;
        }
        break;
        
      case '2016': // FY 2017-18
        if (annualSalary <= 400000) {
          yearlyTax = 0;
        } else if (annualSalary <= 750000) {
          yearlyTax = (annualSalary - 400000) * 0.05;
        } else if (annualSalary <= 1500000) {
          yearlyTax = 17500 + (annualSalary - 750000) * 0.10;
        } else if (annualSalary <= 2500000) {
          yearlyTax = 92500 + (annualSalary - 1500000) * 0.15;
        } else if (annualSalary <= 4000000) {
          yearlyTax = 242500 + (annualSalary - 2500000) * 0.175;
        } else if (annualSalary <= 7000000) {
          yearlyTax = 505000 + (annualSalary - 4000000) * 0.20;
        } else if (annualSalary <= 10000000) {
          yearlyTax = 1105000 + (annualSalary - 7000000) * 0.225;
        } else {
          yearlyTax = 1780000 + (annualSalary - 10000000) * 0.25;
        }
        break;
        
      case '2015': // FY 2016-17
        if (annualSalary <= 400000) {
          yearlyTax = 0;
        } else if (annualSalary <= 750000) {
          yearlyTax = (annualSalary - 400000) * 0.05;
        } else if (annualSalary <= 1500000) {
          yearlyTax = 17500 + (annualSalary - 750000) * 0.10;
        } else if (annualSalary <= 2500000) {
          yearlyTax = 92500 + (annualSalary - 1500000) * 0.15;
        } else if (annualSalary <= 4000000) {
          yearlyTax = 242500 + (annualSalary - 2500000) * 0.175;
        } else if (annualSalary <= 7000000) {
          yearlyTax = 505000 + (annualSalary - 4000000) * 0.20;
        } else {
          yearlyTax = 1105000 + (annualSalary - 7000000) * 0.25;
        }
        break;
        
      case '2014': // FY 2015-16
        if (annualSalary <= 400000) {
          yearlyTax = 0;
        } else if (annualSalary <= 500000) {
          yearlyTax = (annualSalary - 400000) * 0.02;
        } else if (annualSalary <= 750000) {
          yearlyTax = 2000 + (annualSalary - 500000) * 0.05;
        } else if (annualSalary <= 1400000) {
          yearlyTax = 14500 + (annualSalary - 750000) * 0.10;
        } else if (annualSalary <= 1500000) {
          yearlyTax = 79500 + (annualSalary - 1400000) * 0.125;
        } else if (annualSalary <= 1800000) {
          yearlyTax = 92000 + (annualSalary - 1500000) * 0.15;
        } else if (annualSalary <= 2500000) {
          yearlyTax = 137000 + (annualSalary - 1800000) * 0.175;
        } else if (annualSalary <= 3000000) {
          yearlyTax = 259500 + (annualSalary - 2500000) * 0.20;
        } else if (annualSalary <= 3500000) {
          yearlyTax = 359500 + (annualSalary - 3000000) * 0.225;
        } else if (annualSalary <= 4000000) {
          yearlyTax = 472000 + (annualSalary - 3500000) * 0.25;
        } else if (annualSalary <= 7000000) {
          yearlyTax = 597000 + (annualSalary - 4000000) * 0.275;
        } else {
          yearlyTax = 1422000 + (annualSalary - 7000000) * 0.30;
        }
        break;
        
      default: // Default to latest 2025-26
        if (annualSalary <= 600000) {
          yearlyTax = 0;
        } else if (annualSalary <= 1200000) {
          yearlyTax = (annualSalary - 600000) * 0.01;
        } else if (annualSalary <= 2200000) {
          yearlyTax = 6000 + (annualSalary - 1200000) * 0.11;
        } else if (annualSalary <= 3200000) {
          yearlyTax = 116000 + (annualSalary - 2200000) * 0.23;
        } else if (annualSalary <= 4100000) {
          yearlyTax = 346000 + (annualSalary - 3200000) * 0.30;
        } else {
          yearlyTax = 616000 + (annualSalary - 4100000) * 0.35;
        }
    }

    const monthlyTax = yearlyTax / 12;
    const monthlyIncomeAfterTax = monthlySalary - monthlyTax;
    const yearlyIncomeAfterTax = annualSalary - yearlyTax;

    setResults({
      monthlyIncome: Math.round(monthlySalary),
      monthlyTax: Math.round(monthlyTax),
      monthlyIncomeAfterTax: Math.round(monthlyIncomeAfterTax),
      yearlyIncome: Math.round(annualSalary),
      yearlyTax: Math.round(yearlyTax),
      yearlyIncomeAfterTax: Math.round(yearlyIncomeAfterTax)
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 via-white to-lime-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Side - Tax Calculator Form */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-500/10 p-5 border border-emerald-100 max-w-sm mx-auto lg:mx-0">
            <div className="text-center mb-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                CALCULATE INCOME TAX
              </h2>
              <p className="text-gray-600 text-xs">
                Get accurate tax calculations instantly
              </p>
            </div>

            {/* Salary Input */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Monthly Salary
              </label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter your monthly salary"
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors text-sm"
              />
            </div>

            {/* Tax Year Dropdown */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Tax Year
              </label>
              <div className="relative">
                <select
                  value={taxYear}
                  onChange={(e) => setTaxYear(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors appearance-none bg-white cursor-pointer pr-8 text-sm"
                >
                  {generateYears().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateTax}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 text-sm"
            >
              Calculate Tax
            </button>

            {/* Results - Always Visible */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium text-xs">Monthly Income</span>
                <span className="text-gray-900 font-bold text-sm">{formatNumber(results.monthlyIncome)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium text-xs">Monthly Tax</span>
                <span className="text-red-600 font-bold text-sm">{formatNumber(results.monthlyTax)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium text-xs">Monthly Income After Tax</span>
                <span className="text-emerald-600 font-bold text-sm">{formatNumber(results.monthlyIncomeAfterTax)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium text-xs">Yearly Income</span>
                <span className="text-gray-900 font-bold text-sm">{formatNumber(results.yearlyIncome)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700 font-medium text-xs">Yearly Tax</span>
                <span className="text-red-600 font-bold text-sm">{formatNumber(results.yearlyTax)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 font-medium text-xs">Yearly Income After Tax</span>
                <span className="text-emerald-600 font-bold text-sm">{formatNumber(results.yearlyIncomeAfterTax)}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Tax Illustration with Text Overlay */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-lg">
                            {/* Text Overlay on Top Center */}
              <div className="absolute top-0 left-0 right-0 text-center p-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 drop-shadow-lg">
                 Income Tax Calculator
                </h3>
              </div>

              <Image
                src="/filter.png"
                alt="Calculate Your Tax"
                fill
                className="object-contain"
                priority
              />
             </div>
          </div>
        </div>


      </div>
    </section>
  );
}