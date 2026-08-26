import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { spring, project, shouldCommit } from '@/lib/motion';

/* ============================================================
   Modal
   ------------------------------------------------------------
   A sheet that scales out of the control that opened it, can be
   thrown downward to dismiss, and unmounts when its exit spring
   finishes rather than on a timer racing the animation.

   The previous implementation set an `isClosing` flag, waited a
   hardcoded 300ms via setTimeout, then unmounted — so the React
   state and the CSS keyframe were two independent clocks that
   only agreed by coincidence, and the sheet could not be caught
   mid-close.
   ============================================================ */

export default function Modal({ open, onClose, title, originRef, className = '', children }) {
  const reduced = useReducedMotion();
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // Focus moves into the sheet on open, and returns to the control
  // that opened it on close, so keyboard users are never dropped.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  /* Anchor the sheet to the control that spawned it. Scaling from
     the viewport centre severs the relationship between the button
     pressed and the surface that appears; scaling from the trigger
     makes it obvious where the sheet came from — and therefore
     where it will go back to. */
  const transformOrigin = (() => {
    const el = originRef?.current;
    if (!el || reduced) return 'center center';
    const r = el.getBoundingClientRect();
    const x = ((r.left + r.width / 2) / window.innerWidth) * 100;
    const y = ((r.top + r.height / 2) / window.innerHeight) * 100;
    return `${x.toFixed(1)}% ${y.toFixed(1)}%`;
  })();

  const handleDragEnd = (_event, info) => {
    const velocity = info.velocity.y;
    const projectedY = info.offset.y + project(velocity);
    if (shouldCommit(projectedY, velocity, 140, 500)) onClose();
  };

  /* Blur and scale animate together on enter and exit so the scrim
     reads as a material arriving in front of the page, not as a
     grey rectangle fading up. */
  const scrimMotion = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15, ease: 'easeOut' },
      }
    : {
        initial: { opacity: 0, backdropFilter: 'blur(0px)' },
        animate: { opacity: 1, backdropFilter: 'blur(8px)' },
        exit: { opacity: 0, backdropFilter: 'blur(0px)' },
        transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
      };

  const sheetMotion = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15, ease: 'easeOut' },
      }
    : {
        initial: { opacity: 0, scale: 0.92 },
        animate: { opacity: 1, scale: 1 },
        // Exits along the path it entered: same origin, same scale,
        // mirrored easing.
        exit: { opacity: 0, scale: 0.92 },
        transition: spring.move,
      };

  return (
    <motion.div
      className="modal-overlay"
      onClick={onClose}
      {...scrimMotion}
    >
      <motion.div
        ref={panelRef}
        className={`modal-container ${className}`}
        style={{ transformOrigin }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        drag={reduced ? false : 'y'}
        dragDirectionLock
        /* Downward tracks the finger; upward rubber-bands instead of
           stopping dead at the boundary. */
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.04, bottom: 0.5 }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        {...sheetMotion}
      >
        <div className="modal-header">
          <div className="modal-grabber" aria-hidden="true" />
          <h3 className="modal-title">{title}</h3>
          <button
            ref={closeRef}
            className="modal-close-btn pressable"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
