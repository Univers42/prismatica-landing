import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Section, SectionGlow, SectionContent, SectionHeadline, SectionSubtext, SectionLabel, Input, Textarea } from '@/shared/ui';
import styles from './SynthesisSection.module.scss';

export interface SynthesisSectionProps {
  readonly scrollProgress: number;
}

export function SynthesisSection({ scrollProgress }: SynthesisSectionProps): React.JSX.Element {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const brightness = Math.min(1, Math.max(0, (scrollProgress - 0.75) * 4));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent. We'll be in touch.");
    setFormData({ name: '', email: '', message: '' });
    setSending(false);
  };

  return (
    <Section id="synthesis">
      {/* Spectral glow */}
      {brightness > 0.1 && (
        <SectionGlow
          style={{
            background: `radial-gradient(ellipse at 50% 50%,
              rgba(0,229,255,${brightness * 0.06}) 0%,
              rgba(112,0,255,${brightness * 0.04}) 35%,
              rgba(255,0,122,${brightness * 0.02}) 60%,
              transparent 80%)`,
          }}
        />
      )}

      <SectionContent style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '4rem',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: '900px',
      }}>
        {/* Left: messaging */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ flex: '1 1 300px' }}
        >
          <SectionLabel
            style={{
              color: `rgba(112,0,255,${0.6 + brightness * 0.4})`,
              textShadow: brightness > 0.3 ? `0 0 15px rgba(112,0,255,${brightness * 0.6})` : 'none',
              textAlign: 'left',
            }}
          >
            The Synthesis
          </SectionLabel>

          <SectionHeadline
            style={{
              textAlign: 'left',
              color: `rgba(242,242,242,${0.7 + brightness * 0.3})`,
              textShadow: brightness > 0.2
                ? `0 0 ${40 * brightness}px rgba(112,0,255,${brightness * 0.4})`
                : 'none',
            }}
          >
            All light
            <br />
            converges here
          </SectionHeadline>

          <SectionSubtext
            style={{
              textAlign: 'left',
              color: `rgba(160,160,180,${0.6 + brightness * 0.4})`,
            }}
          >
            Ready for data clarity?
          </SectionSubtext>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ flex: '1 1 380px' }}
        >
          <form
            onSubmit={handleSubmit}
            className={styles.synthesisForm}
            style={{
              boxShadow: brightness > 0.1
                ? `0 0 ${30 + brightness * 60}px rgba(112,0,255,${brightness * 0.08})`
                : 'none',
            }}
          >
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
                disabled={sending}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                required
                disabled={sending}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Message</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your data..."
                rows={4}
                required
                disabled={sending}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className={styles.submitButton}
            >
              {sending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Begin your spectrum
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </SectionContent>

      {/* Footer */}
      <div className="landing-footer">
        <p className="landing-footer__copyright">
          &copy; 2026 PRISMATICA — Polymorphic Data Platform
        </p>
        <div className="landing-footer__links">
          {['Privacy', 'Terms', 'GitHub'].map((link) => (
            <span key={link} className="landing-footer__link">{link}</span>
          ))}
        </div>
      </div>
    </Section>
  );
}
