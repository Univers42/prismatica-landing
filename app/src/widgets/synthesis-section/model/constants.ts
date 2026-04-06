import { Mail, Globe as Github, Globe as Linkedin } from 'lucide-react';
import type { LucideIcon } from '@/widgets/prism-card/model/constants';

export const CONVERGENCE_IMG = 'https://media.base44.com/images/public/69cafcb4a2756f895662c19b/43da19e93_generated_052a15fb.png';

export interface SocialLink {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly color: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { icon: Mail, label: 'Email', color: '#00E5FF' },
  { icon: Github, label: 'GitHub', color: '#FF007A' },
  { icon: Linkedin, label: 'LinkedIn', color: '#7000FF' },
];

export interface FormField {
  readonly key: 'name' | 'email';
  readonly label: string;
  readonly type: string;
  readonly placeholder: string;
}

export const FORM_FIELDS: readonly FormField[] = [
  { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
];

export const FOOTER_LINKS: readonly string[] = ['Documentation', 'Privacy', 'Terms'];
