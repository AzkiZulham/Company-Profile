'use client';

import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-[#00C4E2] text-white py-5 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        
        {/* Text Section */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight -mb-0.5">
            Aleena Trans
          </h1>
          <p className="text-xl md:text-xl text-yellow-300 italic font-bold mb-6">
            Rental Mobil Terlengkap dan Termurah
          </p>
          <p className="text-justify text-lg text-white mb-6">
            Aleena Trans merupakan agen sewa mobil terlengkap dan termurah di Jakarta. Kami melayani, sewa mobil murah Jakarta, sewa mobil elf Jakarta, 
            sewa mobil hiace Jakarta, sewa mobil medium bus Jakarta, sewa mobil murah elf Jakarta. Kami menyediakan armada unggulan, terbaru dan terlengkap harga murah. <br /> <br />
            Layanan sewa mobil murah Jakarta include driver/sopir yang berpengalaman dan profesional.
            Tentu saja akan membuat perjalanan Anda jadi semakin cepat dan terjamin keamanannya. 
            Kami selalu berusaha untuk memberikan layanan yang terbaik untuk para customer/pelanggan.
          </p>

          {/* Button */}
          <Link href="/about-us">
            <button className="bg-[#ffffff] text-[#00C4E2] font-semibold py-3 px-6 rounded shadow-md hover:bg-yellow-300 transition duration-300">
              Read More
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full h-64 md:h-[500px] relative rounded-xl overflow-hidden">
          <Image
            src="/image/alena-info.png"
            alt="Company brand banner"
            fill
            className="object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
