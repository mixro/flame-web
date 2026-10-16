import { logos } from './Logo';

const place = {
  hoodie: ['35.83%', '56.57%', '28.33%'],
  tee: ['30%', '35.71%', '40%'],
  beanie: ['40.83%', '65.71%', '18.33%'],
  tote: ['30.83%', '57.14%', '38.33%'],
};
const label = { hoodie: 'Black hoodie', tee: 'Black t-shirt', beanie: 'Black beanie', tote: 'Black tote bag' };
const S = '#2c2c2c';

function Hoodie() {
  return (
    <>
      <ellipse cx="300" cy="676" rx="250" ry="14" fill="#000" opacity=".35" />
      <path d="M178 160 L98 205 L52 570 L122 588 L175 340 Z" fill="#101010" stroke={S} strokeWidth="2" />
      <path d="M422 160 L502 205 L548 570 L478 588 L425 340 Z" fill="#101010" stroke={S} strokeWidth="2" />
      <path d="M52 570 L122 588 L118 620 L46 602 Z" fill="#0c0c0c" stroke={S} strokeWidth="2" />
      <path d="M548 570 L478 588 L482 620 L554 602 Z" fill="#0c0c0c" stroke={S} strokeWidth="2" />
      <path d="M122 245 L92 520" stroke="#1d1d1d" strokeWidth="3" fill="none" />
      <path d="M478 245 L508 520" stroke="#1d1d1d" strokeWidth="3" fill="none" />
      <path d="M205 165 C 190 30, 410 30, 395 165 Z" fill="#0f0f0f" stroke={S} strokeWidth="2" />
      <path d="M175 150 L425 150 Q 445 400 442 640 L158 640 Q155 400 175 150 Z" fill="#141414" stroke={S} strokeWidth="2" />
      <path d="M190 175 L216 175 L206 610 L176 610 Z" fill="#1a1a1a" opacity=".7" />
      <rect x="158" y="610" width="284" height="34" rx="4" fill="#0e0e0e" stroke={S} strokeWidth="2" />
      <path d="M178 612 V642 M198 612 V642 M218 612 V642 M238 612 V642 M258 612 V642 M278 612 V642 M298 612 V642 M318 612 V642 M338 612 V642 M358 612 V642 M378 612 V642 M398 612 V642 M418 612 V642" stroke="#1b1b1b" strokeWidth="2" fill="none" />
      <path d="M232 160 C 236 98, 364 98, 368 160 C 352 192, 248 192, 232 160 Z" fill="#060606" stroke={S} strokeWidth="3" />
      <path d="M270 188 L268 336" stroke="#2f2f2f" strokeWidth="5" fill="none" />
      <path d="M330 188 L332 350" stroke="#2f2f2f" strokeWidth="5" fill="none" />
      <rect x="263" y="336" width="10" height="24" rx="2" fill="#1a1a1a" stroke={S} />
      <rect x="327" y="350" width="10" height="24" rx="2" fill="#1a1a1a" stroke={S} />
      <path d="M200 470 L400 470 L422 600 L178 600 Z" fill="#111" stroke={S} strokeWidth="2" />
      <path d="M206 482 L190 548" stroke="#222" strokeWidth="3" fill="none" />
      <path d="M394 482 L410 548" stroke="#222" strokeWidth="3" fill="none" />
    </>
  );
}

function Tee() {
  return (
    <>
      <ellipse cx="300" cy="676" rx="240" ry="14" fill="#000" opacity=".35" />
      <path d="M240 110 Q300 150 360 110 L450 140 L560 260 L500 320 L440 270 L440 640 L160 640 L160 270 L100 320 L40 260 L150 140 Z" fill="#141414" stroke={S} strokeWidth="2" />
      <path d="M175 160 L215 150 L200 620 L170 620 Z" fill="#1a1a1a" opacity=".7" />
      <path d="M240 110 Q300 128 360 110 Q300 160 240 110 Z" fill="#060606" />
      <path d="M236 112 Q300 176 364 112" stroke="#0b0b0b" strokeWidth="12" fill="none" />
      <path d="M236 112 Q300 176 364 112" stroke={S} strokeWidth="2" fill="none" />
      <path d="M46 268 L104 322" stroke="#1f1f1f" strokeWidth="3" fill="none" />
      <path d="M554 268 L496 322" stroke="#1f1f1f" strokeWidth="3" fill="none" />
      <path d="M160 616 L440 616" stroke="#1f1f1f" strokeWidth="3" fill="none" />
      <path d="M270 330 L262 560" stroke="#171717" strokeWidth="3" fill="none" />
      <path d="M340 340 L350 540" stroke="#171717" strokeWidth="3" fill="none" />
    </>
  );
}

function Beanie({ logo }) {
  return (
    <g transform="translate(100 140)">
      <ellipse cx="200" cy="402" rx="165" ry="10" fill="#000" opacity=".35" />
      <path d="M50 290 C 40 40, 360 40, 350 290 Z" fill="#141414" stroke={S} strokeWidth="2" />
      <path d="M82 250 C 90 120, 140 70, 172 62 L 150 250 Z" fill="#1a1a1a" opacity=".6" />
      <path d="M110 290 C 100 160 130 80 160 55 M160 290 C 158 160 175 80 190 48 M210 290 L210 45 M260 290 C 262 160 245 80 230 48 M310 290 C 320 160 290 80 255 55" stroke="#1c1c1c" strokeWidth="2" fill="none" />
      <rect x="40" y="280" width="320" height="100" rx="12" fill="#0e0e0e" stroke={S} strokeWidth="2" />
      <path d="M62 284 V376 M82 284 V376 M102 284 V376 M122 284 V376 M142 284 V376 M162 284 V376 M182 284 V376 M202 284 V376 M222 284 V376 M242 284 V376 M262 284 V376 M282 284 V376 M302 284 V376 M322 284 V376 M342 284 V376" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      <rect x="130" y="303" width="140" height="54" rx="3" fill={logo === 'white' ? '#050505' : '#1c1c1c'} stroke={S} />
    </g>
  );
}

function Tote() {
  return (
    <g transform="translate(50 30)">
      <ellipse cx="250" cy="620" rx="210" ry="12" fill="#000" opacity=".35" />
      <path d="M150 190 C 140 20, 360 20, 350 190" stroke={S} strokeWidth="28" fill="none" />
      <path d="M150 190 C 140 20, 360 20, 350 190" stroke="#161616" strokeWidth="24" fill="none" />
      <path d="M70 180 L430 180 L445 590 L55 590 Z" fill="#141414" stroke={S} strokeWidth="2" />
      <path d="M82 200 L118 200 L108 580 L72 580 Z" fill="#1a1a1a" opacity=".6" />
      <path d="M72 206 L428 206" stroke="#1f1f1f" strokeWidth="2" strokeDasharray="6 6" fill="none" />
      <path d="M57 560 L443 560" stroke="#1b1b1b" strokeWidth="3" fill="none" />
      <rect x="136" y="170" width="28" height="60" rx="3" fill="#0c0c0c" stroke={S} />
      <rect x="336" y="170" width="28" height="60" rx="3" fill="#0c0c0c" stroke={S} />
    </g>
  );
}

/** Vector garment illustration with the approved logo placed on it. */
export default function ProductArt({ kind = 'hoodie', logo = 'black' }) {
  const [left, top, width] = place[kind] || place.hoodie;
  return (
    <div className="art">
      <svg viewBox="0 0 600 700" role="img" aria-label={label[kind]} className="art__svg">
        {kind === 'hoodie' && <Hoodie />}
        {kind === 'tee' && <Tee />}
        {kind === 'beanie' && <Beanie logo={logo} />}
        {kind === 'tote' && <Tote />}
      </svg>
      <img
        src={logos[logo === 'white' ? 'white' : 'black']}
        alt=""
        className="art__logo"
        style={{ left, top, width }}
        decoding="async"
        loading="lazy"
      />
    </div>
  );
}
