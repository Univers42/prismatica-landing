/**
 * @file uid
 * @description Lightweight unique ID generator. Zero dependencies.
 */
import { safeRandom } from '@/shared/lib/crypto';

export function uid(prefix = 'id'): string {
  return `${prefix}-${safeRandom().toString(36).slice(2, 10)}`;
}
