'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)] sticky top-0 z-50 border-b-4 border-[#00C4E2]">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
        {/* Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <Image src="/image/logo-rev.png" alt="Company Logo" width={150} height={150} />
          <div>
            <h1 className="text-[#00C4E2] text-lg font-bold">Aleena Trans</h1>
            <p className="text-xs text-gray-500 leading-tight">Rental Mobil Terlengkap dan Termurah</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/about-us" className="text-gray-700 hover:text-[#00C4E2] text-sm font-medium">
            About Us
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-[#00C4E2] text-sm font-medium">
            Product
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-[#00C4E2] text-sm font-medium">
            Blog
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
          <Link href="/about-us" className="block text-gray-700 hover:text-[#00C4E2] text-sm font-medium">
            About Us
          </Link>
          <Link href="/products" className="block text-gray-700 hover:text-[#00C4E2] text-sm font-medium">
            Product
          </Link>
          <Link href="/blog" className="block text-gray-700 hover:text-[#00C4E2] text-sm font-medium">
            Blog
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
