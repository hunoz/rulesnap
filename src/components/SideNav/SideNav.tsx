import { useState, useEffect, useCallback } from "react"
import "./SideNav.css"

export interface NavItem {
  id: string
  label: string
  icon?: string
  /** If provided, called instead of scroll-to-section */
  onSelect?: () => void
}

export interface NavGroup {
  title?: string
  items: NavItem[]
}

interface SideNavProps {
  groups: NavGroup[]
}

export default function SideNav({ groups }: SideNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  const toggle = useCallback(() => setIsOpen((o) => !o), [])

  // Collect all scrollable items (those without onSelect) for intersection tracking
  const scrollableItems = groups.flatMap((g) => g.items.filter((i) => !i.onSelect))

  useEffect(() => {
    if (scrollableItems.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    )

    for (const item of scrollableItems) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups])

  const handleClick = (item: NavItem) => {
    if (item.onSelect) {
      item.onSelect()
    } else {
      const el = document.getElementById(item.id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
        setActiveId(item.id)
      }
    }
    if (window.innerWidth < 768) setIsOpen(false)
  }

  return (
    <>
      <button
        className="sidenav-toggle"
        onClick={toggle}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
      >
        <span className="sidenav-toggle-icon" aria-hidden="true">
          {isOpen ? "✕" : "☰"}
        </span>
      </button>

      <nav className={`sidenav ${isOpen ? "sidenav--open" : ""}`} aria-label="Page navigation">
        {groups.map((group, gi) => (
          <div className="sidenav-group" key={gi}>
            {group.title && <div className="sidenav-title">{group.title}</div>}
            <ul className="sidenav-list" role="list">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sidenav-link ${activeId === item.id ? "sidenav-link--active" : ""}`}
                    onClick={() => handleClick(item)}
                  >
                    {item.icon && (
                      <span className="sidenav-link-icon" aria-hidden="true">{item.icon}</span>
                    )}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {isOpen && <div className="sidenav-backdrop" onClick={toggle} aria-hidden="true" />}
    </>
  )
}
