import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { ProjectGrid } from '@/components/ProjectGrid';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <ProjectGrid />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
