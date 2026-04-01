import { useState, type ReactNode, type CSSProperties } from 'react';

export interface GlassCardRay {
  angle: number;
  color: string;
  height: number;
}

export interface GlassCardProps {
  title: string;
  subtitle?: string;
  description: string;
  icon?: ReactNode;
  glowColor?: string;
  rays?: GlassCardRay[];
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({
  title,
  subtitle,
  description,
  icon,
  glowColor,
  rays,
  children,
  className = '',
  onClick,
}: GlassCardProps) {
  const [awakened, setAwakened] = useState(false);

  const cardClass = [
    'prisma-glass-card',
    awakened ? 'prisma-glass-card--awakened' : '',
    className,
  ].filter(Boolean).join(' ');

  const style: CSSProperties = {
    '--card-glow-color': glowColor ?? 'transparent',
  } as CSSProperties;

  return (
    <div
      className={cardClass}
      onMouseEnter={() => setAwakened(true)}
      onClick={onClick}
      style={style}
    >
      {/* Refraction rays */}
      {rays?.map((ray, i) => (
        <div
          key={i}
          className="prisma-glass-card__ray"
          style={{
            left: `${15 + i * 22}%`,
            transform: `rotate(${ray.angle}deg)`,
            background: `linear-gradient(180deg, ${ray.color}, transparent)`,
            height: `${ray.height}px`,
          }}
        />
      ))}

      <div className="prisma-glass-card__header">
        {icon && <span className="prisma-glass-card__icon">{icon}</span>}
        <div>
          {subtitle && <p className="prisma-glass-card__subtitle">{subtitle}</p>}
          <h3 className="prisma-glass-card__title">{title}</h3>
        </div>
      </div>
      <p className="prisma-glass-card__description">{description}</p>
      {children && <div className="prisma-glass-card__actions">{children}</div>}
    </div>
  );
}
