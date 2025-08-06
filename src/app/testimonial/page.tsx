'use client';

import { useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  name: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  { name: 'Budi Santoso', quote: 'Pelayanan sangat memuaskan, mobil bersih dan driver ramah. Saya pasti akan menggunakan lagi!' },
  { name: 'Siti Aminah', quote: 'Proses reservasi cepat dan mudah. Armada lengkap dan nyaman untuk perjalanan jauh.' },
  { name: 'Andi Wijaya', quote: 'Harga bersaing, pelayanan terbaik. Rekomendasi untuk sewa mobil keluarga.' },
  { name: 'Rina Oktaviani', quote: 'Sangat membantu saat butuh kendaraan dadakan. Proses cepat dan tidak ribet.' },
  { name: 'Dedi Kurniawan', quote: 'Mobil dalam kondisi prima, cocok untuk perjalanan dinas.' },
  { name: 'Nurul Huda', quote: 'Saya suka dengan pilihan armada yang banyak dan bersih semua.' },
  { name: 'Agus Salim', quote: 'Pengemudi tepat waktu dan sangat ramah.' },
  { name: 'Fitriani', quote: 'Layanan CS sangat membantu dan cepat tanggap.' },
  { name: 'Joko Prasetyo', quote: 'Rekomendasi terbaik untuk sewa mobil keluarga besar.' },
  { name: 'Wulan Ayu', quote: 'Sudah beberapa kali langganan, tidak pernah mengecewakan.' },
  { name: 'Eka Saputra', quote: 'Sistem booking online sangat mudah digunakan.' },
  { name: 'Indah Permata', quote: 'Terima kasih atas pelayanannya yang sangat baik!' },
];

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const paginatedTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#00C4E2] mb-4">Testimoni Pelanggan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berikut pendapat pelanggan tentang layanan kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedTestimonials.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <FaQuoteLeft className="text-[#00C4E2] text-xl mt-1 flex-shrink-0" />
                <p className="text-gray-600 leading-relaxed italic">
                  {item.quote}
                </p>
              </div>
              <p className="text-right font-medium text-gray-800">— {item.name}</p>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Testimoni sebelumnya"
            >
              Sebelumnya
            </button>
            <span className="text-sm text-gray-500">
              Halaman {currentPage + 1} dari {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-[#00C4E2] text-white hover:bg-[#00a9c0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Testimoni selanjutnya"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;