import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import { CONVERGENCE_IMG, SOCIAL_LINKS, FORM_FIELDS, FOOTER_LINKS } from '../model/constants';
import styles from './SynthesisSection.module.css';

export interface SynthesisSectionProps {
  readonly scrollProgress: number;
}

export function SynthesisSection({ scrollProgress }: SynthesisSectionProps): JSX.Element {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  // brightness ramps up in the last 25% of scroll
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
    <section className={styles.sectionContainer}>
      {/* Convergence background */}
      <div className={styles.backgroundWrapper}>
        <img
          src={CONVERGENCE_IMG}
          alt="Light rays converging into focal point"
          className={styles.convergenceImage}
          style={{ opacity: 0.08 + brightness * 0.25 }}
        />
        <div className={styles.gradientOverlay} />
        {/* Spectral glow rings */}
        {brightness > 0.1 && (
          <div
            className={styles.spectralGlowRings}
            style={{
              background: `radial-gradient(ellipse at 50% 50%, 
                rgba(0,229,255,${brightness * 0.06}) 0%, 
                rgba(112,0,255,${brightness * 0.04}) 35%, 
                rgba(255,0,122,${brightness * 0.02}) 60%, 
                transparent 80%)`,
            }}
          />
        )}
      </div>

      <div className={styles.contentContainer}>
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={styles.leftContent}
        >
          <p
            className={styles.subtitle}
            style={{
              color: `rgba(112,0,255,${0.6 + brightness * 0.4})`,
              textShadow: brightness > 0.3 ? `0 0 15px rgba(112,0,255,${brightness * 0.6})` : 'none',
            }}
          >
            The Synthesis
          </p>
          <h2
            className={styles.headline}
            style={{
              color: `rgba(242,242,242,${0.7 + brightness * 0.3})`,
              textShadow: brightness > 0.2
                ? `0 0 ${40 * brightness}px rgba(112,0,255,${brightness * 0.4}), -1px 0 rgba(0,229,255,${brightness * 0.3}), 1px 0 rgba(255,0,122,${brightness * 0.2})`
                : 'none',
            }}
          >
            All light<br />converges here
          </h2>
          <p
            className={styles.description}
            style={{ color: `rgba(160,160,180,${0.6 + brightness * 0.4})` }}
          >
            Ready to transform your data from scattered points of light into a focused beam of clarity? Let's start your spectrum.
          </p>

          {/* Social links */}
          <div className={styles.socialLinksContainer}>
            {SOCIAL_LINKS.map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                className={`group ${styles.socialLink}`}
                style={{ color: `rgba(160,160,180,${0.4 + brightness * 0.4})` }}
                onMouseEnter={(e) => { e.currentTarget.style.color = color; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = `rgba(160,160,180,${0.4 + brightness * 0.4})`; }}
              >
                <Icon className={styles.socialIcon} />
                <span className={styles.socialLabel}>{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className={styles.formContainer}
        >
          <form
            onSubmit={handleSubmit}
            className={styles.formWrapper}
            style={{
              background: `rgba(255,255,255,${0.02 + brightness * 0.03})`,
              border: `1px solid rgba(255,255,255,${0.05 + brightness * 0.1})`,
              boxShadow: brightness > 0.1
                ? `0 0 ${30 + brightness * 60}px rgba(112,0,255,${brightness * 0.08})`
                : 'none',
            }}
          >
            {FORM_FIELDS.map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className={styles.formLabel}>
                  {label}
                </label>
                <Input
                  type={type}
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  placeholder={placeholder}
                  className={styles.formInput}
                  style={{
                    borderColor: `rgba(255,255,255,${0.08 + brightness * 0.12})`,
                  }}
                  required
                />
              </div>
            ))}
            <div>
              <label className={styles.formLabel}>
                Message
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your data..."
                rows={4}
                className={styles.formTextarea}
                style={{
                  borderColor: `rgba(255,255,255,${0.08 + brightness * 0.12})`,
                }}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className={`group ${styles.submitButton}`}
              style={{
                background: brightness > 0.3
                  ? `linear-gradient(135deg, #00E5FF, #7000FF)`
                  : 'rgb(242,242,242)',
                color: '#050507',
                boxShadow: brightness > 0.1
                  ? `0 0 ${20 + brightness * 40}px rgba(0,229,255,${brightness * 0.5})`
                  : 'none',
              }}
            >
              {sending ? 'Sending...' : 'Begin your spectrum'}
              <ArrowRight className={styles.submitIcon} />
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <div className={styles.footerContainer}>
        <div className={styles.footerInner}>
          <p className={styles.copyrightText}>
            © 2026 PRISMATICA — Polymorphic Data Platform
          </p>
          <div className={styles.footerLinks}>
            {FOOTER_LINKS.map((link) => (
              <span
                key={link}
                className={styles.footerLinkItem}
                style={{ color: `rgba(160,160,180,${0.25 + brightness * 0.4})` }}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
