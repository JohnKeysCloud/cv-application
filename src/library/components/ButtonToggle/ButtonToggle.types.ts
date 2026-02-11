import type { MouseEventHandler, ReactNode } from 'react';

//
// -----------------------------
// Visual variants
//
export type VisualVariant = 'hamburger' | 'icon' | 'avatar' | 'badge';

export interface ButtonToggleProps {
  controlledElementId: string;
  isControlledElementActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;

  classNames?: string[];
  ariaLabel?: string;
  visual?: VisualVariant;
  iconUrl?: string;
  children?: ReactNode;
}
