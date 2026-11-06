import React from 'react';

/**
 * Reusable SectionIndex component for cinematic section markers
 * @param {string} number - e.g. "01", "02"
 * @param {string} title - e.g. "ABOUT", "FEATURED WORK"
 * @param {string} subtitle - Optional short label or description
 * @param {string} align - 'left' | 'right'
 */
const SectionIndex = ({
  number = '01',
  title = '',
  subtitle = '',
  align = 'left',
  className = '',
}) => {
  const isRight = align === 'right';

  return (
    <div
      className={`relative w-full flex flex-col ${
        isRight ? 'items-end text-right' : 'items-start text-left'
      } select-none pointer-events-none mb-12 md:mb-20 ${className}`}
      data-lenis-prevent="false"
    >
      <div className="flex items-center gap-4 text-xs md:text-sm font-mono tracking-widest text-[#a1a1aa] uppercase mb-2">
        <span className="text-[#52525b]">//</span>
        <span>{subtitle || title}</span>
        <div className="h-[1px] w-8 md:w-16 bg-white/10" />
      </div>

      <div className="relative flex items-baseline gap-3">
        {/* Massive atmospheric outline index */}
        <span
          className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-none text-transparent"
          style={{
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.12)',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.03)',
          }}
        >
          {number}
        </span>

        {title && (
          <span className="font-display font-semibold text-lg sm:text-2xl md:text-3xl text-zinc-100 uppercase tracking-tight ml-2">
            {title}
          </span>
        )}
      </div>
    </div>
  );
};

export default SectionIndex;

