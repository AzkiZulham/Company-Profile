'use client';

import CompanyOverview from '@/components/companyoverview';
import Products from '@/components/products';
import Testimonials from '@/components/testimonial';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export default function HiaceLuxuryPage() {
  return (
    <>
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
      
        <div className="relative w-full h-[400px]">
          <Image
            src="/image/hiace-luxury.png"
            alt="Hiace Luxury"
            fill
            className="object-contain rounded-lg"
          />
        </div>

       
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Hiace Luxury</h1>
          <div className="flex items-center text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={16} />
            ))}
            <span className="text-sm text-gray-600 ml-2">(5.0)</span>
          </div>
          <h2 className="text-[#00C4E2] text-lg font-semibold mb-4">Rp 2.000.000 / hari</h2>
          <p className="text-justify text-gray-700 leading-relaxed mb-6">
            Toyota Hiace Luxury – Solusi Sewa Mobil Mewah untuk Perjalanan Grup dengan Kenyamanan Premium <br /> <br />
            Bagi Anda yang membutuhkan kendaraan mewah untuk perjalanan grup, keluarga, atau bisnis dengan kapasitas besar tanpa mengorbankan kenyamanan, 
            Toyota Hiace Luxury adalah pilihan tepat. Dilengkapi interior premium dan fitur-fitur eksklusif, mobil ini memberikan pengalaman berkendara 
            yang nyaman dan berkelas.
          </p>

          <a
            href="/reservasi"
            className="inline-block px-6 py-2 bg-yellow-400 text-white font-semibold rounded-full hover:bg-yellow-500 transition"
          >
            Reservasi
          </a>
        </div>
      </div>
    </section>

    <Products />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />
    <CompanyOverview />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />
    <Testimonials />
    </>
  );
}
