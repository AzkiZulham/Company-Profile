'use client';

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

const Products = () => {
  return (
    <section className="bg-[#ffffff] pt-0 pb-0 px-6 md:px-70">
        <div className="text-center mb-7">
        <h2 className="text-[#00C4E2] text-2xl font-bold mb-2">Sewa Mobil Murah</h2>
        <p className="text-gray-600 text-sm">Banyak armada kami yang berkualitas</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
        {services.map((service, index) => (
        <div key={index} className="relative flex flex-col border-b border-gray-200 pb-6">
            <div className="relative w-full h-47 rounded-lg overflow-hidden mb-4">
             {/* Title pin */}
            <div className="absolute top-1 -right-0 bg-[#00C4E2] text-white text-lg font-extrabold px-3 py-1 rounded-full shadow-md z-10">
                {service.title}
            </div>
                <Image
                src={service.image}
                alt={service.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-48 object-contain"
                />
            </div>

            {/* Rating atau Label Kualitas */}
            <div className="flex justify-center items-center gap-1 text-yellow-400 mb-2">
                <FaStar size={14} />
                <FaStar size={14} />
                <FaStar size={14} />
                <FaStar size={14} />
                <FaStar size={14} />
            <span className="text-sm text-gray-600 ml-1">(5.0)</span>
            </div>

            {/* Tombol Detail & Reservasi */}
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
  );
};

export default Products;
