
import CompanyOverview from '@/components/companyoverview';
import Hero from '../components/herobanner';
import Products from '@/components/products';
import Testimonials from '@/components/testimonial';

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />
      <CompanyOverview />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6" />
      <Products />
      <Testimonials />
    </>
  );
}
