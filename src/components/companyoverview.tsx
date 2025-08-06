'use client';

import { FaTags, FaUserTie, FaHandshake, FaCarSide } from 'react-icons/fa';

const features = [
  {
    icon: <FaTags size={24} className="text-yellow-400" />,
    title: 'HARGA MURAH',
    description: 'Kami selalu berusaha memberikan harga yang termurah untuk semua jenis rental mobil.',
  },
  {
    icon: <FaUserTie size={24} className="text-yellow-400" />,
    title: 'DRIVER HANDAL',
    description: 'Semua driver kami sudah berpengalaman dan dapat bekerja dengan penuh tanggung jawab.',
  },
  {
    icon: <FaHandshake size={24} className="text-yellow-400" />,
    title: 'LAYANAN TERBAIK',
    description: 'Kami akan mengutamakan kenyamanan Anda karena kepuasan setiap penumpang  prioritas kami.',
  },
  {
    icon: <FaCarSide size={24} className="text-yellow-400" />,
    title: 'ARMADA LENGKAP',
    description: 'Banyak pilihan jenis mobil yang bisa Anda sesuaikan dengan kebutuhan dan pasti selalu prima.',
  },
];

const CompanyOverview = () => {
  return (
    <section className="bg-white pt-0.25 pb-0.25555 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center px-6 py-6 space-y-2"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#00C4E2] bg-white mb-2">
              {feature.icon}
            </div>
            <h3 className="text-[#00C4E2] text-base font-semibold">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyOverview;
