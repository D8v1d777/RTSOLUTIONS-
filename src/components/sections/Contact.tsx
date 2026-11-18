'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ExternalLink, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { config } from '@/lib/config';

// Types for form data
type FormData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  // Honeypot field - bots fill this, humans don't see it (client-side filtering only)
  website: string;
};

// Pure function for mailto URL generation - testable independently
export const buildMailtoUrl = (data: FormData, verifiedEmail: string): string => {
  const projectTypeLabel =
    config.projectTypes.find((option) => option.value === data.projectType)?.label ||
    data.projectType ||
    'Not specified';
  const budgetLabel =
    config.budgetRanges.find((option) => option.value === data.budget)?.label ||
    data.budget ||
    'Not specified';
  const timelineLabel =
    config.timelines.find((option) => option.value === data.timeline)?.label ||
    data.timeline ||
    'Not specified';

  const subject = encodeURIComponent(`Project Inquiry: ${projectTypeLabel}`);
  const bodyLines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Project Type: ${projectTypeLabel}`,
    `Budget Range: ${budgetLabel}`,
    `Timeline: ${timelineLabel}`,
    '',
    'Project Details:',
    data.message,
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:${verifiedEmail}?subject=${subject}&body=${body}`;
};

export function Contact() {
  const hasVerifiedRecipient = !config.isPlaceholder && Boolean(config.contact.verifiedEmail);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'mailto-sent' | 'placeholder-warning'>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.projectType) newErrors.projectType = 'Select a project type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 50) newErrors.message = 'Please share more details (min 50 chars)';
    // Honeypot check - if filled, likely a bot (client-side filtering only, not server-side protection)
    if (formData.website.trim()) {
      setErrors(newErrors);
      return false;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState('submitting');

    // Brief delay to show submitting state
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Use single source of truth: config.isPlaceholder
    if (!hasVerifiedRecipient) {
      setFormState('placeholder-warning');
      return;
    }

    // Open mailto with encoded form data
    const mailtoUrl = buildMailtoUrl(formData, config.contact.verifiedEmail);
    window.location.href = mailtoUrl;

    setFormState('mailto-sent');
    // Do NOT clear form data - user may want to adjust and resend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Reset form state when user starts editing again
    if (formState === 'mailto-sent' || formState === 'placeholder-warning') {
      setFormState('idle');
    }
  };

  const dismissNotice = () => setFormState('idle');

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-crimson/5 rounded-full blur-[300px] opacity-30"
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Info Column */}
          <motion.div
            className="lg:pl-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 glass-panel text-xs font-medium text-crimson-glow uppercase tracking-wider mb-6">
              Get in touch
            </span>
            <h2
              id="contact-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1] mb-6"
            >
              Let's talk about
              <br />
              <span className="text-crimson-glow">your project.</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-xl">
              No sales scripts. No middlemen. You'll talk directly with the people who'd be doing the work.
              Share what you're building. If no verified recipient is configured, nothing is sent or stored; your draft remains only in this open page.
            </p>

            {/* Verified contact method — never expose placeholder addresses */}
            { hasVerifiedRecipient ? (
              <a
                href={`mailto:${config.contact.verifiedEmail}`}
                className="group flex items-center gap-4 p-5 glass-panel-strong rounded-xl hover:border-crimson-dim/50 transition-all duration-300"
              >
                <div className="w-12 h-12 glass-panel-crimson rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6 text-crimson-glow" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-xs text-text-dim uppercase tracking-wider">Email</p>
                  <p className="text-text-secondary group-hover:text-white transition-colors">{config.contact.verifiedEmail}</p>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-4 p-5 glass-panel-strong rounded-xl" role="status">
                <div className="w-12 h-12 glass-panel rounded-xl flex items-center justify-center flex-shrink-0 text-text-dim">
                  <Mail className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-xs text-text-dim uppercase tracking-wider">Email</p>
                  <p className="text-text-secondary">No verified contact address is published yet.</p>
                </div>
              </div>
            )}

            {/* Placeholder notice */}
            {config.isPlaceholder && (
              <motion.div
                className="mt-10 p-4 glass-panel-crimson rounded-xl border-crimson-dim/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-mono text-xs text-crimson-glow flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  Placeholder contact details — replace with verified info in config
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {/* Placeholder Warning State */}
              {formState === 'placeholder-warning' && (
                <motion.div
                  key="placeholder-warning"
                  className="glass-panel-strong rounded-2xl p-8 lg:p-10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6 text-amber" aria-hidden="true" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-display text-xl font-medium text-white mb-2">
                        Contact details are placeholders
                      </h3>
                      <p className="text-text-secondary mb-4">
                        No verified contact address is configured yet. Your message has not been sent, and no placeholder address will be shown.
                      </p>
                      <p className="text-text-secondary text-sm mb-6">
                        Keep this page open to retain your draft. Leaving or refreshing the page clears it.
                      </p>
                      <button
                        onClick={dismissNotice}
                        className="px-4 py-2 text-sm font-medium text-white bg-crimson hover:bg-crimson-glow border border-crimson-dim rounded-md transition-all duration-200"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Mailto Sent State */}
              {formState === 'mailto-sent' && (
                <motion.div
                  key="mailto-sent"
                  className="glass-panel-strong rounded-2xl p-8 lg:p-10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-crimson/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-crimson-glow" aria-hidden="true" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-display text-xl font-medium text-white mb-2">
                        Email draft opened
                      </h3>
                      <p className="text-text-secondary mb-4">
                        Your default mail client should have opened with a pre-filled draft containing your project details.
                      </p>
                      <p className="text-text-secondary text-sm mb-6">
                        <strong>Please review and send the email yourself.</strong> We do not receive your message until you click Send in your mail client.
                      </p>
                      <p className="text-text-dim text-sm mb-6">
                        Your form data remains below in case you need to adjust and resend.
                      </p>
                      <button
                        onClick={dismissNotice}
                        className="px-4 py-2 text-sm font-medium text-white bg-crimson hover:bg-crimson-glow border border-crimson-dim rounded-md transition-all duration-200"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              {(formState === 'idle' || formState === 'submitting' || formState === 'mailto-sent') && (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={handleSubmit}
                  className="glass-panel-strong rounded-2xl p-8 lg:p-10 space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Honeypot field - hidden from users, filled by bots (client-side filtering only) */}
                  <input
                    type="text"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-mono text-xs text-text-dim uppercase tracking-wider mb-2"
                      >
                        Name <span className="text-crimson-glow" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 glass-panel rounded-lg border transition-all duration-200 ${
                          errors.name ? 'border-crimson/50 focus:border-crimson' : 'border-white/10 focus:border-crimson-glow/50'
                        } text-white placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-crimson-glow/20`}
                        placeholder="Your name"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        disabled={formState === 'submitting'}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-sm text-crimson-glow" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-xs text-text-dim uppercase tracking-wider mb-2"
                      >
                        Email <span className="text-crimson-glow" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 glass-panel rounded-lg border transition-all duration-200 ${
                          errors.email ? 'border-crimson/50 focus:border-crimson' : 'border-white/10 focus:border-crimson-glow/50'
                        } text-white placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-crimson-glow/20`}
                        placeholder="you@company.com"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        disabled={formState === 'submitting'}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-sm text-crimson-glow" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block font-mono text-xs text-text-dim uppercase tracking-wider mb-2"
                      >
                        Project Type <span className="text-crimson-glow" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 glass-panel rounded-lg border transition-all duration-200 appearance-none ${
                          errors.projectType ? 'border-crimson/50 focus:border-crimson' : 'border-white/10 focus:border-crimson-glow/50'
                        } text-white focus:outline-none focus:ring-2 focus:ring-crimson-glow/20`}
                        aria-invalid={errors.projectType ? 'true' : 'false'}
                        aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                        disabled={formState === 'submitting'}
                      >
                        <option value="" disabled>
                          Select project type
                        </option>
                        {config.projectTypes.map((pt) => (
                          <option key={pt.value} value={pt.value}>
                            {pt.label}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p id="projectType-error" className="mt-1.5 text-sm text-crimson-glow" role="alert">
                          {errors.projectType}
                        </p>
                      )}
                    </div>

                    {/* Budget */}
                    <div>
                      <label
                        htmlFor="budget"
                        className="block font-mono text-xs text-text-dim uppercase tracking-wider mb-2"
                      >
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 glass-panel rounded-lg border border-white/10 focus:border-crimson-glow/50 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-crimson-glow/20"
                        disabled={formState === 'submitting'}
                      >
                        <option value="">Select budget range</option>
                        {config.budgetRanges.map((br) => (
                          <option key={br.value} value={br.value}>
                            {br.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Timeline */}
                    <div>
                      <label
                        htmlFor="timeline"
                        className="block font-mono text-xs text-text-dim uppercase tracking-wider mb-2"
                      >
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 glass-panel rounded-lg border border-white/10 focus:border-crimson-glow/50 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-crimson-glow/20"
                        disabled={formState === 'submitting'}
                      >
                        <option value="">Select timeline</option>
                        {config.timelines.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Empty spacer for alignment */}
                    <div />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-mono text-xs text-text-dim uppercase tracking-wider mb-2"
                    >
                      Project Details <span className="text-crimson-glow" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 glass-panel rounded-lg border transition-all duration-200 resize-y min-h-[140px] ${
                        errors.message ? 'border-crimson/50 focus:border-crimson' : 'border-white/10 focus:border-crimson-glow/50'
                      } text-white placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-crimson-glow/20`}
                      placeholder="Tell us about your project: goals, constraints, tech preferences, timeline drivers, anything that helps us understand the shape of the work."
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-hint message-error' : 'message-hint'}
                      disabled={formState === 'submitting'}
                    />
                    <p id="message-hint" className="mt-1.5 text-sm text-text-dim">
                      Minimum 50 characters. Be specific—it helps us prepare for our first conversation.
                    </p>
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-sm text-crimson-glow" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full sm:w-auto px-8 py-4 text-base font-medium text-white bg-crimson hover:bg-crimson-glow border border-crimson-dim rounded-md transition-all duration-300 hover:shadow-crimson disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        Preparing...
                      </>) : (
                      <>
                        {hasVerifiedRecipient ? 'Open email draft' : 'Review contact status'}
                        {hasVerifiedRecipient && <ExternalLink className="w-5 h-5" aria-hidden="true" />}
                      </>
                    )}
                  </button>

                  <p className="text-xs text-text-dim text-center sm:text-left">
                    {!hasVerifiedRecipient
                      ? 'No verified recipient is configured. Your draft stays in this open page only; leaving or refreshing clears it. Nothing is sent or stored by RTSOLUTIONS.'
                      : 'This form prepares a mailto: draft in your email client. You must review and send it yourself; no message is transmitted to RTSOLUTIONS until you do.'}
                    {config.contact.privacyPolicyUrl && (
                      <>
                        <br />
                        <a
                          href={config.contact.privacyPolicyUrl}
                          className="text-crimson-glow hover:text-scarlet underline underline-offset-2"
                        >
                          Privacy notice
                        </a>
                      </>
                    )}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}