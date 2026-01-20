import type { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode; 
  controlledElementId: string;
  isControlledElementActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset'; 
  classNames?: string[]; 
  id?: string;
}

export function Button({
  children,
  controlledElementId,
  isControlledElementActive,
  onClick,
  type = 'button',
  classNames = [],
  id
}: ButtonProps) {
  return (
    <button
      type={type}
      id={id}
      className={clsx(classNames)}
      onClick={onClick}
      aria-controls={controlledElementId}
      aria-expanded={isControlledElementActive}
    >
      {children}
    </button>
  );
}
