/* ============================================================
   MOTION TOKENS
   ------------------------------------------------------------
   Apple describes springs with two designer-facing parameters
   instead of mass/stiffness/damping:

     damping ratio — overshoot.  1.0 = critically damped (no bounce)
     response      — how fast the value reaches target, in seconds

   Motion's `bounce` + `duration` spring API maps onto those
   directly:  bounce ≈ 1 - damping,  duration ≈ response.

   Shipping values from Designing Fluid Interfaces:
     move / reposition   damping 1.0   response 0.4
     rotation            damping 0.8   response 0.4
     drawer / sheet      damping 0.8   response 0.3

   House rule: critically damped everywhere by default. Bounce is
   reserved for motion the user's own gesture put momentum into.
   ============================================================ */

export const spring = {
  /** Default for anything not carrying gesture momentum. No overshoot. */
  move: { type: 'spring', bounce: 0, duration: 0.4 },

  /** Drawers and sheets — the gesture threw them, so they may overshoot. */
  sheet: { type: 'spring', bounce: 0.2, duration: 0.3 },

  /** Snappy, for small elements that should feel immediate. */
  snap: { type: 'spring', bounce: 0, duration: 0.25 },

  /** Momentum landing after a flick. */
  momentum: { type: 'spring', bounce: 0.2, duration: 0.4 },
};

/** Non-vestibular equivalents used when prefers-reduced-motion is set. */
export const reducedSpring = {
  move: { duration: 0.2, ease: 'easeOut' },
  sheet: { duration: 0.2, ease: 'easeOut' },
  snap: { duration: 0.15, ease: 'easeOut' },
  momentum: { duration: 0.2, ease: 'easeOut' },
};

/**
 * Pick the right transition for the user's motion preference.
 * @param {boolean} reduced - result of framer-motion's useReducedMotion()
 * @param {keyof typeof spring} name
 */
export const transition = (reduced, name = 'move') =>
  reduced ? reducedSpring[name] : spring[name];

/* ------------------------------------------------------------
   Momentum projection — Apple's exponential-decay form.

   Answers "where would this come to rest if I let go now?" so a
   flick lands on the target nearest its *projected* endpoint
   rather than snapping back from the release point.

   Note this is not the textbook v²/(2·decel); it is the scroll
   deceleration curve Apple actually ships.
   ------------------------------------------------------------ */

/**
 * @param {number} initialVelocity - px/s at release
 * @param {number} decelerationRate - 0.998 normal scroll feel, 0.99 snappier
 * @returns {number} signed distance the element would still travel
 */
export function project(initialVelocity, decelerationRate = 0.998) {
  return (initialVelocity / 1000) * decelerationRate / (1 - decelerationRate);
}

/* ------------------------------------------------------------
   Rubber-banding — progressive resistance past a boundary.
   A hard stop reads as "frozen"; increasing resistance reads as
   "responsive, but there is nothing more here".
   ------------------------------------------------------------ */

/**
 * @param {number} overshoot - how far past the bound, in px
 * @param {number} dimension - size of the dragged surface, in px
 * @param {number} constant  - 0.55 matches UIScrollView
 */
export function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

/**
 * Whether a drag release should commit rather than snap back.
 * Velocity sign wins over position: a fast flick commits even from
 * a short distance, which is how the physical world behaves.
 *
 * @param {number} offset   - px travelled from origin
 * @param {number} velocity - px/s at release
 * @param {number} distanceThreshold
 * @param {number} velocityThreshold
 */
export function shouldCommit(offset, velocity, distanceThreshold = 100, velocityThreshold = 400) {
  if (Math.abs(velocity) > velocityThreshold) return velocity > 0;
  return offset > distanceThreshold;
}
