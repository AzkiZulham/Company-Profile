import Image from 'next/image';
import CompanyOverview from '@/components/companyoverview';
import Products from '@/components/products';
import Testimonials from '@/components/testimonial';

export default function AboutUsPage() {
  return (
    <>
    <section className="px-4 py-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
    
      <div className="w-full md:w-1/2">
        <Image
          src="/image/alena-info.png" 
          alt="Tentang Aleena Trans"
          width={600}
          height={400}
          className="rounded-xl w-full object-cover"
        />
      </div>

     
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">Aleena Trans</h2>
        <h3 className="text-lg md:text-xl italic font-semibold text-[#00C4E2] mb-4">Rental Mobil Terlengkap dan Termurah</h3>
        <p className="text-justify text-gray-500 leading-relaxed">
          Aleena Trans merupakan agen rental bus dan mobil terlengkap dan termurah di Bandung. 
          Melayani sewa mobil include driver yang berpengalaman dan profesional akan membuat perjalanan Anda jadi makin cepat dan terjamin keamanannya.
        </p>
        <p className="text-justify text-gray-500 leading-relaxed mt-4">
          Setiap mobil kami pastikan selalu dalam kondisi terjaga dengan baik, terawat, bersih, dan wangi dengan service yang dilakukan secara berkala demi untuk menunjang kenyamanan dan keamanan setiap penumpangnya. 
          PT. Mata Hati Aleena sudah lama bergerak dibang penyedia layanan jasa transportasi untuk berbagai kebutuhan mulai dari kebutuhan pribadi, acara penting seperti wedding, ziarah, maupun berwisata. 
          Tersedia banyak pilihan jenis armada diantaranya mobil elf, mobil hiace, mercedes sprinter, medium bus, big bus, hingga premium car seperti alphard dan lainnya.
        </p>
      </div>
    </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />
    <CompanyOverview />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />
    <Products />
    <Testimonials />
    </>
  );
}
