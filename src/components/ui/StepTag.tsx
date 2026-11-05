import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface StepTagProps {
  /** "li" quando estiver numa lista (Stack). */
  as?: 'span' | 'li';
  className?: string;
  children: ReactNode;
}

/** Tag em degrau: degraus 3/1px, 15px/500; no hover fica rosa com texto escuro. */
export function StepTag({ as: Tag = 'span', className, children }: StepTagProps) {
  return (
    <Tag className={cn('group block bg-ink p-0.5 pixel-clip pixel-step-3', className)}>
      <span className="block bg-paper px-3.5 py-[5px] text-[14px] leading-[1.4] font-medium text-ink pixel-clip pixel-step-1 group-hover:bg-pink group-hover:text-chip-ink">
        {children}
      </span>
    </Tag>
  );
}
