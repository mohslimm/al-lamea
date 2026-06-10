import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { getPartnershipSchema } from './PartnershipForm.types';
import type { PartnershipFormData, UsePartnershipFormReturn } from './PartnershipForm.types';

export const usePartnershipForm = (): UsePartnershipFormReturn => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Mémorisation du schéma de validation (Correction de performance)
  const schema = useMemo(() => getPartnershipSchema(t), [t]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<PartnershipFormData>({
    resolver: zodResolver(schema),
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

  const [isError, setIsError] = useState(false);

  const submitForm = async (data: PartnershipFormData) => {
    setIsSubmitting(true);
    setIsError(false);
    
    // SOP 13: Utilisation d'un AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout
    
    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || 'https://api.web3forms.com/submit';
      
      const formData = new FormData();
      formData.append('access_key', import.meta.env.VITE_CONTACT_ACCESS_KEY || '');
      formData.append('subject', `[AL LAMEA] Partnership Request from ${data.company}`);
      formData.append('from_name', 'AL LAMEA Partnership Portal');
      
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      
      if (uploadedFile) {
        formData.append('attachment', uploadedFile);
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      
      if (!res.ok) throw new Error('HTTP Error');
      setIsSuccess(true);
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.error('[Network] Request timed out');
      }
      setIsError(true);
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        alert(t('partnership.validation.invalidType', 'Seuls les fichiers PDF sont acceptés.'));
        e.target.value = '';
        return;
      }
      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        alert(t('partnership.validation.invalidSize', 'Le fichier est trop lourd (Max 5MB).'));
        e.target.value = '';
        return;
      }
      setUploadedFile(file);
    }
  };

  return {
    step,
    isSubmitting,
    isSuccess,
    isError,
    uploadedFile,
    register,
    errors,
    handleNext,
    handlePrev,
    onSubmit: handleSubmit(submitForm),
    handleFileUpload
  };
};
