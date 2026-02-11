import clsx from 'clsx';
import type { ButtonGenericProps } from './Button.Generic.types';

export function ButtonGeneric({
  children,
  controlledElementId,
  isControlledElementActive,
  onClick,
  type = 'button',
  classNames = [],
  id
}: ButtonGenericProps) {
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
