'use client';

import { FaQuoteLeft } from 'react-icons/fa';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Budi Santoso',
    quote: 'Pelayanan sangat memuaskan, mobil bersih dan driver ramah. Saya pasti akan menggunakan lagi!',
  },
  {
    name: 'Siti Aminah',
    quote: 'Proses reservasi cepat dan mudah. Armada lengkap dan nyaman untuk perjalanan jauh.',
  },
  {
    name: 'Andi Wijaya',
    quote: 'Harga bersaing, pelayanan terbaik. Rekomendasi untuk sewa mobil keluarga.',
  },
  {
    name: 'Rina Marlina',
    quote: 'Sangat profesional dan tepat waktu. Terima kasih atas pelayanannya!',
  },
  {
    name: 'Dedi Saputra',
    quote: 'Armada mobil baru dan terawat. Proses booking cepat dan praktis.',
  },
  {
    name: 'Intan Permata',
    quote: 'Sewa mobil di sini selalu jadi andalan keluarga kami saat liburan.',
  },
  {
    name: 'Agus Salim',
    quote: 'Pelayanan ramah dan harga terjangkau. Cocok untuk perjalanan bisnis.',
  },
  {
    name: 'Nina Kartika',
    quote: 'Kami sangat puas dengan pelayanan dari awal sampai akhir. Recommended!',
  },
  {
    name: 'Hendra Wijaya',
    quote: 'Tidak perlu repot, semua urusan transportasi jadi mudah.',
  },
  {
    name: 'Wulan Ayu',
    quote: 'Driver sangat berpengalaman dan rute perjalanan aman.',
  },
  {
    name: 'Bayu Pratama',
    quote: 'Mobil bersih, wangi, dan nyaman. Serasa naik mobil pribadi.',
  },
  {
    name: 'Sri Handayani',
    quote: 'Bintang lima untuk pelayanan dan kualitas armada mobil.',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="bg-white py-5 px-6 md:px-16">
      <div className="text-center mb-7">
        <h2 className="text-[#00C4E2] text-2xl font-bold mb-2">Testimoni Pelanggan</h2>
        <p className="text-gray-600 text-sm mb-4">
          Testimoni asli dari pelanggan kami, klik tombol dibawah ini untuk melihat testimoni lainnya.
        </p>
        <a
          href="/testimonial"
          className="inline-block bg-[#00C4E2] text-white text-sm font-bold px-5 py-2 rounded hover:bg-[#00a9c0] transition"
        >
          Testimoni Lainnya
        </a>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTestimonials.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-6 shadow-sm bg-gray-50"
            >
              <div className="flex items-start gap-2 mb-4 text-[#00C4E2]">
                <FaQuoteLeft size={20} />
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &quot;{item.quote}&quot;
                </p>
              </div>
              <p className="text-sm text-right font-semibold text-gray-800 mt-4">— {item.name}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
          >
            Sebelumnya
          </button>
          <button
            onClick={handleNext}
            className="bg-[#00C4E2] hover:bg-[#00a9c0] text-white text-sm px-3 py-1 rounded"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;