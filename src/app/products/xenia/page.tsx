'use client';

import CompanyOverview from '@/components/companyoverview';
import Products from '@/components/products';
import Testimonials from '@/components/testimonial';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export default function DaihatsuXeniaPage() {
  return (
    <>
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">

        <div className="relative w-full h-[400px]">
          <Image
            src="/image/xenia.png"
            alt="Daihatsu Xenia"
            fill
            className="object-contain rounded-lg"
          />
        </div>

     
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Daihatsu Xenia</h1>
          <div className="flex items-center text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={16} />
            ))}
            <span className="text-sm text-gray-600 ml-2">(5.0)</span>
          </div>
          <h2 className="text-[#00C4E2] text-lg font-semibold mb-4">Rp 500.000 / hari</h2>
          <p className="text-justify text-gray-700 leading-relaxed mb-6">
            Daihatsu Xenia – Solusi Sewa Mobil Keluarga dengan Irit BBM & Ruang Luas <br /> <br />
            Mencari mobil sewa yang irit, tangguh, dan nyaman untuk kebutuhan harian atau liburan keluarga? 
            Daihatsu Xenia hadir sebagai pilihan terbaik dengan kabin luas, efisiensi bahan bakar tinggi, dan harga sewa yang terjangkau!
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
