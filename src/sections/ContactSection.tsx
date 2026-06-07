import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { z } from 'zod';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { fadeUp, staggerContainer } from '@/lib/variants';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from '@/lib/constants';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone is required"),
  message: z.string().min(10, "Message is too short"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactSection = memo(() => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({ name: '', company: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    try {
      setStatus('loading');
      setErrors({});
      contactSchema.parse(formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t('nav.contact')}</SectionLabel>
            </motion.div>
            <motion.h2 
              variants={fadeUp}
              className="text-3xl md:text-5xl font-display text-[var(--text-primary)] mb-8 leading-tight"
            >
              Let's Build Something Great Together
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--text-muted)] text-lg leading-relaxed mb-12">
              {t('contact.text')}
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-8">
              <motion.div variants={fadeUp} className="flex items-center gap-4 text-[var(--text-primary)]">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <span className="font-mono">{CONTACT_EMAIL}</span>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-4 text-[var(--text-primary)]">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <span className="font-mono">{CONTACT_PHONE}</span>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-4 text-[var(--text-primary)]">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <span>{CONTACT_ADDRESS}</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[var(--bg-void)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wide">{t('contact.form.name')}</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                  />
                  {errors.name && <p className="text-[var(--danger)] text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wide">{t('contact.form.company')}</label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wide">{t('contact.form.email')}</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] transition-colors rtl:text-right"
                    dir="ltr"
                  />
                  {errors.email && <p className="text-[var(--danger)] text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wide">{t('contact.form.phone')}</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] transition-colors rtl:text-right"
                    dir="ltr"
                  />
                  {errors.phone && <p className="text-[var(--danger)] text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wide">{t('contact.form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] transition-colors resize-none"
                />
                {errors.message && <p className="text-[var(--danger)] text-xs mt-1">{errors.message}</p>}
              </div>

              <Button 
                onClick={handleSubmit} 
                className="w-full mt-4" 
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent ✓' : t('contact.form.submit')}
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';
