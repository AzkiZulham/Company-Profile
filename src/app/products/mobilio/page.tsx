'use client';

import CompanyOverview from '@/components/companyoverview';
import Products from '@/components/products';
import Testimonials from '@/components/testimonial';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export default function HondaMobilioPage() {
  return (
    <>
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
    
        <div className="relative w-full h-[400px]">
          <Image
            src="/image/mobilio.png"
            alt="Honda Mobilio"
            fill
            className="object-contain rounded-lg"
          />
        </div>

      
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Honda Mobilio</h1>
          <div className="flex items-center text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={16} />
            ))}
            <span className="text-sm text-gray-600 ml-2">(5.0)</span>
          </div>
          <h2 className="text-[#00C4E2] text-lg font-semibold mb-4">Rp 550.000 / hari</h2>
          <p className="text-justify text-gray-700 leading-relaxed mb-6">
            Honda Mobilio – Solusi Sewa Mobil Compact MPV dengan Irit BBM & Kenyamanan Maksimal <br /> <br />
            Butuh mobil irit namun tetap nyaman untuk keluarga kecil atau kebutuhan bisnis harian? 
            Honda Mobilio hadir sebagai pilihan tepat dengan desain compact namun kabin lapang, serta efisiensi bahan bakar terbaik di kelasnya!
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
