import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { makeFaIcon } from './FaIcon';

/**
 * Ícone de e-mail do Contato, do Font Awesome (substitui o envelope pixel). Sem classe de cor:
 * herda `currentColor`, então acompanha a cor do texto da linha (que fica escura no hover rosa).
 */
export const Envelope = makeFaIcon(faEnvelope, { size: 20, className: '' });
