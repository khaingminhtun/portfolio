import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  ArrowUpRight,
  Copy,
  Loader2,
  Mail,
  MessageSquare,
  Send,
} from 'lucide-react'
import { profile } from '../../data/profile'
import { copyText } from '../../lib/clipboard'
import { GitHubIcon } from '../common/GitHubIcon'
import { useToast } from '../common/toast'
import { SectionHeading } from '../common/SectionHeading'

interface FormValues {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const emptyForm: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Enter your name (at least 2 characters).'
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (values.subject.trim().length < 3) {
    errors.subject = 'Add a subject (at least 3 characters).'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Tell me a little more (at least 10 characters).'
  }

  return errors
}

export function ContactSection() {
  const { pushToast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      setForm((current) => ({ ...current, [field]: value }))

      if (errors[field]) {
        setErrors((current) => {
          const next = { ...current }
          delete next[field]
          return next
        })
      }
    }

  const handleCopy = async (value: string, label: string) => {
    try {
      await copyText(value)
      pushToast({
        tone: 'success',
        title: `${label} copied`,
        description: 'Ready to paste wherever you need it.',
      })
    } catch {
      pushToast({
        tone: 'error',
        title: 'Clipboard unavailable',
        description: `Copy manually: ${value}`,
      })
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateForm(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      })
      return
    }

    setIsSubmitting(true)

    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim()

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ ...form, source: 'khine-portfolio' }),
        })

        if (!response.ok) {
          throw new Error(`Contact endpoint returned ${response.status}`)
        }

        pushToast({
          tone: 'success',
          title: 'Message sent',
          description: 'Thanks for reaching out. I will get back to you soon.',
        })
      } else {
        const body = `${form.message}\n\n— ${form.name} (${form.email})`
        const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
          form.subject,
        )}&body=${encodeURIComponent(body)}`
        window.location.href = mailto

        pushToast({
          tone: 'info',
          title: 'Email draft ready',
          description: 'Your mail client should open with the message prefilled.',
        })
      }

      setForm(emptyForm)
      setErrors({})
    } catch {
      pushToast({
        tone: 'error',
        title: 'Could not send the message',
        description: `Please email me directly at ${profile.email}.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClass = (field: keyof FormValues) =>
    `w-full rounded-lg border bg-surface-raised px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-amber/60 focus:border-amber focus:ring-amber/15'
        : 'border-line focus:border-accent/60 focus:ring-accent/15'
    }`

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-b border-line/60 bg-surface/25 py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-35 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
        <div className="absolute -right-24 bottom-0 size-[420px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Let's build something reliable."
          description="Open to backend software engineering and full-stack conversations. The fastest path is GitHub or the form below."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-4">
            <div className="rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald-soft px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald">
                <span className="size-1.5 rounded-full bg-emerald pulse-dot" aria-hidden="true" />
                {profile.availability}
              </div>

              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-ink">
                Direct channels
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Based in {profile.location}. Open to full-time backend roles, API and database work,
                and collaborative product teams.
              </p>

              <div className="mt-5 space-y-2.5">
                <div className="rounded-lg border border-line bg-surface-raised p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-md border border-line bg-surface text-ink">
                        <GitHubIcon className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
                          github
                        </p>
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="block truncate text-xs font-medium text-ink hover:text-accent"
                        >
                          github.com/{profile.githubHandle}
                        </a>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleCopy(profile.github, 'GitHub URL')}
                        className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-2 py-1.5 font-mono text-[9px] text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
                        aria-label="Copy URL"
                        title="Copy GitHub profile URL"
                      >
                        <Copy className="size-3" aria-hidden="true" />
                        Copy URL
                      </button>
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="grid size-7 place-items-center rounded-md border border-line bg-surface text-muted transition-colors hover:text-ink"
                        aria-label="Open GitHub profile"
                      >
                        <ArrowUpRight className="size-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-line bg-surface-raised p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-md border border-line bg-surface text-ink">
                        <Mail className="size-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
                          email
                        </p>
                        <a
                          href={`mailto:${profile.email}`}
                          className="block truncate text-xs font-medium text-ink hover:text-accent"
                        >
                          {profile.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(profile.email, 'Email address')}
                      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-line bg-surface px-2 py-1.5 font-mono text-[9px] text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
                      aria-label="Copy email address"
                    >
                      <Copy className="size-3" aria-hidden="true" />
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-4 flex items-start gap-2 rounded-md border border-line bg-surface-raised/50 p-2.5 text-[10px] leading-5 text-muted">
                <MessageSquare className="mt-0.5 size-3 shrink-0 text-accent" aria-hidden="true" />
                No endpoint configured? The form opens a prefilled email draft instead of silently
                dropping your message.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                currently exploring
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {profile.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-md border border-line bg-surface-raised px-2.5 py-1.5 font-mono text-[10px] text-ink-soft"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  send a message
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-ink">
                  Start a conversation
                </h3>
              </div>
              <span className="hidden rounded-md border border-line bg-surface-raised px-2 py-1 font-mono text-[8px] text-muted sm:inline">
                POST /contact
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-ink-soft">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={fieldClass('name')}
                  placeholder="Your name"
                  required
                />
                {errors.name ? (
                  <p id="contact-name-error" className="mt-1.5 text-[10px] text-amber">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-ink-soft">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={fieldClass('email')}
                  placeholder="you@company.com"
                  required
                />
                {errors.email ? (
                  <p id="contact-email-error" className="mt-1.5 text-[10px] text-amber">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-medium text-ink-soft">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={updateField('subject')}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                className={fieldClass('subject')}
                placeholder="Backend role · API design · project collaboration"
                required
              />
              {errors.subject ? (
                <p id="contact-subject-error" className="mt-1.5 text-[10px] text-amber">
                  {errors.subject}
                </p>
              ) : null}
            </div>

            <div className="mt-4">
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-ink-soft">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={updateField('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`${fieldClass('message')} resize-y`}
                placeholder="What are you building, and where do you need help?"
                required
              />
              {errors.message ? (
                <p id="contact-message-error" className="mt-1.5 text-[10px] text-amber">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[9px] leading-4 text-muted">
                Client-side validated.
                <br className="hidden sm:block" /> No tracking. No silent failures.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="size-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
