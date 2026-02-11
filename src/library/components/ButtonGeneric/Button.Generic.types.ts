import type { MouseEventHandler, ReactNode } from 'react';

export interface ButtonGenericProps {
  children: ReactNode;
  controlledElementId: string;
  isControlledElementActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  classNames?: string[];
  id?: string;
}
