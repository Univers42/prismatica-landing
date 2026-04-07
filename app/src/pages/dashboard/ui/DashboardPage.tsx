import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { useAuthActions, useAuthUser, useAuthStatus } from '@/features/auth';
import styles from './DashboardPage.module.scss';

// ── Widget Definitions ────────────────────────────────────────────────────────

interface WidgetMeta {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly accentColor: string;
}

const WIDGETS: readonly WidgetMeta[] = [
  {
    id: 'profile',
    icon: '👤',
    title: 'Profile',
    description: 'Manage your identity, avatar, and personal information.',
    accentColor: 'rgba(0, 229, 255, 0.12)',
  },
  {
    id: 'projects',
    icon: '🗂️',
    title: 'Projects',
    description: 'View and organise your Prismatica data projects.',
    accentColor: 'rgba(167, 139, 250, 0.12)',
  },
  {
    id: 'schemas',
    icon: '🧩',
    title: 'Schemas',
    description: 'Design and evolve your polymorphic data schemas.',
    accentColor: 'rgba(52, 211, 153, 0.12)',
  },
  {
    id: 'views',
    icon: '👁️',
    title: 'Views',
    description: 'Configure dynamic view strategies for your datasets.',
    accentColor: 'rgba(251, 191, 36, 0.12)',
  },
  {
    id: 'adapters',
    icon: '🔌',
    title: 'Adapters',
    description: 'Connect external data sources with flexible adapters.',
    accentColor: 'rgba(59, 130, 246, 0.12)',
  },
  {
    id: 'settings',
    icon: '⚙️',
    title: 'Settings',
    description: 'Control notifications, security, and account preferences.',
    accentColor: 'rgba(244, 114, 182, 0.12)',
  },
] as const;

// ── Skeleton Card ─────────────────────────────────────────────────────────────

function SkeletonCard(): React.JSX.Element {
  return (
    <div className={styles.skeletonCard} aria-hidden="true">
      <div className={`${styles.skeletonBase} ${styles.skeletonIcon}`} />
      <div className={`${styles.skeletonBase} ${styles.skeletonTitle}`} />
      <div className={`${styles.skeletonBase} ${styles.skeletonText}`} />
      <div className={`${styles.skeletonBase} ${styles.skeletonTextShort}`} />
      <div className={`${styles.skeletonBase} ${styles.skeletonBadge}`} />
    </div>
  );
}

// ── Widget Card ───────────────────────────────────────────────────────────────

interface WidgetCardProps {
  readonly widget: WidgetMeta;
  readonly index: number;
}

function WidgetCard({ widget, index }: WidgetCardProps): React.JSX.Element {
  return (
    <m.article
      className={styles.widgetCard}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`${widget.title} widget`}
    >
      <div
        className={styles.widgetIcon}
        style={{ background: widget.accentColor }}
        aria-hidden="true"
      >
        {widget.icon}
      </div>
      <h2 className={styles.widgetTitle}>{widget.title}</h2>
      <p className={styles.widgetDescription}>{widget.description}</p>
      <span className={`${styles.widgetBadge} ${styles.badgeComingSoon}`}>
        Coming Soon
      </span>
    </m.article>
  );
}

// ── Dashboard Page ────────────────────────────────────────────────────────────

/**
 * 🏠 DashboardPage
 *
 * Phase 1 shell — full mobile-first layout with:
 * - Sticky topbar (brand + avatar + logout)
 * - Welcome header with user's display name
 * - Skeleton cards that transition to real widget cards once auth state resolves
 */
export function DashboardPage(): React.JSX.Element {
  const navigate = useNavigate();
  const { logout } = useAuthActions();
  const user = useAuthUser();
  const status = useAuthStatus();

  const isLoading = status === 'LOADING' || status === 'IDLE';

  const handleLogout = useCallback(() => {
    logout();
    navigate('/', { replace: true });
  }, [logout, navigate]);

  const initials = user?.display_name
    ? user.display_name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : (user?.username?.[0] ?? 'U').toUpperCase();

  const displayName = user?.display_name ?? user?.username ?? 'User';

  return (
    <div className={styles.page}>
      {/* Decorative background glow */}
      <div className={styles.glowAccent} aria-hidden="true" />

      {/* ── Top Navigation Bar ── */}
      <header className={styles.topbar}>
        <div className={styles.topbarBrand}>
          <div className={styles.brandLogo} aria-hidden="true">P</div>
          <span className={styles.brandName}>Prismatica</span>
        </div>

        <nav className={styles.topbarActions} aria-label="Dashboard navigation">
          <div
            className={styles.avatar}
            title={displayName}
            aria-label={`User avatar for ${displayName}`}
          >
            {initials}
          </div>

          <button
            id="dashboard-logout-btn"
            className={styles.logoutBtn}
            onClick={handleLogout}
            type="button"
            aria-label="Sign out of Prismatica"
          >
            Sign out
          </button>
        </nav>
      </header>

      {/* ── Main Content ── */}
      <main className={styles.main} id="dashboard-main">
        {/* Welcome Header */}
        <m.div
          className={styles.header}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <p className={styles.greeting}>Welcome back</p>
          <h1 className={styles.heading}>
            {isLoading ? 'Loading your workspace…' : `Hello, ${displayName} ✦`}
          </h1>
          <p className={styles.subheading}>
            Your polymorphic data platform. Everything in one place.
          </p>
        </m.div>

        {/* Widget Grid — skeleton during load, real cards when ready */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <m.div
              key="skeleton-grid"
              className={styles.grid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="status"
              aria-label="Loading dashboard widgets"
            >
              {WIDGETS.map((w) => (
                <SkeletonCard key={w.id} />
              ))}
            </m.div>
          ) : (
            <m.div
              key="widget-grid"
              className={styles.grid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {WIDGETS.map((widget, i) => (
                <WidgetCard key={widget.id} widget={widget} index={i} />
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
