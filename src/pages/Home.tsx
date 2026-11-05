import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { SectionDivider } from '../components/ui';
import { useContent } from '../i18n/useLang';
import { About } from '../sections/About';
import { Contact } from '../sections/Contact';
import { Experience } from '../sections/Experience';
import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';
import { Stack } from '../sections/Stack';

/** Página única. As demais seções entram nas próximas etapas. */
export default function Home() {
  const { hero } = useContent();

  return (
    <div className="relative">
      {/* Link "pular para o conteúdo": invisível até receber foco (primeiro Tab). Quem navega por
          teclado ou leitor de tela vai direto ao conteúdo, sem passar pelo menu toda vez. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-on-ink focus:outline-3 focus:outline-offset-2 focus:outline-pink"
      >
        {hero.skip}
      </a>
      {/* O Header é absoluto: fica sobre o fundo do Hero, fora do <main>. */}
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Stack />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
