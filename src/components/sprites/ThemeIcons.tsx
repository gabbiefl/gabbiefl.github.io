import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { makeFaIcon } from './FaIcon';

/**
 * Ícones do toggle de tema, do Font Awesome. Sem classe de cor: herdam `currentColor`, ou seja,
 * a cor do texto do botão, que já troca com o tema (escuro no claro, creme no escuro).
 *
 * Uso: o botão mostra a Lua quando está no claro (clicar ativa o escuro) e o Sol no escuro.
 */
const theme = { size: 20, className: '' };

export const Sun = makeFaIcon(faSun, theme);
export const Moon = makeFaIcon(faMoon, theme);
