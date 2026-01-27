import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ProjectGrid } from '@/components/ProjectGrid';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <ProjectGrid />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
