import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from '/ToggleButton.module.scss';
import type { VisualVariant, ButtonToggleProps } from './ButtonToggle.types';

//
// -----------------------------
// Variant → CSS mapping
//
const VISUAL_CLASSES: Record<VisualVariant, keyof typeof styles> = {
  hamburger: 'hamburger',
  icon: 'icon',
  avatar: 'avatar',
  badge: 'badge',
};

export function ButtonToggle({
  controlledElementId,
  isControlledElementActive,
  onClick,
  classNames = [],
  ariaLabel,
  visual = 'hamburger',
  iconUrl,
  children,
}: ButtonToggleProps) {
  //
  // -----------------------------
  // Visual renderer
  // (single source of truth, mutually exclusive)
  //
  function renderVisual(): ReactNode {
    switch (visual) {
      case 'hamburger':
        return <div className={styles['hamburger-bars']} />;

      case 'icon':
        return iconUrl ? <img src={iconUrl} alt="" /> : null;

      case 'avatar':
        return <div className={styles['avatar-container']}>{children}</div>;

      case 'badge':
        return <div className={styles['badge-container']}>{children}</div>;

      default:
        return null;
    }
  }

  //
  // -----------------------------
  // Accessibility label
  //
  const finalAriaLabel =
    ariaLabel ?? `Toggle element with ID: ${controlledElementId}`;

  //
  // -----------------------------
  // Final className
  //
  const classNameValue = clsx(
    styles['toggle'], // ? enables scoped styling
    styles[visual],
    VISUAL_CLASSES[visual],
    ...classNames
  );

  return (
    <button
      type="button"
      className={classNameValue}
      onClick={onClick}
      aria-label={finalAriaLabel}
      aria-controls={controlledElementId}
      aria-expanded={isControlledElementActive}
    >
      {renderVisual()}
    </button>
  );
}
