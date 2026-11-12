/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vanellope Chibi 2D Cartoon Character Guide & Speech Bubble
 * Handcrafted vector SVG chibi with expressive features, candy accessories & mint hoodie
 */

import React from 'react';

interface VanellopeGuideProps {
  mood?: 'happy' | 'thinking' | 'hint' | 'celebrating';
  dialogue: string | React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showAvatarOnly?: boolean;
  className?: string;
}

export const VanellopeGuide: React.FC<VanellopeGuideProps> = ({
  mood = 'happy',
  dialogue,
  size = 'md',
  showAvatarOnly = false,
  className = '',
}) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-16 h-18';
      case 'lg':
        return 'w-36 h-40 sm:w-44 sm:h-48';
      case 'md':
      default:
        return 'w-24 h-28';
    }
  };

  const renderChibiIllustration = () => {
    return (
      <div className="relative shrink-0 flex items-center justify-center select-none group">
        <svg
          viewBox="0 0 200 220"
          className={`${getDimensions()} transition-transform duration-300 group-hover:scale-105 drop-shadow-sm`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Skin Tone Gradient */}
            <linearGradient id="chibiSkin" x1="100" y1="40" x2="100" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF2E8" />
              <stop offset="100%" stopColor="#FBDBC6" />
            </linearGradient>

            {/* Hair Base Gradient */}
            <linearGradient id="chibiHair" x1="100" y1="20" x2="100" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2A242B" />
              <stop offset="60%" stopColor="#1B171C" />
              <stop offset="100%" stopColor="#0F0C0F" />
            </linearGradient>

            {/* Eye Hazel Iris Gradient */}
            <radialGradient id="chibiIris" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#8A512A" />
              <stop offset="50%" stopColor="#5E351B" />
              <stop offset="90%" stopColor="#2F180A" />
              <stop offset="100%" stopColor="#180C04" />
            </radialGradient>

            {/* Mint Hoodie Gradient */}
            <linearGradient id="hoodieMint" x1="100" y1="130" x2="100" y2="210" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="60%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Licorice Ribbon Gradient */}
            <linearGradient id="licoriceRibbon" x1="130" y1="35" x2="170" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="40%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
          </defs>

          {/* 1. BACKGROUND GLOW IN CELEBRATING MOOD */}
          {mood === 'celebrating' && (
            <circle cx="100" cy="100" r="90" fill="#FDF2F8" opacity="0.7" />
          )}

          {/* 2. BACK HAIR / HEAD VOLUME */}
          <path
            d="M48 95 C40 60 62 25 102 24 C142 23 162 58 156 95 C156 125 142 145 102 148 C60 148 48 125 48 95 Z"
            fill="url(#chibiHair)"
          />

          {/* 3. HIGH PONYTAIL (Angled cheerfully to the right) */}
          <g>
            {/* Ponytail mass */}
            <path
              d="M138 52 C155 32 178 30 188 44 C198 58 194 80 180 94 C170 104 152 106 142 98 C148 88 152 75 146 64 C142 58 138 54 138 52 Z"
              fill="url(#chibiHair)"
            />
            {/* Ponytail Hair Strands */}
            <path
              d="M165 42 C178 52 182 72 176 86"
              stroke="#382E3A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M152 48 C165 58 170 75 166 84"
              stroke="#382E3A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Licorice Ribbon / Bow Wrap */}
            {/* Bow Left Wing */}
            <path
              d="M136 50 C128 42 124 52 132 58 Z"
              fill="url(#licoriceRibbon)"
            />
            {/* Bow Right Wing */}
            <path
              d="M145 42 C156 34 160 44 150 52 Z"
              fill="url(#licoriceRibbon)"
            />
            {/* Bow Knot */}
            <ellipse cx="140" cy="50" rx="5" ry="4" fill="#E11D48" />
            {/* Ribbon Tail 1 */}
            <path
              d="M141 53 C145 62 142 74 138 80"
              stroke="#F43F5E"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Ribbon Tail 2 */}
            <path
              d="M138 53 C134 64 135 72 133 78"
              stroke="#E11D48"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* 4. CHIBI EARS */}
          <ellipse cx="48" cy="102" rx="7.5" ry="10" fill="#FBDBC6" />
          <ellipse cx="49" cy="102" rx="4" ry="5.5" fill="#F4BAA1" />
          <ellipse cx="152" cy="102" rx="7.5" ry="10" fill="#FBDBC6" />
          <ellipse cx="151" cy="102" rx="4" ry="5.5" fill="#F4BAA1" />
          {/* Mint candy earring */}
          <circle cx="47" cy="109" r="2.2" fill="#34D399" />
          <circle cx="153" cy="109" r="2.2" fill="#EC4899" />

          {/* 5. CHIBI FACE BASE */}
          <path
            d="M52 92 C50 68 68 56 100 56 C132 56 150 68 148 92 C148 120 128 138 100 138 C72 138 52 120 52 92 Z"
            fill="url(#chibiSkin)"
          />

          {/* 6. SOFT ROSY BLUSH CHEEKS */}
          <ellipse cx="66" cy="108" rx="10" ry="5.5" fill="#FDA4AF" opacity="0.65" />
          <ellipse cx="134" cy="108" rx="10" ry="5.5" fill="#FDA4AF" opacity="0.65" />
          {/* Subtle blush freckles */}
          <circle cx="63" cy="107" r="1" fill="#FB7185" />
          <circle cx="68" cy="109" r="1" fill="#FB7185" />
          <circle cx="132" cy="109" r="1" fill="#FB7185" />
          <circle cx="137" cy="107" r="1" fill="#FB7185" />

          {/* 7. CHIBI HAIR FRONT / BANGS */}
          <g>
            {/* Forehead hair arches */}
            <path
              d="M50 78 C56 62 76 60 90 70 C100 58 124 58 136 68 C144 60 148 72 148 80 C146 64 135 48 100 48 C65 48 54 64 50 78 Z"
              fill="url(#chibiHair)"
            />
            {/* Center bangs sweep */}
            <path
              d="M74 65 C88 62 108 64 122 75 C114 84 100 86 92 78 C86 84 76 82 74 65 Z"
              fill="#1B171C"
            />
            {/* Left side hair strand */}
            <path
              d="M52 75 C48 92 52 108 57 114 C54 102 54 88 58 78 Z"
              fill="#1F1A20"
            />
            {/* Right side hair strand */}
            <path
              d="M148 75 C152 92 148 108 143 114 C146 102 146 88 142 78 Z"
              fill="#1F1A20"
            />
            {/* Glossy Hair Sheen across bangs */}
            <path
              d="M68 62 C82 56 116 56 132 62"
              stroke="#A78BFA"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.35"
            />
          </g>

          {/* 8. CANDY ACCESSORIES IN HAIR */}
          <g>
            {/* Peppermint Candy Swirl Pin (Top Left) */}
            <g transform="translate(62, 42)">
              <circle cx="6" cy="6" r="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
              <path d="M6 0 C8 3 8 9 6 12" stroke="#EF4444" strokeWidth="1.8" />
              <path d="M0 6 C3 8 9 8 12 6" stroke="#EF4444" strokeWidth="1.8" />
              <circle cx="6" cy="6" r="2" fill="#F87171" />
            </g>

            {/* Gummy Star (Top Right) */}
            <polygon
              points="126,38 128,43 133,43 129,46 131,51 126,48 121,51 123,46 119,43 124,43"
              fill="#FBBF24"
              stroke="#F59E0B"
              strokeWidth="0.6"
            />

            {/* Rainbow Candy Sprinkles */}
            <rect x="78" y="36" width="6.5" height="3" rx="1.5" transform="rotate(22 78 36)" fill="#38BDF8" />
            <rect x="94" y="32" width="7" height="3" rx="1.5" transform="rotate(-15 94 32)" fill="#F43F5E" />
            <rect x="110" y="36" width="6" height="3" rx="1.5" transform="rotate(45 110 36)" fill="#34D399" />
            <circle cx="86" cy="48" r="2.5" fill="#A855F7" />
            <circle cx="106" cy="46" r="2.2" fill="#FB923C" />
            <rect x="160" y="68" width="5.5" height="2.8" rx="1.4" transform="rotate(-30 160 68)" fill="#F472B6" />
            <circle cx="174" cy="62" r="2.5" fill="#FBBF24" />
          </g>

          {/* 9. CHIBI EYEBROWS */}
          {mood === 'thinking' ? (
            <g>
              {/* Left arched high */}
              <path d="M66 78 Q76 71 85 76" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" />
              {/* Right angled in thought */}
              <path d="M115 80 Q124 77 134 81" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {/* Cheerful arched brows */}
              <path d="M66 78 Q76 73 86 77" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M114 77 Q124 73 134 78" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* 10. LARGE CHIBI ANIME EYES */}
          <g>
            {/* Left Eye */}
            <g>
              {/* Eye White Base */}
              <ellipse cx="76" cy="95" rx="11" ry="13.5" fill="#FFFFFF" />
              {/* Iris Hazel */}
              <ellipse cx="77" cy="95" rx="9" ry="12" fill="url(#chibiIris)" />
              {/* Pupil Deep */}
              <ellipse cx="77" cy="95" rx="5.5" ry="7.5" fill="#0C0502" />
              {/* Warm Amber Reflection Crescent */}
              <path
                d="M71 100 C73 104 81 104 83 100"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Primary Star Sparkle Highlight */}
              <circle cx="73.5" cy="90" r="3.5" fill="#FFFFFF" />
              {/* Secondary Sparkle */}
              <circle cx="81" cy="99" r="1.8" fill="#FFFFFF" />
              {/* Upper Eyelash Line */}
              <path
                d="M64 92 C68 83 83 83 88 92"
                stroke="#1B171C"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Double Winged Eyelash Tip */}
              <path d="M86 87 L90 84" stroke="#1B171C" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Right Eye */}
            <g>
              {/* Eye White Base */}
              <ellipse cx="124" cy="95" rx="11" ry="13.5" fill="#FFFFFF" />
              {/* Iris Hazel */}
              <ellipse cx="123" cy="95" rx="9" ry="12" fill="url(#chibiIris)" />
              {/* Pupil Deep */}
              <ellipse cx="123" cy="95" rx="5.5" ry="7.5" fill="#0C0502" />
              {/* Warm Amber Reflection Crescent */}
              <path
                d="M117 100 C119 104 127 104 129 100"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Primary Star Sparkle Highlight */}
              <circle cx="119.5" cy="90" r="3.5" fill="#FFFFFF" />
              {/* Secondary Sparkle */}
              <circle cx="127" cy="99" r="1.8" fill="#FFFFFF" />
              {/* Upper Eyelash Line */}
              <path
                d="M112 92 C117 83 132 83 136 92"
                stroke="#1B171C"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Double Winged Eyelash Tip */}
              <path d="M134 87 L138 84" stroke="#1B171C" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          {/* 11. CUTE BUTTON NOSE */}
          <path d="M98 103 Q100 105 102 103" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* 12. EXPRESSIVE CHIBI MOUTH */}
          {mood === 'happy' || mood === 'celebrating' ? (
            <g>
              {/* Open Cheerful Smile with Tongue & Teeth */}
              <path
                d="M91 112 Q100 126 109 112 Z"
                fill="#BE123C"
                stroke="#881337"
                strokeWidth="1.6"
              />
              {/* White Upper Tooth Bar */}
              <path d="M93 113 Q100 116 107 113" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              {/* Rosy Tongue */}
              <ellipse cx="100" cy="119" rx="5" ry="3" fill="#FB7185" />
            </g>
          ) : mood === 'thinking' ? (
            <path
              d="M94 116 Q100 113 106 117"
              stroke="#881337"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            /* hint / gentle smile */
            <path
              d="M93 113 Q100 120 107 113"
              stroke="#881337"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* 13. VANELLOPE'S SIGNATURE MINT GREEN HOODIE */}
          <g>
            {/* Hoodie Body Base */}
            <path
              d="M62 142 C54 135 68 132 100 132 C132 132 146 135 138 142 L150 196 C150 205 50 205 50 196 Z"
              fill="url(#hoodieMint)"
            />

            {/* Cozy Outer Hood Collar contouring neck */}
            <path
              d="M66 136 C76 152 124 152 134 136 C124 156 76 156 66 136 Z"
              fill="#047857"
            />

            {/* Neck inner opening */}
            <path
              d="M82 135 C88 144 112 144 118 135 Z"
              fill="#FBDBC6"
            />

            {/* Pink Ribbon Drawstrings with Candy Aglets */}
            <path d="M91 144 L89 178" stroke="#F43F5E" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="89" cy="179" r="2.5" fill="#E11D48" />
            <path d="M109 144 L111 180" stroke="#F43F5E" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="111" cy="181" r="2.5" fill="#E11D48" />

            {/* Kangaroo Front Pocket */}
            <path
              d="M78 172 L122 172 L116 195 L84 195 Z"
              fill="#059669"
              opacity="0.85"
            />
            {/* Pocket Stitch Line */}
            <path
              d="M82 172 L86 193"
              stroke="#34D399"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
            <path
              d="M118 172 L114 193"
              stroke="#34D399"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />

            {/* Sleeves / Arms */}
            <path
              d="M62 142 L48 180 C46 186 54 190 60 184 L72 165 Z"
              fill="#10B981"
            />
            <path
              d="M138 142 L152 180 C154 186 146 190 140 184 L128 165 Z"
              fill="#10B981"
            />

            {/* Cuffs */}
            <ellipse cx="52" cy="182" rx="5" ry="3" fill="#047857" />
            <ellipse cx="148" cy="182" rx="5" ry="3" fill="#047857" />

            {/* Cute Chibi Hands */}
            <circle cx="51" cy="186" r="4.2" fill="#FBDBC6" />
            <circle cx="149" cy="186" r="4.2" fill="#FBDBC6" />
          </g>

          {/* 14. CANDY EMBELLISHMENTS & BADGES */}
          {mood === 'celebrating' && (
            <g>
              <text x="24" y="52" fontSize="20" className="animate-bounce">✨</text>
              <text x="160" y="36" fontSize="20" className="animate-bounce">⭐</text>
              <text x="165" y="145" fontSize="18" className="animate-pulse">🍭</text>
              <text x="20" y="140" fontSize="18" className="animate-pulse">🍬</text>
            </g>
          )}

          {mood === 'hint' && (
            <g transform="translate(155, 30)">
              <circle cx="12" cy="12" r="14" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
              <text x="5" y="18" fontSize="14">💡</text>
            </g>
          )}

          {mood === 'thinking' && (
            <g transform="translate(155, 30)">
              <circle cx="12" cy="12" r="12" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
              <text x="6" y="17" fontSize="13">❓</text>
            </g>
          )}
        </svg>
      </div>
    );
  };

  if (showAvatarOnly) {
    return renderChibiIllustration();
  }

  return (
    <div className={`flex items-start gap-3.5 ${className}`}>
      {renderChibiIllustration()}
      <div className="relative bg-white border-2 border-emerald-100 rounded-3xl p-4 shadow-sm max-w-xl text-slate-800">
        {/* Speech Bubble Arrow pointing to character */}
        <div className="absolute top-5 -left-2.5 w-3.5 h-3.5 bg-white border-l-2 border-t-2 border-emerald-100 rotate-[-45deg]" />
        
        {/* Name Tag */}
        <div className="text-xs font-black text-emerald-600 mb-1 tracking-wider flex items-center gap-1.5 font-candy">
          <span>VANELLOPE VON SCHWEETZ</span>
          <span className="text-[10px] text-pink-600 font-bold px-2 py-0.5 bg-pink-50 rounded-full border border-pink-100">
            Guide Sirkuit
          </span>
        </div>

        {/* Dialogue Text */}
        <div className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-700">
          {dialogue}
        </div>
      </div>
    </div>
  );
};
