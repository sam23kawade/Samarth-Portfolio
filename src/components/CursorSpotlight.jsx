import React, { useEffect } from 'react'

export default function CursorSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    function move(e) {
      const x = e.clientX;
      const y = e.clientY;
      root.style.setProperty('--spot-x', x + 'px');
      root.style.setProperty('--spot-y', y + 'px');
    }
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={{ mixBlendMode: 'overlay' }}>
      {/* The spotlight is implemented via CSS using --spot-x and --spot-y variables */}
      <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }} />
    </div>
  )
}
