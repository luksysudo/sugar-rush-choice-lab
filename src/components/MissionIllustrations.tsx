/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Custom Sugar Rush Pastel Vector SVG Illustrations for Mission 1 - 4 Cards
 */

import React from 'react';

/**
 * POS 1: Kedai Camilan Sirkuit
 * Etalase toko permen pastel berisi cupcake stroberi, es krim cone swirl, dan puding karamel berkilau.
 */
export const Mission1Illustration: React.FC = () => (
  <svg viewBox="0 0 220 110" className="w-full h-24 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pastel Shop Backdrop */}
    <rect x="14" y="22" width="192" height="80" rx="14" fill="#FFF1F2" stroke="#FBCFE8" strokeWidth="2" />
    {/* Striped Awning */}
    <path d="M10 24C10 14 18 8 28 8H192C202 8 210 14 210 24H10Z" fill="#EC4899" />
    <path d="M34 8H58V24H34V8Z" fill="#FFFDF9" />
    <path d="M82 8H106V24H82V8Z" fill="#FFFDF9" />
    <path d="M130 8H154V24H130V8Z" fill="#FFFDF9" />
    <path d="M178 8H202C206 11 210 17 210 24H178V8Z" fill="#FFFDF9" />
    {/* Awning scallops */}
    {[22, 46, 70, 94, 118, 142, 166, 190].map((cx, idx) => (
      <circle key={idx} cx={cx} cy="24" r="12" fill={idx % 2 === 0 ? '#EC4899' : '#FFFDF9'} />
    ))}

    {/* Showcase Glass Shelf */}
    <rect x="24" y="84" width="172" height="10" rx="5" fill="#A7F3D0" stroke="#34D399" strokeWidth="1.5" />

    {/* 1. Strawberry Cupcake (Left) */}
    <g transform="translate(36, 36)">
      <path d="M8 28L12 48H32L36 28H8Z" fill="#FDBA74" stroke="#EA580C" strokeWidth="1.5" />
      <line x1="15" y1="29" x2="17" y2="47" stroke="#FB923C" strokeWidth="1.5" />
      <line x1="22" y1="29" x2="22" y2="47" stroke="#FB923C" strokeWidth="1.5" />
      <line x1="29" y1="29" x2="27" y2="47" stroke="#FB923C" strokeWidth="1.5" />
      {/* Frosting swirl */}
      <path d="M6 28C4 22 12 16 22 16C32 16 40 22 38 28C34 31 10 31 6 28Z" fill="#F472B6" />
      <path d="M11 20C11 14 17 10 22 10C27 10 33 14 33 20C28 22 16 22 11 20Z" fill="#F9A8D4" />
      {/* Cherry on top */}
      <circle cx="22" cy="8" r="4.5" fill="#E11D48" />
      <circle cx="20.5" cy="6.5" r="1.3" fill="#FFF" opacity="0.8" />
      <path d="M22 4C23 1 26 0 28 1" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* 2. Swirl Ice Cream Cone (Center) */}
    <g transform="translate(90, 30)">
      <path d="M11 29L20 55L29 29H11Z" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="14" y1="36" x2="26" y2="36" stroke="#F59E0B" strokeWidth="1" />
      <line x1="16" y1="43" x2="24" y2="43" stroke="#F59E0B" strokeWidth="1" />
      {/* Swirl soft serve */}
      <ellipse cx="20" cy="26" rx="12" ry="6" fill="#34D399" />
      <ellipse cx="20" cy="19" rx="9" ry="5" fill="#6EE7B7" />
      <path d="M14 15C15 9 20 5 22 4C23 7 25 11 26 15H14Z" fill="#A7F3D0" />
      {/* Candy sprinkles */}
      <circle cx="15" cy="25" r="1.3" fill="#EC4899" />
      <circle cx="24" cy="20" r="1.3" fill="#FBBF24" />
      <circle cx="20" cy="12" r="1.2" fill="#EC4899" />
    </g>

    {/* 3. Sparkling Caramel Pudding (Right) */}
    <g transform="translate(142, 42)">
      {/* Plate */}
      <ellipse cx="22" cy="40" rx="20" ry="4" fill="#E2E8F0" />
      {/* Pudding body */}
      <path d="M8 38L12 18C13 14 31 14 32 18L36 38H8Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
      {/* Caramel glaze */}
      <path d="M12 18C13 13 31 13 32 18C32 22 29 24 27 21C25 19 23 24 20 22C17 20 15 24 12 21Z" fill="#B45309" />
      {/* Sparkles */}
      <path d="M36 8L37.5 11.5L41 13L37.5 14.5L36 18L34.5 14.5L31 13L34.5 11.5L36 8Z" fill="#FBBF24" />
      <circle cx="8" cy="12" r="1.8" fill="#EC4899" />
    </g>
  </svg>
);

/**
 * POS 2: Garasi Kostum Pembalap
 * Jaket balap pastel, helm balap bergaya permen (candy racer helmet), dan sepatu boots balap dengan latar gantungan baju garasi.
 */
export const Mission2Illustration: React.FC = () => (
  <svg viewBox="0 0 220 110" className="w-full h-24 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Garage Studio Backdrop */}
    <rect x="14" y="10" width="192" height="92" rx="14" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="2" />
    {/* Clothing Rack Bar */}
    <line x1="28" y1="24" x2="192" y2="24" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="36" y1="24" x2="36" y2="96" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="184" y1="24" x2="184" y2="96" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

    {/* 1. Pastel Mint Racing Jacket on Hanger (Left) */}
    <g transform="translate(46, 24)">
      {/* Hanger */}
      <path d="M22 0C22 -4 26 -4 26 0" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 3L8 14H40L24 3Z" stroke="#64748B" strokeWidth="2" fill="none" />
      {/* Jacket */}
      <path d="M10 14L4 42L12 44L15 26V58H33V26L36 44L44 42L38 14H10Z" fill="#34D399" stroke="#059669" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Racing stripe & zipper */}
      <line x1="24" y1="14" x2="24" y2="58" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="16" y="25" width="5" height="3" rx="1" fill="#EC4899" />
      <rect x="27" y="25" width="5" height="3" rx="1" fill="#FBBF24" />
    </g>

    {/* 2. Candy Racer Helmet (Center) */}
    <g transform="translate(102, 34)">
      {/* Shelf */}
      <rect x="-4" y="48" width="54" height="5" rx="2.5" fill="#CBD5E1" />
      {/* Helmet shell */}
      <path d="M6 34C6 16 16 6 28 6C40 6 48 16 48 30C48 39 42 45 34 45H12C8 45 6 40 6 34Z" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" />
      {/* Candy swirl stripe */}
      <path d="M22 7C26 14 27 25 25 45" stroke="#FFFDF9" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 7C32 14 33 25 31 45" stroke="#A7F3D0" strokeWidth="2.5" strokeLinecap="round" />
      {/* Glossy Visor */}
      <path d="M26 20H45C46 25 46 31 43 34H24C22 30 22 23 26 20Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M28 23L34 23" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </g>

    {/* 3. Racing Boots (Right) */}
    <g transform="translate(152, 52)">
      {/* Boot */}
      <path d="M6 6H19V25L27 29C29 30 29 36 25 36H4V6H6Z" fill="#F43F5E" stroke="#BE185D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Boot Sole */}
      <rect x="3" y="34" width="26" height="4" rx="2" fill="#FFFDF9" stroke="#9F1239" strokeWidth="1" />
      {/* Boot laces/stripes */}
      <line x1="9" y1="12" x2="16" y2="12" stroke="#FFFDF9" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="18" x2="16" y2="18" stroke="#FFFDF9" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

/**
 * POS 3: Peta Jalur Sirkuit
 * Ilustrasi peta lintasan balap bercabang (diagram pohon visual) dengan garis jalur warna-warni dari gerbang Start menuju bendera Finish.
 */
export const Mission3Illustration: React.FC = () => (
  <svg viewBox="0 0 220 110" className="w-full h-24 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Map Card Base */}
    <rect x="14" y="10" width="192" height="92" rx="14" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />

    {/* Colorful Tree Branch Paths */}
    {/* Start -> Top Branch */}
    <path d="M44 55C65 55 68 32 95 32" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
    {/* Start -> Bottom Branch */}
    <path d="M44 55C65 55 68 78 95 78" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />

    {/* Top Branch -> 3 Finish Sub-paths */}
    <path d="M106 32C125 32 135 20 162 22" stroke="#F472B6" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />
    <path d="M106 32H162" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M106 32C125 32 135 44 162 44" stroke="#EC4899" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />

    {/* Bottom Branch -> 3 Finish Sub-paths */}
    <path d="M106 78C125 78 135 66 162 66" stroke="#34D399" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />
    <path d="M106 78H162" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M106 78C125 78 135 90 162 88" stroke="#10B981" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />

    {/* Start Gate */}
    <g transform="translate(22, 39)">
      <rect x="0" y="4" width="24" height="24" rx="7" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="12" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
        START
      </text>
    </g>

    {/* Branch Mid Nodes */}
    <circle cx="100" cy="32" r="8" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="2" />
    <circle cx="100" cy="78" r="8" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />

    {/* Sub-branch nodes */}
    {[22, 32, 44, 66, 78, 88].map((cy, idx) => (
      <circle
        key={idx}
        cx="162"
        cy={cy}
        r="4"
        fill={idx < 3 ? '#F472B6' : '#34D399'}
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
    ))}

    {/* Checkered Finish Flag (Right) */}
    <g transform="translate(172, 35)">
      <line x1="6" y1="4" x2="6" y2="42" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="6" y="4" width="22" height="16" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
      <rect x="6" y="4" width="5.5" height="5.3" fill="#1E293B" />
      <rect x="17" y="4" width="5.5" height="5.3" fill="#1E293B" />
      <rect x="11.5" y="9.3" width="5.5" height="5.3" fill="#1E293B" />
      <rect x="22.5" y="9.3" width="5.5" height="5.3" fill="#1E293B" />
      <rect x="6" y="14.6" width="5.5" height="5.3" fill="#1E293B" />
      <rect x="17" y="14.6" width="5.5" height="5.3" fill="#1E293B" />
    </g>
  </svg>
);

/**
 * POS 4: Pusat Katering FoodGo
 * Ilustrasi skuter/mobil pengantar makanan bertema permen (FoodGo Delivery) lengkap dengan paket bento kotak makan siang, minuman segar, dan camilan.
 */
export const Mission4Illustration: React.FC = () => (
  <svg viewBox="0 0 220 110" className="w-full h-24 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Purple Pastel Catering Backdrop */}
    <rect x="14" y="10" width="192" height="92" rx="14" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="2" />
    {/* Road Stripe */}
    <line x1="22" y1="90" x2="198" y2="90" stroke="#DDD6FE" strokeWidth="3" strokeLinecap="round" />

    {/* Candy FoodGo Delivery Van/Scooter (Left-Center) */}
    <g transform="translate(26, 30)">
      {/* Cargo Box with Pastel Mint & Pink */}
      <rect x="4" y="10" width="56" height="36" rx="8" fill="#A855F7" stroke="#7E22CE" strokeWidth="1.5" />
      <rect x="4" y="10" width="56" height="10" rx="4" fill="#EC4899" />
      <text x="32" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
        FoodGo
      </text>
      {/* Cab / Scooter front */}
      <path d="M60 22H76C83 22 88 28 88 36V46H60V22Z" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
      {/* Windshield */}
      <path d="M64 25H75C79 25 82 28 83 32H64V25Z" fill="#E0F2FE" />
      {/* Candy Wheels */}
      <circle cx="22" cy="50" r="8" fill="#1E293B" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="22" cy="50" r="3" fill="#F472B6" />
      <circle cx="72" cy="50" r="8" fill="#1E293B" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="72" cy="50" r="3" fill="#34D399" />
    </g>

    {/* Bento Box + Drink + Dessert (Right Showcase) */}
    <g transform="translate(128, 30)">
      {/* Bento Lunchbox */}
      <rect x="0" y="24" width="44" height="30" rx="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      <rect x="4" y="28" width="16" height="22" rx="3" fill="#FFFDF9" />
      <circle cx="12" cy="39" r="5" fill="#F43F5E" />
      <rect x="23" y="28" width="17" height="10" rx="2" fill="#A7F3D0" />
      <rect x="23" y="40" width="17" height="10" rx="2" fill="#FBCFE8" />

      {/* Fresh Drink Cup with Straw */}
      <path d="M52 20H68L65 54H55L52 20Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      <ellipse cx="60" cy="20" rx="9" ry="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />
      <path d="M60 19L65 6L71 5" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Macaron / Dessert */}
      <ellipse cx="22" cy="14" rx="12" ry="4" fill="#F472B6" />
      <rect x="11" y="14" width="22" height="4" rx="2" fill="#FFFDF9" />
      <ellipse cx="22" cy="19" rx="12" ry="3.5" fill="#F472B6" />
    </g>
  </svg>
);
