import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Education } from '@/components/Education';
import { ProjectGrid } from '@/components/ProjectGrid';
import { Homelab } from '@/components/Homelab';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <ProjectGrid />
        <Homelab />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
