import { z } from 'zod';
import type { TFunction } from 'i18next';

export const getPartnershipSchema = (t: TFunction) => z.object({
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

// We need a base schema for the type inference (without translations)
export const basePartnershipSchema = z.object({
  company: z.string(),
  website: z.string(),
  industry: z.string(),
  country: z.string(),
  fullName: z.string(),
  role: z.string(),
  email: z.string(),
  linkedin: z.string().optional(),
  partnershipType: z.string(),
  intent: z.string(),
  valueUs: z.string(),
  valueYou: z.string(),
  notes: z.string().optional(),
  confirm: z.boolean()
});

export type PartnershipFormData = z.infer<typeof basePartnershipSchema>;

export interface UsePartnershipFormReturn {
  step: number;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  uploadedFile: File | null;
  register: any;
  errors: any;
  handleNext: () => Promise<void>;
  handlePrev: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
