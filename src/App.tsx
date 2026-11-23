import { AboutSection } from './components/about/AboutSection'
import { ContactSection } from './components/contact/ContactSection'
import { Hero } from './components/hero/Hero'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ProjectsSection } from './components/projects/ProjectsSection'
import { SkillsSection } from './components/skills/SkillsSection'
import { ToastProvider } from './components/common/ToastProvider'

function App() {
  return (
    <ToastProvider>
      <div id="top" className="min-h-screen bg-canvas text-ink">
        <a
          href="#main-content"
          className="sr-only rounded-md bg-accent px-3 py-2 text-sm font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110]"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main-content">
          <Hero />
          <ProjectsSection />
          <SkillsSection />
          <AboutSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </ToastProvider>
  )
}

export default App
