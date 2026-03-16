'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import ProjectCard from './components/ProjectCard'
import { ArrowRight, Download, Github, Instagram, Linkedin, Mail, Phone } from 'lucide-react'
import styles from './page.module.css'
import { staticProjects } from './data/projects'

type Locale = 'pt' | 'en'

const fullName = 'Dinis Félix'
const contactEmail = 'dinisdev1@gmail.com'
const contactPhone = '+351 918 544 992'

const copy = {
  pt: {
    roles: ['Desenvolvedor Full Stack', 'Desenvolvimento Web Moderno', 'Soluções Inovadoras'],
    followMe: 'Segue-me',
    heroTitle: `Olá, sou o ${fullName}`,
    heroDescription:
      'Desenvolvedor focado em criar experiências web funcionais e aplicações escaláveis, com arquitetura sólida, performance e código limpo.',
    portfolioBtn: 'Meus Projetos',
    contactBtn: 'Contactos',
    downloadBtn: 'Descarregar CV',
    aboutLead:
      'Acredito numa abordagem focada no utilizador, garantindo que cada projeto que desenvolvo é pensado para responder às necessidades reais de quem o utiliza.',
    aboutMini: 'Isto sou eu.',
    aboutHello: `Olá, sou o ${fullName}.`,
    aboutBodyOne:
      'Acredito na criação de experiências digitais completas e centradas no utilizador, garantindo que cada produto que desenvolvo seja tecnicamente sólido e relevante para quem o utiliza.',
    aboutBodyTwo: `Sou um desenvolvedor full stack dedicado a transformar ideias em aplicações escaláveis para o mundo real. Trabalho tanto com frontend como backend, criando interfaces intuitivas e, ao mesmo tempo, sistemas fiáveis e de alto desempenho e segurança.
      A minha abordagem foca-se numa arquitetura limpa, alta performance e fácil usabilidade. Ao combinar tecnologias modernas com design pensado ao detalhe, procuro entregar soluções que não só funcionam com eficiência, como também agregam valor real para os utilizadores e negócios.`,
    aboutTitle: 'Sobre Mim',
    aboutText:
      'Desenvolvedor Full Stack especializado em construir produtos web que resolvem problemas reais de negócio.',
    solveTitle: 'O Que Eu Resolvo',
    solveText:
      'Empresas perdem dinheiro com sistemas lentos, interfaces confusas e processos manuais. Eu construo aplicações rápidas, intuitivas e automatizadas que aumentam conversão e economizam tempo.',
    stackTitle: 'A MINHA STACK',
    toolsTitle: 'Ferramentas',
    projectsTitle: 'Projetos',
    loadingProjects: 'A carregar projetos...',
    contactKicker: 'ENTRAR EM CONTACTO',
    contactTitle: 'Contacto',
    contactText:
      'Tem um projeto em mente? Entre em contacto comigo e responderei o mais breve possível.',
    contactEmailLabel: 'EMAIL',
    contactEmailHint: 'A melhor forma de me contactar. Resposta dentro de 24 horas.',
    contactEmailAction: 'ENVIAR EMAIL',
    contactCvLabel: 'CURRICULUM VITAE',
    contactCvTitle: 'Descarregar CV',
    contactCvHint: 'Visão completa da minha experiência, educação e competências técnicas.',
    contactCvAction: 'DESCARREGAR PDF',
  },
  en: {
    roles: ['Full Stack Developer', 'Modern Web Development', 'Innovative Solutions'],
    followMe: 'Follow me',
    heroTitle: `Hello, I am ${fullName}`,
    heroDescription:
      'Engineer focused on building functional web experiences and scalable applications with solid architecture, performance, and clean code.',
    portfolioBtn: 'My Projects',
    contactBtn: 'Contacts',
    downloadBtn: 'Download CV',
    aboutLead:
      'I believe in a user centered approach, ensuring every project I build is tailored to the real needs of its users.',
    aboutMini: 'This is me.',
    aboutHello: `Hi, I am ${fullName}.`,
    aboutBodyOne:
      'I believe in building complete, user focused digital experiences, ensuring that every product I create is both technically robust and meaningful to the people who use it.',
    aboutBodyTwo: `I'm a full stack developer dedicated to transforming ideas into scalable, real world applications. I work across both frontend and backend, crafting intuitive interfaces while designing reliable, high performance systems behind the scenes.
      My approach centers on clean architecture, performance, and usability. By combining modern technologies with thoughtful design, I aim to deliver solutions that not only function efficiently but also provide genuine value to users and businesses.`,
    aboutTitle: 'About Me',
    aboutText:
      'Full Stack Developer specialized in building web products that solve real business problems.',
    solveTitle: 'What I Solve',
    solveText:
      'Companies lose money with slow systems, confusing interfaces, and manual processes. I build fast, intuitive, and automated applications that increase conversion and save time.',
    stackTitle: 'MY STACK',
    toolsTitle: 'Tools',
    projectsTitle: 'Projects',
    loadingProjects: 'Loading projects...',
    contactKicker: 'GET IN TOUCH',
    contactTitle: 'Contact',
    contactText:
      'Have a project in mind? Contact me and I will reply as soon as possible.',
    contactEmailLabel: 'EMAIL',
    contactEmailHint: 'The best way to reach me. Answers within 24 hours.',
    contactEmailAction: 'SEND EMAIL',
    contactCvLabel: 'CURRICULUM VITAE',
    contactCvTitle: 'Download CV',
    contactCvHint: 'Complete view of my experience, education, and technical skills.',
    contactCvAction: 'DOWNLOAD PDF',
  },
} as const

const socialLinks = [
  {
    href: 'https://github.com/Dinis1727',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://www.linkedin.com/in/dinis-f%C3%A9lix-4baa2030a/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://instagram.com/dinis.19_',
    label: 'Instagram',
    icon: Instagram,
  },
]

export default function Home() {
  //const [projects, setProjects] = useState<any[]>([])
  //const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [animatedText, setAnimatedText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [animationStarted, setAnimationStarted] = useState(false)
  const [caretVisible, setCaretVisible] = useState(true)
  const [locale, setLocale] = useState<Locale>('pt')

  const t = copy[locale]
  const projects = staticProjects.map(project => ({
    ...project,
    description: project.description[locale],
  }))

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (!section) return

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  useEffect(() => {
    const storedLocale = (localStorage.getItem('portfolio:language') as Locale | null) ?? 'pt'
    setLocale(storedLocale)

    const onSettingsChanged = (event: Event) => {
      const detail = (event as CustomEvent<{ language?: Locale }>).detail
      if (detail?.language) setLocale(detail.language)
    }

    window.addEventListener('portfolio:settings-changed', onSettingsChanged)
    return () => window.removeEventListener('portfolio:settings-changed', onSettingsChanged)
  }, [])

  /*
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
        const res = await fetch(`${base}/projects`)
        const data = await res.json()
        setProjects(data)
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])
  */

  useEffect(() => {
    setAnimatedText('')
    setRoleIndex(0)
    setIsDeleting(false)
    setAnimationStarted(false)

    const startDelay = window.setTimeout(() => {
      setAnimationStarted(true)
    }, 500)

    return () => clearTimeout(startDelay)
  }, [locale])

  useEffect(() => {
    if (!animationStarted) return

    const currentRoles = t.roles
    const currentRole = currentRoles[roleIndex % currentRoles.length]

    if (!isDeleting && animatedText === currentRole) {
      const holdDelay = window.setTimeout(() => {
        setIsDeleting(true)
      }, 1200)

      return () => clearTimeout(holdDelay)
    }

    if (isDeleting && animatedText.length === 0) {
      const nextRoleDelay = window.setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex(prev => (prev + 1) % currentRoles.length)
      }, 220)

      return () => clearTimeout(nextRoleDelay)
    }

    const typingDelay = window.setTimeout(
      () => {
        setAnimatedText(prev =>
          isDeleting
            ? currentRole.slice(0, Math.max(prev.length - 1, 0))
            : currentRole.slice(0, prev.length + 1),
        )
      },
      isDeleting ? 45 : 85,
    )

    return () => clearTimeout(typingDelay)
  }, [animatedText, roleIndex, isDeleting, animationStarted, t.roles])

  useEffect(() => {
    const blink = setInterval(() => setCaretVisible(prev => !prev), 500)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    let frame = 0

    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      setScrollProgress(Math.min(1, Math.max(0, nextProgress)))
      frame = 0
    }

    const onScrollOrResize = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (frame) window.cancelAnimationFrame(frame)
    }
  //}, [loading, projects.length])
  }, [projects.length])

  useEffect(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>(`.${styles.skillsRow}`))
    if (!rows.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const target = entry.target as HTMLElement
          const inView = entry.isIntersecting && entry.intersectionRatio > 0.18
          target.dataset.inview = inView ? 'true' : 'false'
        })
      },
      {
        threshold: [0.14, 0.3, 0.45],
        rootMargin: '0px 0px -10% 0px',
      },
    )

    rows.forEach((row, rowIndex) => {
      row.dataset.inview = 'false'
      const label = row.querySelector<HTMLElement>(`.${styles.skillsLabel}`)
      const chips = Array.from(row.querySelectorAll<HTMLElement>(`.${styles.skillChip}`))
      const rowDelay = rowIndex * 260

      if (label) label.style.setProperty('--reveal-delay', `${rowDelay}ms`)

      chips.forEach((chip, chipIndex) => {
        chip.style.setProperty('--reveal-delay', `${rowDelay + 110 + chipIndex * 75}ms`)
      })

      observer.observe(row)
    })

    return () => observer.disconnect()
  }, [locale])

  useEffect(() => {
    const textNodes = Array.from(document.querySelectorAll<HTMLElement>(`.${styles.textReveal}`))
    if (!textNodes.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const target = entry.target as HTMLElement
          const inView = entry.isIntersecting && entry.intersectionRatio > 0.16
          target.dataset.reveal = inView ? 'true' : 'false'
        })
      },
      {
        threshold: [0.12, 0.24, 0.4],
        rootMargin: '0px 0px -10% 0px',
      },
    )

    textNodes.forEach((node, index) => {
      node.dataset.reveal = 'false'
      node.style.setProperty('--text-reveal-delay', `${Math.min(index * 45, 520)}ms`)
      observer.observe(node)
    })

    return () => observer.disconnect()
  //}, [locale, loading, projects.length])
  }, [locale, projects.length])

  return (
    <div className={styles.page}>
      <div className={styles.scrollProgress} aria-hidden>
        <span className={styles.scrollProgressTrack}>
          <span className={styles.scrollProgressFill} style={{ height: `${scrollProgress * 100}%` }} />
        </span>
      </div>

      <section id="home" className={styles.hero}>
        <div className={styles.heroLeft}>
          <aside className={styles.socialRail}>
            <div className={styles.socialLine} />
            <div className={styles.socialIcons}>
              {socialLinks.map(item => {
                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={item.label}
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
            <p className={styles.socialLabel}>{t.followMe}</p>
          </aside>

          <div className={styles.heroContent}>
            <h1 className={styles.title}>{t.heroTitle}</h1>
            <p className={styles.role}>
              {animationStarted ? animatedText : ''}
              <span className={`${styles.caret} ${caretVisible ? styles.caretVisible : ''}`} aria-hidden />
            </p>
            <p className={styles.description}>{t.heroDescription}</p>

            <div className={styles.actions}>
              <button type="button" className={styles.primaryButton} onClick={() => scrollToSection('projects')}>
                {t.portfolioBtn}
              </button>
              <button type="button" className={styles.secondaryButton} onClick={() => scrollToSection('contact')}>
                {t.contactBtn}
              </button>
              <a
                href="/Dinis-Felix-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                {t.downloadBtn}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <Image
            src="/profile.png"
            alt="Dinis Félix"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section id="about" className={`${styles.contentSection} ${styles.aboutSection}`}>
        <div className={styles.sectionInnerFull}>
          <div id="about-lead" className={styles.aboutIntro}>
            <p className={`${styles.aboutLead} ${styles.textReveal}`}>{t.aboutLead}</p>
            <p className={`${styles.aboutMini} ${styles.textReveal}`}>{t.aboutMini}</p>
            <div className={styles.aboutDivider} />
            <div className={styles.aboutProfileGrid}>
              <h3 className={`${styles.aboutProfileTitle} ${styles.textReveal}`}>{t.aboutHello}</h3>
              <div className={styles.aboutProfileBody}>
                <p className={styles.textReveal}>{t.aboutBodyOne}</p>
                {t.aboutBodyTwo.split('\n\n').map((paragraph, index) => (
                  <p key={`about-body-two-${index}`} className={styles.textReveal}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div id="stack" className={styles.aboutStackOnly}>
            <p className={`${styles.stackKicker} ${styles.textReveal}`}>{t.stackTitle}</p>
            <div className={styles.skillsMatrix}>
              <div className={styles.skillsRow}>
                <h4 className={styles.skillsLabel}>FRONTEND</h4>
                <ul className={styles.skillsItems}>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/js.png" alt="JavaScript" width={28} height={28} className={styles.skillIconImg} /></span><span>JavaScript</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/ts.png" alt="TypeScript" width={28} height={28} className={styles.skillIconImg} /></span><span>TypeScript</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/react.svg" alt="React" width={28} height={28} className={styles.skillIconImg} /></span><span>React</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/next.webp" alt="Next.js" width={28} height={28} className={styles.skillIconImg} /></span><span>Next.js</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/tailwind.svg" alt="Tailwind CSS" width={28} height={28} className={styles.skillIconImg} /></span><span>Tailwind CSS</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/bootstrap.svg" alt="Bootstrap" width={28} height={28} className={styles.skillIconImg} /></span><span>Bootstrap</span></li>
                </ul>
              </div>

              <div className={styles.skillsRow}>
                <h4 className={styles.skillsLabel}>BACKEND</h4>
                <ul className={styles.skillsItems}>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/node.svg" alt="Node.js" width={28} height={28} className={styles.skillIconImg} /></span><span>Node.js</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/nest.svg" alt="NestJS" width={28} height={28} className={styles.skillIconImg} /></span><span>NestJS</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/csharp.svg" alt="C#" width={28} height={28} className={styles.skillIconImg} /></span><span>C#</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/java.svg" alt="Java" width={28} height={28} className={styles.skillIconImg} /></span><span>Java</span></li>
                </ul>
              </div>

              <div className={styles.skillsRow}>
                <h4 className={styles.skillsLabel}>DATABASE</h4>
                <ul className={styles.skillsItems}>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/postgreSQL.webp" alt="PostgreSQL" width={28} height={28} className={styles.skillIconImg} /></span><span>PostgreSQL</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/mysql.svg" alt="MySQL" width={28} height={28} className={styles.skillIconImg} /></span><span>MySQL</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/prisma.png" alt="Prisma" width={28} height={28} className={`${styles.skillIconImg} ${styles.skillIconInvertOnLight}`} /></span><span>Prisma</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/mongodb.svg" alt="MongoDB" width={28} height={28} className={styles.skillIconImg} /></span><span>MongoDB</span></li>
                </ul>
              </div>

              <div className={styles.skillsRow}>
                <h4 className={`${styles.skillsLabel} ${styles.skillsLabelTools}`}>{locale === 'pt' ? 'FERRAMENTAS' : 'TOOLS'}</h4>
                <ul className={styles.skillsItems}>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/git.png" alt="Git" width={28} height={28} className={styles.skillIconImg} /></span><span>Git</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/docker.svg" alt="Docker" width={28} height={28} className={`${styles.skillIconImg} ${styles.skillIconInvertOnLight}`} /></span><span>Docker</span></li>
                  <li className={styles.skillChip}><span className={styles.skillIcon}><Image src="/tools/aws.png" alt="AWS" width={28} height={28} className={styles.skillIconImg} /></span><span>AWS</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className={`${styles.contentSectionAlt} ${styles.projectsSection}`}>
        <div className={styles.sectionInnerWide}>
          <h2 className={`${styles.sectionTitle} ${styles.textReveal}`}>{t.projectsTitle}</h2>
          {/*loading ? (
            <p className={`${styles.sectionText} ${styles.textReveal}`}>{t.loadingProjects}</p>
          ) : (
            <div className={styles.projectGrid}>
              {projects.map(p => (
                <ProjectCard
                  key={p.id}
                  title={p.title}
                  description={p.description}
                  tags={p.tags}
                  demoUrl={p.demoUrl}
                  className={styles.textReveal}
                />
              ))}
            </div>
          )}
          */
          }
          <div className={styles.projectGrid}>
            {projects.map(p => (
              <ProjectCard
                key={p.id}
                title={p.title}
                description={p.description}
                tags={p.tags}
                demoUrl={p.demoUrl}
                className={styles.textReveal}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`${styles.contentSectionAlt} ${styles.contactSection}`}>
        <div className={styles.sectionInnerWide}>
          <div className={styles.contactHeader}>
            <p className={`${styles.contactKicker} ${styles.textReveal}`}>{t.contactKicker}</p>
            <h2 className={`${styles.contactTitle} ${styles.textReveal}`}>{t.contactTitle}</h2>
            <p className={`${styles.contactLead} ${styles.textReveal}`}>{t.contactText}</p>
          </div>

          <div className={styles.contactCardGrid}>
            <article className={`${styles.contactCard} ${styles.textReveal}`}>
              <span className={styles.contactIconBox} aria-hidden>
                <Mail size={20} />
              </span>
              <p className={styles.contactCardLabel}>{t.contactEmailLabel}</p>
              <a href={`mailto:${contactEmail}`} className={styles.contactMainLink}>
                {contactEmail}
              </a>
              <p className={styles.contactCardText}>{t.contactEmailHint}</p>
              <a href={`mailto:${contactEmail}`} className={styles.contactAction}>
                <span>{t.contactEmailAction}</span>
                <ArrowRight size={16} />
              </a>
            </article>

            <article className={`${styles.contactCard} ${styles.textReveal}`}>
              <span className={styles.contactIconBox} aria-hidden>
                <Download size={20} />
              </span>
              <p className={styles.contactCardLabel}>{t.contactCvLabel}</p>
              <a href="/Dinis-Felix-CV.pdf" target="_blank" rel="noopener noreferrer" className={styles.contactMainLink}>
                {t.contactCvTitle}
              </a>
              <p className={styles.contactCardText}>{t.contactCvHint}</p>
              <a
                href="/Dinis-Felix-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactAction}
              >
                <span>{t.contactCvAction}</span>
                <ArrowRight size={16} />
              </a>
            </article>
          </div>

          <div className={`${styles.contactPhoneWrap} ${styles.textReveal}`}>
            <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className={styles.contactPhoneChip}>
              <Phone size={15} />
              <span>{contactPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
