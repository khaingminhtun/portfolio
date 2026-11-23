# Khine Min Htun — Developer Portfolio

A production-ready developer portfolio for **Khine Min Htun**, a backend software engineer. The site presents real GitHub projects as detailed case studies, with an accessible architecture modal, filterable repository index, technical skills matrix, and contact workflow.

Built with **Vite, React, TypeScript, Tailwind CSS v4, and lucide-react**.

---

## Highlights

- Dark-first design with a persisted light theme (`localStorage` + `dark` class on `<html>`).
- Sticky glass navigation with an active-section indicator, scroll progress, GitHub link, theme switch, and mobile drawer.
- Interactive terminal profile with keyboard-accessible tabs for `whoami`, `stack --summary`, and `focus --backend`.
- Two featured case studies sourced from the project READMEs:
  - **Myanmar Kids Learn** — offline-first Flutter, Drift SQLite, Cubit, bundled audio/SVG assets.
  - **Academic Survival System** — Spring Boot REST API, academic risk calculation, PostgreSQL, React.
- Filterable project grid across Backend, Systems & CLI, and Mobile & Web.
- Accessible project modal with focus trapping, Escape/backdrop close, problem statement, architecture decisions, feature list, metrics, stack badges, and repository links.
- Three-card skills matrix grouped by discipline — no arbitrary percentage bars.
- Engineering principles and UTYCC education section.
- Contact form with client-side validation, toast feedback, copy-to-clipboard actions, and an optional form endpoint fallback to a prefilled email draft.
- Reduced-motion support, visible focus states, skip link, semantic headings, and ARIA labels.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Build | Vite 8 |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Icons | `lucide-react` |
| Fonts | Inter + JetBrains Mono (Google Fonts) |
| Tooling | Oxlint, TypeScript project references |

No component library or animation framework is used. The design system is built from CSS variables mapped into Tailwind v4 theme tokens.

---

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

### Build & verify

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

The production bundle is written to `dist/`.

---

## Contact Form Configuration

The form works out of the box: if no endpoint is configured, it opens the visitor's email client with a prefilled draft.

To post submissions to Formspree, Basin, or a custom API, create `.env` from `.env.example`:

```bash
cp .env.example .env
```

```dotenv
VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
```

The endpoint receives JSON with `name`, `email`, `subject`, `message`, and `source`.

The displayed email address is configured in one place:

```ts
// src/data/profile.ts
email: 'khineminhtun04@gmail.com'
```

The hero portrait and education avatar read from `public/profile.jpg`. If the image is missing, the component falls back to the `KMH` monogram automatically.

---

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   ├── profile.jpg
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── components/
│   │   ├── about/AboutSection.tsx
│   │   ├── common/
│   │   │   ├── Logo.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   └── ToastProvider.tsx
│   │   ├── contact/ContactSection.tsx
│   │   ├── hero/
│   │   │   ├── Hero.tsx
│   │   │   └── TerminalCard.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── projects/
│   │   │   ├── FeaturedProjectCard.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectModal.tsx
│   │   │   ├── ProjectVisual.tsx
│   │   │   └── ProjectsSection.tsx
│   │   └── skills/SkillsSection.tsx
│   ├── data/
│   │   ├── profile.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── terminal.ts
│   ├── hooks/
│   │   ├── useActiveSection.ts
│   │   ├── useLockBodyScroll.ts
│   │   ├── useScrollProgress.ts
│   │   └── useTheme.ts
│   ├── lib/clipboard.ts
│   ├── types/portfolio.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

### Content updates

All portfolio content is typed and centralized:

- `src/data/profile.ts` — identity, education, roles, principles, contact details.
- `src/data/projects.ts` — case studies, filters, metrics, architecture, feature lists, stack, links.
- `src/data/skills.ts` — skill matrix groups.
- `src/data/terminal.ts` — terminal tab outputs.
- `src/index.css` — theme tokens, typography, grid backgrounds, motion and focus styles.

---

## Project Data Source

Project details were verified against the public repositories at
[github.com/khaingminhtun](https://github.com/khaingminhtun), including the READMEs for
`myanmar_kids_learn`, `academic-survival-system`, `PacketSniffer`, `RssAggregator`,
`aws-ecs-fargate-react-lab`, `api-inspector-cli`, and the other public repos featured in the grid.

---

## Deployment

The site is a static Vite build and can be deployed to GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any static host.

For a subpath deployment (for example GitHub Pages), set the Vite `base` option in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/repository-name/',
  plugins: [react(), tailwindcss()],
})
```

Configure `VITE_CONTACT_ENDPOINT` in the host's environment settings if server-side form delivery is desired.

---

## License

Portfolio content and project summaries belong to Khine Min Htun. Third-party project names and technologies remain the property of their respective owners.
