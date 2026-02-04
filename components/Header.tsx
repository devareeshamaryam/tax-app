 'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'PTA Tax', href: '/pta-tax' },
    { label: 'AOP & Business', href: '/aop-business' },
    { label: 'Supply of Goods', href: '/supply-goods' },
    { label: 'Punjab Agricultural Income Tax', href: '/agricultural-tax' },
    { label: 'Special Tax Regime SME', href: '/sme-tax' },
    { label: 'Blog', href: '/blog' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-emerald-500/5' 
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="relative z-10 group flex items-center gap-3">
              <div className="relative w-14 h-14 overflow-hidden rounded-full ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all duration-300 flex-shrink-0">
                <Image
                  src="/tax.png"
                  alt="Tax Calculator"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
             </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center mx-8">
              {navItems.map((item: NavItem) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href={item.href}>
                    <button className="relative px-3 py-2 text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors duration-300 group whitespace-nowrap">
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-lime-400 group-hover:w-full transition-all duration-300" />
                      {item.dropdown && (
                        <svg 
                          className="inline-block ml-1 w-3 h-3 transition-transform duration-300 group-hover:rotate-180" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl shadow-emerald-500/10 border border-emerald-100 overflow-hidden animate-fadeIn">
                      <div className="py-2">
                        {item.dropdown.map((dropItem: DropdownItem) => (
                          <Link
                            key={dropItem.label}
                            href={dropItem.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200"
                          >
                            {dropItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block flex-shrink-0">
              <Link href="/contact">
                <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-emerald-600 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transition-all origin-left ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all origin-left ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                  }`}
                />
              </div>
            </button>
          </nav>
        </div>

        {/* Decorative Border */}
        <div className="h-1 bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-500" />
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto animate-slideInRight">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-lime-500 bg-clip-text text-transparent">
                  Menu
                </h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item: NavItem) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.dropdown.map((dropItem: DropdownItem) => (
                          <Link
                            key={dropItem.label}
                            href={dropItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                          >
                            {dropItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-8">
                <Link
                  href="/home"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-semibold rounded-full">
                    Calculate Tax 
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}