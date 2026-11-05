import {
  faChartSimple,
  faCode,
  faDatabase,
  faMobileScreenButton,
  faPenRuler,
  faServer,
} from '@fortawesome/free-solid-svg-icons';
import { makeFaIcon } from './FaIcon';

/**
 * Os 6 ícones da Stack, do Font Awesome. A caixa pixel (PixelCard) continua dando o visual
 * "pixel"; o ícone dentro dela é vetorial e limpo.
 *
 * `text-chip-ink` deixa o ícone SEMPRE escuro (currentColor = --chip-ink), para contrastar com o
 * fundo rosa/azul da caixa nos dois temas. Os nomes dos componentes foram mantidos de propósito:
 * quem os usa (Stack.tsx e /kit) não precisa saber de qual biblioteca vêm.
 */
const stack = { size: 26, className: 'text-chip-ink' };

/** Front-end: < > */
export const CodeIcon = makeFaIcon(faCode, stack);
/** Back-end: servidor */
export const ServerIcon = makeFaIcon(faServer, stack);
/** Bancos de dados e ORM */
export const DatabaseIcon = makeFaIcon(faDatabase, stack);
/** Ferramentas e design: régua e caneta */
export const PenIcon = makeFaIcon(faPenRuler, stack);
/** Mobile */
export const PhoneIcon = makeFaIcon(faMobileScreenButton, stack);
/** Dados: barras */
export const ChartIcon = makeFaIcon(faChartSimple, stack);
