import colorLogo from '../assets/logos/flame-logo-color.svg';
import whiteLogo from '../assets/logos/flame-logo-white.svg';
import blackLogo from '../assets/logos/flame-logo-black.svg';

export const logos = { color: colorLogo, white: whiteLogo, black: blackLogo };

export default function Logo({ variant = 'white', width = 140, className = '', style }) {
  return (
    <img
      src={logos[variant]}
      alt="FLAME"
      width={width}
      height={Math.round((width * 203) / 1094)}
      className={className}
      style={{ display: 'block', height: 'auto', ...style }}
      decoding="async"
    />
  );
}
