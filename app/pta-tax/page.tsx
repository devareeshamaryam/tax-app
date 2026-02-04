 'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';

interface PhoneModel {
  name: string;
  priceUSD: number;
}

interface BrandModels {
  [key: string]: PhoneModel[];
}

export default function PTATaxPage() {
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [results, setResults] = useState<{
    devicePrice: number;
    ptaTaxPassport: number;
    ptaTaxCNIC: number;
    totalWithPassport: number;
    totalWithCNIC: number;
    salesTax: number;
  }>({
    devicePrice: 0,
    ptaTaxPassport: 0,
    ptaTaxCNIC: 0,
    totalWithPassport: 0,
    totalWithCNIC: 0,
    salesTax: 0
  });

  // Phone brands and models with approximate prices in USD
  const phoneData: BrandModels = {
    'APPLE': [
      { name: 'iPhone 15 Pro Max', priceUSD: 1199 },
      { name: 'iPhone 15 Pro', priceUSD: 999 },
      { name: 'iPhone 15 Plus', priceUSD: 899 },
      { name: 'iPhone 15', priceUSD: 799 },
      { name: 'iPhone 14 Pro Max', priceUSD: 1099 },
      { name: 'iPhone 14 Pro', priceUSD: 999 },
      { name: 'iPhone 14 Plus', priceUSD: 799 },
      { name: 'iPhone 14', priceUSD: 699 },
      { name: 'iPhone 13 Pro Max', priceUSD: 899 },
      { name: 'iPhone 13 Pro', priceUSD: 799 },
      { name: 'iPhone 13', priceUSD: 599 },
      { name: 'iPhone 12 Pro Max', priceUSD: 799 },
      { name: 'iPhone 12', priceUSD: 499 },
      { name: 'iPhone 11', priceUSD: 399 },
    ],
    'SAMSUNG': [
      { name: 'Galaxy S24 Ultra', priceUSD: 1299 },
      { name: 'Galaxy S24+', priceUSD: 999 },
      { name: 'Galaxy S24', priceUSD: 799 },
      { name: 'Galaxy S23 Ultra', priceUSD: 1199 },
      { name: 'Galaxy S23+', priceUSD: 899 },
      { name: 'Galaxy S23', priceUSD: 699 },
      { name: 'Galaxy Z Fold 5', priceUSD: 1799 },
      { name: 'Galaxy Z Flip 5', priceUSD: 999 },
      { name: 'Galaxy A54', priceUSD: 449 },
      { name: 'Galaxy A34', priceUSD: 349 },
    ],
    'XIAOMI': [
      { name: 'Xiaomi 14 Pro', priceUSD: 899 },
      { name: 'Xiaomi 14', priceUSD: 699 },
      { name: 'Xiaomi 13 Pro', priceUSD: 799 },
      { name: 'Xiaomi 13', priceUSD: 599 },
      { name: 'Redmi Note 13 Pro+', priceUSD: 349 },
      { name: 'Redmi Note 13 Pro', priceUSD: 299 },
      { name: 'Redmi Note 12 Pro', priceUSD: 249 },
      { name: 'POCO F5 Pro', priceUSD: 399 },
      { name: 'POCO X6 Pro', priceUSD: 299 },
    ],
    'OPPO': [
      { name: 'Find X6 Pro', priceUSD: 899 },
      { name: 'Find X5 Pro', priceUSD: 799 },
      { name: 'Reno 11 Pro', priceUSD: 499 },
      { name: 'Reno 10 Pro+', priceUSD: 599 },
      { name: 'A98', priceUSD: 299 },
      { name: 'A78', priceUSD: 199 },
    ],
    'VIVO': [
      { name: 'X100 Pro', priceUSD: 899 },
      { name: 'X90 Pro', priceUSD: 799 },
      { name: 'V29 Pro', priceUSD: 449 },
      { name: 'V27 Pro', priceUSD: 399 },
      { name: 'Y100', priceUSD: 249 },
      { name: 'Y56', priceUSD: 199 },
    ],
    'GOOGLE': [
      { name: 'Pixel 8 Pro', priceUSD: 999 },
      { name: 'Pixel 8', priceUSD: 699 },
      { name: 'Pixel 7 Pro', priceUSD: 799 },
      { name: 'Pixel 7', priceUSD: 599 },
      { name: 'Pixel 7a', priceUSD: 449 },
    ],
    'ONEPLUS': [
      { name: 'OnePlus 12', priceUSD: 799 },
      { name: 'OnePlus 11', priceUSD: 699 },
      { name: 'OnePlus Nord 3', priceUSD: 399 },
      { name: 'OnePlus Nord CE3', priceUSD: 299 },
    ],
    'HUAWEI': [
      { name: 'Mate 60 Pro', priceUSD: 999 },
      { name: 'P60 Pro', priceUSD: 899 },
      { name: 'Nova 11 Pro', priceUSD: 499 },
      { name: 'Nova 11', priceUSD: 399 },
    ],
  };

  const calculatePTATax = () => {
    if (!brand || !model) {
      alert('Please select both brand and model');
      return;
    }

    // Get device price
    const selectedModel = phoneData[brand]?.find(m => m.name === model);
    if (!selectedModel) return;

    const devicePriceUSD = selectedModel.priceUSD;

    // Convert to PKR (approximate exchange rate)
    const exchangeRate = 280;
    const devicePricePKR = devicePriceUSD * exchangeRate;

    // Calculate PTA Tax based on price brackets (2024-2025 rates)
    let ptaTaxPassport = 0;
    let ptaTaxCNIC = 0;

    if (devicePriceUSD <= 200) {
      ptaTaxPassport = devicePricePKR * 0.10; // 10%
      ptaTaxCNIC = devicePricePKR * 0.15; // 15%
    } else if (devicePriceUSD <= 350) {
      ptaTaxPassport = devicePricePKR * 0.15; // 15%
      ptaTaxCNIC = devicePricePKR * 0.20; // 20%
    } else if (devicePriceUSD <= 500) {
      ptaTaxPassport = devicePricePKR * 0.20; // 20%
      ptaTaxCNIC = devicePricePKR * 0.30; // 30%
    } else {
      ptaTaxPassport = devicePricePKR * 0.25; // 25%
      ptaTaxCNIC = devicePricePKR * 0.40; // 40%
    }

    // Sales tax (18%)
    const salesTax = devicePricePKR * 0.18;

    // Total costs
    const totalWithPassport = devicePricePKR + ptaTaxPassport + salesTax;
    const totalWithCNIC = devicePricePKR + ptaTaxCNIC + salesTax;

    setResults({
      devicePrice: Math.round(devicePricePKR),
      ptaTaxPassport: Math.round(ptaTaxPassport),
      ptaTaxCNIC: Math.round(ptaTaxCNIC),
      totalWithPassport: Math.round(totalWithPassport),
      totalWithCNIC: Math.round(totalWithCNIC),
      salesTax: Math.round(salesTax)
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const getAvailableModels = () => {
    return brand ? phoneData[brand] || [] : [];
  };

  return (
    <>
      <Header />
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
            {/* Left Side - PTA Tax Calculator Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-5 border border-gray-200 max-w-sm mx-auto lg:mx-0">
              <div className="text-center mb-5">
                <h2 className="text-2xl font-bold text-black mb-1">
                  PTA TAX CALCULATOR
                </h2>
                <p className="text-gray-600 text-xs">
                  Calculate PTA registration tax for your device
                </p>
              </div>

              {/* Brand Selection */}
              <div className="mb-3">
                <label className="block text-xs font-semibold text-black mb-1.5">
                  Select Brand
                </label>
                <div className="relative">
                  <select
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                      setModel('');
                    }}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors appearance-none bg-white cursor-pointer pr-8 text-sm text-black"
                  >
                    <option value="">Choose a brand</option>
                    {Object.keys(phoneData).map((brandName) => (
                      <option key={brandName} value={brandName}>
                        {brandName}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Model Selection */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-black mb-1.5">
                  Select Model
                </label>
                <div className="relative">
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    disabled={!brand}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors appearance-none bg-white cursor-pointer pr-8 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed text-black"
                  >
                    <option value="">Choose a model</option>
                    {getAvailableModels().map((phone) => (
                      <option key={phone.name} value={phone.name}>
                        {phone.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculatePTATax}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 text-sm"
              >
                Calculate PTA Tax
              </button>

              {/* Results - Always Visible */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-black font-medium text-xs">Device Price (PKR)</span>
                  <span className="text-black font-bold text-sm">{formatNumber(results.devicePrice)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <span className="text-black font-medium text-xs">Sales Tax (18%)</span>
                  <span className="text-black font-bold text-sm">{formatNumber(results.salesTax)}</span>
                </div>
                
                {/* With Passport Section */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <span className="text-xs font-bold text-black">WITH PASSPORT</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-300 pl-4">
                    <span className="text-black font-medium text-xs">PTA Tax</span>
                    <span className="text-black font-bold text-sm">{formatNumber(results.ptaTaxPassport)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-300 pl-4">
                    <span className="text-black font-medium text-xs">Total Cost</span>
                    <span className="text-black font-bold text-sm">{formatNumber(results.totalWithPassport)}</span>
                  </div>
                </div>

                {/* With CNIC Section */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <span className="text-xs font-bold text-black">WITH CNIC</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-300 pl-4">
                    <span className="text-black font-medium text-xs">PTA Tax</span>
                    <span className="text-black font-bold text-sm">{formatNumber(results.ptaTaxCNIC)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 pl-4">
                    <span className="text-black font-medium text-xs">Total Cost</span>
                    <span className="text-black font-bold text-sm">{formatNumber(results.totalWithCNIC)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - PTA Tax Illustration with Text Overlay */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-lg">
                {/* Text Overlay on Top Center */}
                <div className="absolute top-0 left-0 right-0 text-center p-4 z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-black drop-shadow-lg">
                    PTA Tax Calculator
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">Pakistan 2024-2025</p>
                </div>

                <Image
                  src="/image3.png"
                  alt="PTA Tax Calculator"
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