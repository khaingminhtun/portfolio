import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [activeSection, setActiveSection] = useState('')
  const sectionKey = ids.join('|')

  useEffect(() => {
    const sectionIds = sectionKey.split('|').filter(Boolean)
    let frame = 0

    const updateActiveSection = () => {
      const probeLine = window.scrollY + window.innerHeight * 0.28
      let current = ''

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) {
          continue
        }

        const top = element.getBoundingClientRect().top + window.scrollY
        if (top <= probeLine) {
          current = id
        }
      }

      setActiveSection(current)
    }

    const onScroll = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0
        updateActiveSection()
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionKey])

  return activeSection
}
