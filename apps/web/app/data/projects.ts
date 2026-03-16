export type Locale = 'pt' | 'en'

export interface StaticProject {
  id: string
  title: string
  description: Record<Locale, string>
  tags: string[]
  demoUrl?: string
}

export const staticProjects: StaticProject[] = [
  {
    id: 'oxala-menu',
    title: 'Oxalá Menu',
    description: {
      pt: 'Novo menu digital para o Restaurante Oxalá, em Ovar.',
      en: 'A new menu for the Oxalá Restaurant in Ovar.',
    },
    tags: ['TypeScript', 'Next.js + React', 'Sanity CMS', 'Tailwind CSS'],
    demoUrl: 'https://github.com/Dinis1727/Oxala',
  },
  {
    id: 'masterfork',
    title: 'Masterfork',
    description: {
      pt: 'Website renovado para a empresa Masterfork e para a marca de cerveja artesanal Masterbeer.',
      en: 'Renovated website for Masterfork company and craft beer brand Masterbeer.',
    },
    tags: ['Next.js + React', 'Express + Node.js', 'JavaScript', 'Tailwind CSS', 'JWT auth', 'PostgreSQL'],
    demoUrl: 'https://github.com/Dinis1727/Masterfork',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: {
      pt: 'Portfólio com o objetivo de apresentar os projetos que desenvolvi.',
      en: 'Portfolio with the objective of showing the projects I have developed.',
    },
    tags: ['TypeScript', 'NestJS', 'Next.js + React', 'Tailwind CSS', 'PostgreSQL'],
    demoUrl: 'https://github.com/Dinis1727/Portfolio',
  },
]
