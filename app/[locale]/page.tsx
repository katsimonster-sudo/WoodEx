import Hero from '@/components/Hero/Hero';
import Portfolio from '@/components/Portfolio/Portfolio';
import OrderForm from '@/components/OrderForm/OrderForm';
import DigitalTeaser from '@/components/DigitalTeaser/DigitalTeaser';

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="wood-divider" />
      <Portfolio />
      <div className="wood-divider" />
      <DigitalTeaser />
      <div className="wood-divider" />
      <OrderForm />
    </>
  );
}
