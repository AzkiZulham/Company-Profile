'use client';

import CompanyOverview from '@/components/companyoverview';
import Products from '@/components/products';
import Testimonials from '@/components/testimonial';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export default function ToyotaInnovaPage() {
  return (
    <>
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
     
        <div className="relative w-full h-[400px]">
          <Image
            src="/image/innova.png"
            alt="Toyota Innova"
            fill
            className="object-contain rounded-lg"
          />
        </div>

        
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Toyota Innova</h1>
          <div className="flex items-center text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={16} />
            ))}
            <span className="text-sm text-gray-600 ml-2">(5.0)</span>
          </div>
          <h2 className="text-[#00C4E2] text-lg font-semibold mb-4">Rp 900.000 / hari</h2>
          <p className="text-justify text-gray-700 leading-relaxed mb-6">
            Toyota Innova – Solusi Sewa Mobil Nyaman & Andal untuk Keluarga dan Bisnis <br /> <br />
            Mencari kendaraan yang nyaman, tangguh, dan multifungsi untuk kebutuhan harian, liburan, 
            atau perjalanan bisnis? Toyota Innova adalah pilihan tepat dengan kombinasi kenyamanan, keandalan, dan efisiensi yang sudah teruji.
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
