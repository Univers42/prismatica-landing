import React, { useCallback, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuthUser, useAuthStatus, useLogout } from '@/features/auth';
import styles from './DashboardPage.module.scss';

// ── Types ─────────────────────────────────────────────────────────────────────

interface NavItem {
  readonly id: string;
  readonly icon: string;
  readonly label: string;
}

interface WidgetMeta {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly tag: string;
  readonly tagVariant: 'soon' | 'beta' | 'active';
}

// ── Constants ─────────────────────────────────────────────────────────────────

const NAV_ITEMS: readonly NavItem[] = [
  { id: 'overview',  icon: '⬡', label: 'Overview'  },
  { id: 'projects',  icon: '⬢', label: 'Projects'  },
  { id: 'schemas',   icon: '⬡', label: 'Schemas'   },
  { id: 'views',     icon: '⬢', label: 'Views'     },
  { id: 'adapters',  icon: '⬡', label: 'Adapters'  },
  { id: 'settings',  icon: '⬢', label: 'Settings'  },
] as const;

const WIDGETS: readonly WidgetMeta[] = [
  {
    id: 'profile',
    icon: '◈',
    title: 'Profile',
    description: 'Manage your identity, avatar, and personal information.',
    tag: 'Active',
    tagVariant: 'active',
  },
  {
    id: 'projects',
    icon: '◉',
    title: 'Projects',
    description: 'View and organise your Prismatica data projects.',
    tag: 'Coming soon',
    tagVariant: 'soon',
  },
  {
    id: 'schemas',
    icon: '◈',
    title: 'Schemas',
    description: 'Design and evolve your polymorphic data schemas dynamically.',
    tag: 'Coming soon',
    tagVariant: 'soon',
  },
  {
    id: 'views',
    icon: '◉',
    title: 'Views',
    description: 'Configure view strategies for your datasets with adapters.',
    tag: 'Beta',
    tagVariant: 'beta',
  },
  {
    id: 'adapters',
    icon: '◈',
    title: 'Adapters',
    description: 'Connect external data sources via flexible adapter plugins.',
    tag: 'Coming soon',
    tagVariant: 'soon',
  },
  {
    id: 'settings',
    icon: '◉',
    title: 'Settings',
    description: 'Control notifications, security, and account preferences.',
    tag: 'Active',
    tagVariant: 'active',
  },
] as const;

// ── Skeleton ──────────────────────────────────────────────────────────────────

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

function WidgetCard({ widget, index }: { widget: WidgetMeta; index: number }): React.JSX.Element {
  return (
    <m.article
      className={styles.widgetCard}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`${widget.title} module`}
    >
      <div className={styles.widgetHeader}>
        <span className={styles.widgetIcon} aria-hidden="true">{widget.icon}</span>
        <span className={`${styles.widgetTag} ${styles[`tag--${widget.tagVariant}`]}`}>
          {widget.tag}
        </span>
      </div>
      <h2 className={styles.widgetTitle}>{widget.title}</h2>
      <p className={styles.widgetDescription}>{widget.description}</p>
    </m.article>
  );
}

// ── Dashboard Page ────────────────────────────────────────────────────────────

/**
 * 🏠 DashboardPage
 *
 * Professional workspace shell. Completely isolated from the landing
 * experience — no StarField, no LightCursor, no dynamic backgrounds.
 * Clean, focused, app-grade UI.
 */
export function DashboardPage(): React.JSX.Element {
  const logout = useLogout();
  const user = useAuthUser();
  const status = useAuthStatus();
  const [activeNav, setActiveNav] = useState<string>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const isLoading = status === 'CHECKING' || status === 'LOADING';

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    closeSidebar();
    logout();
  }, [logout, closeSidebar]);

  const initials = user?.display_name
    ? user.display_name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
    : (user?.username?.[0] ?? 'U').toUpperCase();

  const displayName = user?.display_name ?? user?.username ?? 'User';

  return (
    <div className={`${styles.layout} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
      {/* ── Backdrop (Mobile only) ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <m.div 
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarActive : ''}`} aria-label="Main navigation">
        {/* Brand */}
        <div className={styles.sidebarBrand}>
          <div className={styles.brandMark} aria-hidden="true">P</div>
          <span className={styles.brandText}>Prismatica</span>
        </div>

        {/* Nav */}
        <nav className={styles.sidebarNav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`${styles.navItem} ${activeNav === item.id ? styles.navItemActive : ''}`}
              onClick={() => {
                setActiveNav(item.id);
                closeSidebar();
              }}
              aria-current={activeNav === item.id ? 'page' : undefined}
            >
              <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userRow}>
            <div className={styles.userAvatar} aria-hidden="true">{initials}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{displayName}</span>
              <span className={styles.userEmail}>{user?.email ?? '—'}</span>
            </div>
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
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className={styles.main} id="dashboard-main">

        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            {/* Mobile Menu Btn */}
            <button 
              className={styles.mobileMenuBtn}
              onClick={toggleSidebar}
              aria-label="Toggle navigation menu"
              aria-expanded={isSidebarOpen}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <h1 className={styles.pageTitle}>Overview</h1>
            <span className={styles.pageBreadcrumb}>Workspace</span>
          </div>
          <div className={styles.topbarRight}>
            <div className={styles.statusDot} aria-label="System status: operational" title="All systems operational" />
            <span className={styles.statusLabel}>Operational</span>
          </div>
        </header>

        {/* Welcome strip */}
        <m.div
          className={styles.welcomeStrip}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className={styles.welcomeText}>
            <p className={styles.welcomeGreeting}>
              {isLoading ? 'Loading workspace…' : `Good day, ${displayName}`}
            </p>
            <p className={styles.welcomeSub}>
              Your polymorphic data platform is ready. Select a module below to get started.
            </p>
          </div>
        </m.div>

        {/* Widget grid */}
        <section aria-label="Available modules">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <m.div
                key="skeleton"
                className={styles.grid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="status"
                aria-label="Loading modules"
              >
                {WIDGETS.map((w) => <SkeletonCard key={w.id} />)}
              </m.div>
            ) : (
              <m.div
                key="widgets"
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
        </section>
      </main>
    </div>
  );
}
