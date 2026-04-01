import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/molecules/GlassCard/GlassCard';
import { Dialog } from '@/components/atoms/Dialog/Dialog';

// Feature data — adapt from your existing features model
interface Feature {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  specs: { label: string; detail: string }[];
  rays: { angle: number; color: string; height: number }[];
}

const FEATURES: Feature[] = [
  {
    title: 'Schema Engine',
    subtitle: 'Define',
    description: 'Dynamic schema definitions that adapt to your data model in real time.',
    color: 'var(--prisma-spectral-cyan)',
    specs: [
      { label: 'Multi-engine', detail: 'PostgreSQL, MongoDB, SQLite' },
      { label: 'Validation', detail: 'JSON Schema + custom rules' },
      { label: 'Versioning', detail: 'Full migration history' },
    ],
    rays: [
      { angle: 8, color: 'rgba(0,229,255,0.4)', height: 160 },
      { angle: -3, color: 'rgba(0,229,255,0.2)', height: 140 },
    ],
  },
  {
    title: 'Multi-Database',
    subtitle: 'Connect',
    description: 'Unified access to SQL, NoSQL, and object storage through a single API.',
    color: 'var(--prisma-spectral-violet)',
    specs: [
      { label: 'SQL', detail: 'PostgreSQL via PostgREST' },
      { label: 'NoSQL', detail: 'MongoDB document store' },
      { label: 'Objects', detail: 'MinIO S3-compatible storage' },
    ],
    rays: [
      { angle: 5, color: 'rgba(167,139,250,0.4)', height: 170 },
      { angle: -6, color: 'rgba(167,139,250,0.2)', height: 130 },
    ],
  },
  {
    title: 'Auto API',
    subtitle: 'Expose',
    description: 'REST endpoints generated automatically from your schema definitions.',
    color: 'var(--prisma-spectral-emerald)',
    specs: [
      { label: 'REST', detail: 'Auto-generated from tables' },
      { label: 'Auth', detail: 'JWT + Row-Level Security' },
      { label: 'Realtime', detail: 'WebSocket subscriptions' },
    ],
    rays: [
      { angle: 10, color: 'rgba(52,211,153,0.4)', height: 150 },
      { angle: -4, color: 'rgba(52,211,153,0.2)', height: 120 },
    ],
  },
  {
    title: 'Analytics',
    subtitle: 'Discover',
    description: 'Cross-database queries and federated analytics that reveal hidden patterns.',
    color: 'var(--prisma-spectral-rose)',
    specs: [
      { label: 'Federation', detail: 'Trino SQL across all sources' },
      { label: 'Joins', detail: 'Cross-database JOINs' },
      { label: 'Viz', detail: 'Dashboard integration ready' },
    ],
    rays: [
      { angle: 7, color: 'rgba(244,114,182,0.4)', height: 165 },
      { angle: -5, color: 'rgba(244,114,182,0.2)', height: 135 },
    ],
  },
];

export interface RefractionSectionProps {
  readonly scrollProgress: number;
}

export function RefractionSection({ scrollProgress }: RefractionSectionProps): React.JSX.Element {
  const [specsFor, setSpecsFor] = useState<Feature | null>(null);
  const brightness = Math.min(1, Math.max(0, (scrollProgress - 0.2) * 2));

  return (
    <section className="prisma-section">
      {/* Ambient glow */}
      <div
        className="prisma-section__glow"
        style={{
          background: `radial-gradient(ellipse at 50% 50%,
            rgba(0,229,255,${brightness * 0.04}) 0%,
            rgba(112,0,255,${brightness * 0.025}) 40%,
            transparent 70%)`,
        }}
      />

      <div className="prisma-section__content">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="prisma-section__label"
        >
          The Refraction
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="prisma-section__headline chromatic-hover"
        >
          One model. Infinite perspectives.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="prisma-section__subtext"
        >
          Your data exists. Info is scattered across the dark -formless, invisible -
          waiting to be shaped. Now you can see it.
        </motion.p>
      </div>

      {/* Feature cards */}
      <div className="prisma-section__grid">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * i }}
          >
            <GlassCard
              title={feature.title}
              subtitle={feature.subtitle}
              description={feature.description}
              glowColor={feature.color}
              rays={feature.rays}
              onClick={() => setSpecsFor(feature)}
            />
          </motion.div>
        ))}
      </div>

      {/* Specs dialog */}
      <Dialog
        open={specsFor !== null}
        onClose={() => setSpecsFor(null)}
        title={specsFor?.title}
        size="md"
      >
        {specsFor?.specs.map((spec) => (
          <div key={spec.label} style={{ marginBottom: '0.75rem' }}>
            <strong style={{ color: 'var(--prisma-landing-text-bright)' }}>
              {spec.label}:
            </strong>{' '}
            <span style={{ color: 'var(--prisma-landing-text)' }}>{spec.detail}</span>
          </div>
        ))}
      </Dialog>
    </section>
  );
}
