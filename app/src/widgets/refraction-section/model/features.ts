import { Database, Eye, BarChart3, Layers, Zap, Share2, LucideIcon } from 'lucide-react';

export interface FeatureSpec {
  readonly label: string;
  readonly detail: string;
}

export interface FeatureCardConfig {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly color: string;
  readonly specs: readonly FeatureSpec[];
}

export const features: readonly FeatureCardConfig[] = [
  {
    title: 'Database Builder',
    subtitle: 'Ingestion',
    description: 'Define custom databases with typed fields, relationships, and real-time validation. Your raw data enters the prism.',
    icon: Database,
    color: 'cyan',
    specs: [
      { label: 'Custom Field Types', detail: 'Text, Number, Date, Email, URL, File, Relations, Formulas' },
      { label: 'Real-time Validation', detail: 'Type-safe constraints with instant feedback' },
      { label: 'Import/Export', detail: 'CSV, JSON, API sync with automatic mapping' },
      { label: 'Row-Level Security', detail: 'Fine-grained access rules per database' },
    ],
  },
  {
    title: 'Polymorphic Views',
    subtitle: 'Refraction',
    description: 'Same data, infinite perspectives. Table, Kanban, Calendar, Gallery — each view refracts your data into a new dimension.',
    icon: Eye,
    color: 'magenta',
    specs: [
      { label: 'Table View', detail: 'Spreadsheet-like with sorting, filtering, grouping' },
      { label: 'Kanban Board', detail: 'Drag-and-drop cards organized by any status field' },
      { label: 'Calendar View', detail: 'Date-based visualization with event cards' },
      { label: 'Gallery View', detail: 'Visual grid of records with image previews' },
    ],
  },
  {
    title: 'Dashboard Builder',
    subtitle: 'Visualization',
    description: 'Compose live dashboards from modular widgets. Charts, KPIs, and filters update in real-time across your spectrum.',
    icon: BarChart3,
    color: 'violet',
    specs: [
      { label: 'Widget Library', detail: 'Bar, Line, Pie, Table, KPI, Filter widgets' },
      { label: 'Cross-Database', detail: 'Pull data from multiple databases into one view' },
      { label: 'Live Updates', detail: 'Real-time data refresh with WebSocket connections' },
      { label: 'Custom Themes', detail: 'Match your brand with flexible styling options' },
    ],
  },
  {
    title: 'Adapter Layer',
    subtitle: 'Integration',
    description: 'Connect external systems through intelligent adapters. APIs, webhooks, and live sync — bridging your data universe.',
    icon: Layers,
    color: 'cyan',
    specs: [
      { label: 'REST API', detail: 'Full CRUD endpoints auto-generated per database' },
      { label: 'Webhooks', detail: 'Trigger external workflows on data changes' },
      { label: 'Live Sync', detail: 'Bi-directional sync with external sources' },
      { label: 'Adapter Marketplace', detail: 'Pre-built connectors for common services' },
    ],
  },
  {
    title: 'Embed & Share',
    subtitle: 'Projection',
    description: 'Project your refined data outward. Embed views, share dashboards, and publish live data to the external world.',
    icon: Share2,
    color: 'magenta',
    specs: [
      { label: 'Embed Widgets', detail: 'iFrame-ready components for any website' },
      { label: 'Public Links', detail: 'Shareable URLs with optional access control' },
      { label: 'White Label', detail: 'Custom domains and branding for client portals' },
      { label: 'Export Formats', detail: 'PDF, PNG, CSV, JSON scheduled exports' },
    ],
  },
  {
    title: 'Automation Engine',
    subtitle: 'Acceleration',
    description: 'Set triggers, conditions, and actions. Your data doesn\'t just sit — it reacts, transforms, and flows automatically.',
    icon: Zap,
    color: 'violet',
    specs: [
      { label: 'Trigger System', detail: 'On create, update, delete, schedule, or webhook' },
      { label: 'Condition Logic', detail: 'If/else branching with field-level evaluation' },
      { label: 'Action Library', detail: 'Send email, update record, call API, notify' },
      { label: 'Execution Logs', detail: 'Full audit trail with error handling' },
    ],
  },
];
