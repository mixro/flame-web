import { useEffect, useRef } from 'react';

// Shared scroll lock: several overlays (menu, cart) can be open without undoing each other.
let locks = 0;
function lock() {
  locks += 1;
  if (locks === 1) {
    const bar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (bar > 0) document.body.style.paddingRight = `${bar}px`;
  }
}
function unlock() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Behaviour for a modal panel (drawer): locks page scroll, closes on Escape,
 * keeps Tab inside the panel, and returns focus to whatever opened it.
 */
export function useOverlay(open, onClose, panelRef, initialFocusRef) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const opener = document.activeElement;
    lock();
    const panel = panelRef.current;
    const first = initialFocusRef?.current || panel?.querySelector(FOCUSABLE);
    // Wait a frame so the panel is visible before focusing.
    const raf = requestAnimationFrame(() => first?.focus());

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = [...panel.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      unlock();
      if (opener && typeof opener.focus === 'function' && document.contains(opener)) opener.focus();
    };
  }, [open, panelRef, initialFocusRef]);
}
