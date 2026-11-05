import raw from '../../content/content.json';
import type { Content, Lang } from './types';

// A anotação faz o TypeScript conferir pt e en contra o mesmo formato.
export const contents: Record<Lang, Content> = raw;
