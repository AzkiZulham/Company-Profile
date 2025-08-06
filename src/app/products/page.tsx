'use client';

import CompanyOverview from '@/components/companyoverview';
import Testimonials from '@/components/testimonial';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

const services = [
  {
    title: 'Hiace Luxury',
    image: '/image/hiace-luxury.png',
    detailLink: '/products/hiace-luxury',
    orderLink: '/reservasi',
  },
  {
    title: 'Mercy Sprinter',
    image: '/image/mercy-sprinter.png',
    detailLink: '/products/mercy-sprinter',
    orderLink: '/reservasi',
  },
  {
    title: 'Toyota Alphard',
    image: '/image/alphard.png',
    detailLink: '/products/alphard',
    orderLink: '/reservasi',
  },
  {
    title: 'Toyota Innova',
    image: '/image/innova.png',
    detailLink: '/products/innova',
    orderLink: '/reservasi',
  },
  {
    title: 'Toyota Avanza',
    image: '/image/avanza.png',
    detailLink: '/products/avanza',
    orderLink: '/reservasi',
  },
  {
    title: 'Suzuki Ertiga',
    image: '/image/ertiga.png',
    detailLink: '/products/ertiga',
    orderLink: '/reservasi',
  },
  {
    title: 'Honda Mobilio',
    image: '/image/mobilio.png',
    detailLink: '/products/mobilio',
    orderLink: '/reservasi',
  },
  {
    title: 'Daihatsu Xenia',
    image: '/image/Xenia.png',
    detailLink: '/products/xenia',
    orderLink: '/reservasi',
  },
];

export default function ProductPage() {
  return (
    <>
    <section className="bg-white py-10 px-4 md:px-10">
      <div className="text-center mb-10">
        <h2 className="text-[#00C4E2] text-3xl font-bold mb-2">Sewa Mobil Murah</h2>
        <p className="text-gray-600 text-base">Banyak armada kami yang berkualitas & terpercaya</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {services.map((service, index) => (
          <div key={index} className="relative flex flex-col rounded-xl shadow-sm p-6 bg-white">
            
            <div className="absolute top-7 right-10 bg-[#00C4E2] text-white text-lg font-bold px-3 py-1 rounded-full shadow-md z-10">
              {service.title}
            </div>

           
            <div className="relative w-full h-48 mb-4">
              <Image
                src={service.image}
                alt={service.title}
                layout="fill"
                objectFit="contain"
                className="rounded"
              />
            </div>

          
            <div className="flex justify-center items-center gap-1 text-yellow-400 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} size={14} />
              ))}
              <span className="text-sm text-gray-600 ml-1">(5.0)</span>
            </div>

       
            <div className="flex justify-center gap-3 mt-auto">
              <a
                href={service.detailLink}
                className="text-sm font-bold px-4 py-2 rounded-full border border-[#00C4E2] text-[#00C4E2] hover:bg-[#00C4E2]/10 transition"
              >
                Detail
              </a>
              <a
                href={service.orderLink}
                className="text-sm font-bold px-4 py-2 rounded-full bg-yellow-400 text-white hover:bg-yellow-500 transition"
              >
                Reservasi
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />
    <CompanyOverview />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />
    <Testimonials />
    </>
  );
}
