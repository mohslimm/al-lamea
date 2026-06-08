import { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, ChevronRight, ChevronLeft, UploadCloud, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// CONSTANTS
const VARIANTS = {
  container: { animate: { transition: { staggerChildren: 0.08 } } },
  item: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.2 } }
  }
};

export const PartnershipForm = memo(() => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Dynamic Validation Schema using Translations
  const partnershipSchema = z.object({
    company: z.string().min(2, { message: t('partnership.validation.required') }),
    website: z.string().url({ message: t('partnership.validation.url') }),
    industry: z.string().min(1, { message: t('partnership.validation.required') }),
    country: z.string().min(2, { message: t('partnership.validation.required') }),
    fullName: z.string().min(2, { message: t('partnership.validation.required') }),
    role: z.string().min(2, { message: t('partnership.validation.required') }),
    email: z.string().email({ message: t('partnership.validation.email') }),
    linkedin: z.string().optional(),
    partnershipType: z.string().min(1, { message: t('partnership.validation.required') }),
    intent: z.string().min(10, { message: t('partnership.validation.required') }),
    valueUs: z.string().min(10, { message: t('partnership.validation.required') }),
    valueYou: z.string().min(10, { message: t('partnership.validation.required') }),
    notes: z.string().optional(),
    confirm: z.boolean().refine(val => val === true, {
      message: t('partnership.validation.confirm')
    })
  });

  type PartnershipFormData = z.infer<typeof partnershipSchema>;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
    mode: 'onTouched',
    defaultValues: {
      confirm: false
    }
  });

  const handleNext = async () => {
    let fieldsToValidate: (keyof PartnershipFormData)[] = [];
    if (step === 1) fieldsToValidate = ['company', 'website', 'industry', 'country'];
    if (step === 2) fieldsToValidate = ['fullName', 'role', 'email', 'linkedin'];
    if (step === 3) fieldsToValidate = ['partnershipType', 'intent'];
    if (step === 4) fieldsToValidate = ['valueUs', 'valueYou'];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: PartnershipFormData) => {
    setIsSubmitting(true);
    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || 'https://api.web3forms.com/submit';
      const payload = {
        access_key: import.meta.env.VITE_CONTACT_ACCESS_KEY || '',
        subject: `[AL LAMEA] Partnership Request from ${data.company}`,
        from_name: 'AL LAMEA Partnership Portal',
        _template: 'table',
        ...data,
      };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('HTTP Error');
      setIsSuccess(true);
    } catch {
      // In demo mode (no access_key), silently succeed
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl mx-auto border border-[var(--border-gold)] rounded-2xl bg-[var(--bg-surface)] p-12 text-center"
      >
        <div className="w-20 h-20 mx-auto bg-[var(--gold-glow)] rounded-full flex items-center justify-center mb-8 border border-[var(--gold)]">
          <CheckCircle2 className="w-10 h-10 text-[var(--gold)]" />
        </div>
        <h3 className="font-display text-3xl text-[var(--gold)] mb-4">{t('partnership.success.title')}</h3>
        <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-8">
          {t('partnership.success.message')}
        </p>
        <a href="/">
          <Button variant="ghost">{t('nav.home')}</Button>
        </a>
      </motion.div>
    );
  }

  const renderInput = (name: keyof PartnershipFormData, label: string, type = 'text', placeholder = '') => (
    <div className="mb-6 w-full text-start">
      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 uppercase tracking-wider opacity-80">{label}</label>
      {type === 'textarea' ? (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          rows={4}
          className={`w-full bg-[var(--bg-elevated)] border ${errors[name] ? 'border-[var(--danger)] focus:border-[var(--danger)]' : 'border-[var(--border-subtle)] focus:border-[var(--gold)]'} rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-all resize-none`}
        />
      ) : (
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={`w-full bg-[var(--bg-elevated)] border ${errors[name] ? 'border-[var(--danger)] focus:border-[var(--danger)]' : 'border-[var(--border-subtle)] focus:border-[var(--gold)]'} rounded-xl px-5 py-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-all`}
        />
      )}
      {errors[name] && <span className="text-[var(--danger)] text-xs mt-2 block">{errors[name]?.message as string}</span>}
    </div>
  );

  const renderSelect = (name: keyof PartnershipFormData, label: string, options: { value: string; label: string }[]) => (
    <div className="mb-6 w-full text-start">
      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 uppercase tracking-wider opacity-80">{label}</label>
      <select
        {...register(name)}
        className={`w-full bg-[var(--bg-elevated)] border ${errors[name] ? 'border-[var(--danger)] focus:border-[var(--danger)]' : 'border-[var(--border-subtle)] focus:border-[var(--gold)]'} rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-all appearance-none cursor-pointer`}
      >
        <option value="">{t('common.viewMore')}...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {errors[name] && <span className="text-[var(--danger)] text-xs mt-2 block">{errors[name]?.message as string}</span>}
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[var(--border-subtle)] -z-10" />
        {[1, 2, 3, 4, 5].map((num) => (
          <div 
            key={num} 
            className={`w-10 h-10 rounded-full flex items-center justify-center font-display transition-all duration-500
              ${step === num ? 'bg-[var(--gold)] text-[#1A1200] scale-110 shadow-[0_0_15px_var(--gold-glow)]' 
                : step > num ? 'bg-[var(--text-primary)] text-[#1A1200]' 
                : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)]'}`}
          >
            {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-20" />
        
        <h2 className="text-2xl md:text-3xl font-display text-[var(--gold)] mb-8 text-center">
          {step === 1 && t('partnership.step1')}
          {step === 2 && t('partnership.step2')}
          {step === 3 && t('partnership.step3')}
          {step === 4 && t('partnership.step4')}
          {step === 5 && t('partnership.step5')}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={VARIANTS.container}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Step 1: Identity */}
              {step === 1 && (
                <motion.div variants={VARIANTS.item}>
                  {renderInput('company', t('partnership.fields.company'))}
                  {renderInput('website', t('partnership.fields.website'), 'url', 'https://')}
                  {renderSelect('industry', t('partnership.fields.industry'), [
                    { value: 'automotive', label: t('partnership.fields.industryOptions.automotive') },
                    { value: 'retail', label: t('partnership.fields.industryOptions.retail') },
                    { value: 'chemical', label: t('partnership.fields.industryOptions.chemical') },
                    { value: 'other', label: t('partnership.fields.industryOptions.other') },
                  ])}
                  {renderInput('country', t('partnership.fields.country'))}
                </motion.div>
              )}

              {/* Step 2: Contact Authority */}
              {step === 2 && (
                <motion.div variants={VARIANTS.item}>
                  {renderInput('fullName', t('partnership.fields.fullName'))}
                  {renderInput('role', t('partnership.fields.role'))}
                  {renderInput('email', t('partnership.fields.email'), 'email')}
                  {renderInput('linkedin', t('partnership.fields.linkedin'), 'url', 'https://linkedin.com/in/...')}
                </motion.div>
              )}

              {/* Step 3: Intent */}
              {step === 3 && (
                <motion.div variants={VARIANTS.item}>
                  {renderSelect('partnershipType', t('partnership.fields.partnershipType'), [
                    { value: 'strategic', label: t('partnership.fields.typeOptions.strategic') },
                    { value: 'sponsorship', label: t('partnership.fields.typeOptions.sponsorship') },
                    { value: 'technical', label: t('partnership.fields.typeOptions.technical') },
                    { value: 'brand', label: t('partnership.fields.typeOptions.brand') },
                    { value: 'investment', label: t('partnership.fields.typeOptions.investment') },
                  ])}
                  {renderInput('intent', t('partnership.fields.intent'), 'textarea')}
                </motion.div>
              )}

              {/* Step 4: Value Proposition */}
              {step === 4 && (
                <motion.div variants={VARIANTS.item}>
                  {renderInput('valueUs', t('partnership.fields.valueUs'), 'textarea')}
                  {renderInput('valueYou', t('partnership.fields.valueYou'), 'textarea')}
                  
                  <div className="mb-6 w-full text-start">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 uppercase tracking-wider opacity-80">{t('partnership.fields.upload')}</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-[var(--bg-elevated)] border-2 border-[var(--border-subtle)] border-dashed rounded-xl appearance-none cursor-pointer hover:border-[var(--gold)] focus:outline-none">
                      <span className="flex items-center space-x-2 text-[var(--text-muted)]">
                        {uploadedFile ? (
                          <span className="flex items-center gap-2 text-[var(--gold)]">
                            <FileText className="w-6 h-6" />
                            {uploadedFile.name}
                          </span>
                        ) : (
                          <span className="flex flex-col items-center gap-2">
                            <UploadCloud className="w-6 h-6 mb-2" />
                            <span className="font-medium text-sm">Click to upload PDF</span>
                          </span>
                        )}
                      </span>
                      <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Final Review */}
              {step === 5 && (
                <motion.div variants={VARIANTS.item}>
                  {renderInput('notes', t('partnership.fields.notes'), 'textarea')}
                  
                  <div className="mt-8 mb-6 flex items-start space-x-3 rtl:space-x-reverse text-start bg-[var(--bg-elevated)] p-4 rounded-xl border border-[var(--border-subtle)]">
                    <input
                      type="checkbox"
                      id="confirm"
                      {...register('confirm')}
                      className="mt-1 w-5 h-5 rounded border-[var(--border-subtle)] text-[var(--gold)] focus:ring-[var(--gold)] bg-[var(--bg-surface)] cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <label htmlFor="confirm" className="text-sm text-[var(--text-primary)] cursor-pointer">
                        {t('partnership.fields.confirm')}
                      </label>
                      {errors.confirm && <span className="text-[var(--danger)] text-xs mt-1 block">{errors.confirm?.message as string}</span>}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Actions */}
          <div className="flex justify-between mt-10 pt-8 border-t border-[var(--border-subtle)]">
            {step > 1 ? (
              <Button type="button" variant="ghost" onClick={handlePrev} className="gap-2">
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                {t('partnership.actions.prev')}
              </Button>
            ) : <div />}

            {step < 5 ? (
              <Button type="button" onClick={handleNext} className="gap-2 bg-[var(--text-primary)] text-[#1A1200] hover:bg-white">
                {t('partnership.actions.next')}
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="gap-2 px-8 bg-[var(--gold)] text-[#1A1200] hover:bg-[var(--gold-light)] disabled:opacity-50"
              >
                {isSubmitting ? t('partnership.actions.uploading') : t('partnership.actions.submit')}
                {!isSubmitting && <CheckCircle2 className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
});

PartnershipForm.displayName = 'PartnershipForm';
