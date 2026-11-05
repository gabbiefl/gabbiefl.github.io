// Formato de content/content.json (um objeto por idioma, mesma estrutura em pt e en).

export type Lang = 'pt' | 'en';

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroContent {
  langLabel: string;
  socialLabel: string;
  navLabel: string;
  themeToDark: string;
  themeToLight: string;
  nav: NavItem[];
  role: string;
  status: string;
  ctaContact: string;
  ctaProjects: string;
  scroll: string;
  /** Texto do link "pular para o conteúdo" (acessibilidade por teclado). */
  skip: string;
}

export interface AboutFact {
  k: string;
  v: string;
  s: string;
}

export interface AboutContent {
  label: string;
  h1a: string;
  h1b: string;
  p1: string;
  p2: string;
  facts: AboutFact[];
  /** URL da foto do Sobre (em public/). Sem ela, o polaroid mostra o avatar pixel. */
  img?: string;
  /** Descrição da foto (alt). */
  imgLabel: string;
}

export interface Job {
  role: string;
  org: string;
  meta: string;
  period: string;
  current: boolean;
  past: boolean;
  bullets: string[];
  /** Projeto em destaque do cargo (opcional): aparece como uma linha discreta abaixo dos itens. */
  highlight?: { name: string; desc: string };
  tech: string[];
}

export interface ExperienceContent {
  label: string;
  h1a: string;
  h1b: string;
  intro: string;
  now: string;
  techLabel: string;
  /** Rótulo do projeto em destaque ('Projeto em destaque'). */
  projectLabel: string;
  jobs: Job[];
}

export interface Project {
  num: string;
  title: string;
  desc: string;
  tech: string[];
  /** URL da imagem do projeto. Sem ela, o cartão mostra a paisagem pixel de placeholder. */
  image?: string;
  /**
   * Como a imagem preenche a miniatura: "cover" (padrão) preenche e corta o excesso, bom para
   * capturas de tela; "contain" mostra inteira e centralizada, bom para ícones de app (quadrados).
   * É `string` (e não a união "cover" | "contain") porque o TypeScript lê textos de um JSON como
   * `string`; o componente trata qualquer valor diferente de "contain" como "cover".
   */
  imageFit?: string;
  /**
   * Formato da imagem: "circle" recorta num círculo centralizado (símbolos e logos); qualquer outro
   * valor, ou ausente, usa a área inteira (conforme `imageFit`). É `string` pelo mesmo motivo do
   * `imageFit`: o TypeScript lê textos de um JSON como `string`.
   */
  imageShape?: string;
  /** Link do botão da demo. Sem ele, o botão NÃO aparece. */
  demoUrl?: string;
  /** Link do botão do código. Sem ele, o botão NÃO aparece. */
  codeUrl?: string;
}

export interface ProjectsContent {
  label: string;
  h1a: string;
  h1b: string;
  intro: string;
  thumbLabel: string;
  techLabel: string;
  demo: string;
  code: string;
  /** Rótulo acessível da seta "voltar" do carrossel de projetos. */
  prev: string;
  /** Rótulo acessível da seta "avançar" do carrossel de projetos. */
  next: string;
  projects: Project[];
}

export interface StackGroup {
  title: string;
  items: string[];
}

export interface StackContent {
  label: string;
  h1a: string;
  h1b: string;
  intro: string;
  g1: StackGroup;
  g2: StackGroup;
  g3: StackGroup;
  g4: StackGroup;
  g5: StackGroup;
}

export interface ContactLink {
  isMail: boolean;
  isGithub: boolean;
  isLinkedin: boolean;
  label: string;
  value: string;
  href: string;
}

export interface ContactContent {
  label: string;
  h1a: string;
  h1b: string;
  send: string;
  status: string;
  listLabel: string;
  top: string;
  mailto: string;
  links: ContactLink[];
}

export interface Content {
  hero: HeroContent;
  about: AboutContent;
  experience: ExperienceContent;
  projects: ProjectsContent;
  stack: StackContent;
  contact: ContactContent;
}
