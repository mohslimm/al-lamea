export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading'; message?: string }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string; retry?: () => void }
  | { status: 'empty'; cta?: string };

export interface Brand {
  id: string;
  name: string;
  description: string;
  productsInLibya: string;
  logoUrl?: string; // Optional if using placeholder
}

export interface NewsItem {
  id: string;
  category: string;
  categoryAR: string;
  title: string;
  titleAR: string;
  excerpt: string;
  excerptAR: string;
  date: string;
  status: 'published' | 'coming-soon';
}
