// src/data/news.ts
// ──────────────────────────────────────────────────────────────────
// Remplir ce tableau avec les vrais articles de news d'AL LAMEA.
// 2-3 articles minimum recommandés pour le launch.
// ──────────────────────────────────────────────────────────────────

export interface NewsItem {
  id: string;
  category: string;
  categoryAR: string;
  categoryColor: 'gold' | 'blue' | 'green';
  title: string;
  titleAR: string;
  excerpt: string;
  excerptAR: string;
  date: string;       // Format: "June 2025"
  dateAR: string;     // Format: "يونيو 2025"
  slug?: string;      // Pour futur routing: /news/[slug]
}

// ⬇️ Ajouter les articles ici — chaque objet = une card dans la grille
export const NEWS: NewsItem[] = [
  // Exemple de structure (décommenter et remplir avec vraies données) :
  // {
  //   id: 'news-001',
  //   category: 'Expansion',
  //   categoryAR: 'توسع',
  //   categoryColor: 'gold',
  //   title: 'AL LAMEA Expands Distribution Network Across Libya',
  //   titleAR: 'اللامع تتوسع في شبكة التوزيع عبر ليبيا',
  //   excerpt: 'We are proud to announce the expansion of our distribution network to new regions...',
  //   excerptAR: 'يسعدنا الإعلان عن توسع شبكة توزيعنا إلى مناطق جديدة...',
  //   date: 'June 2025',
  //   dateAR: 'يونيو 2025',
  //   slug: 'al-lamea-expands-distribution',
  // },
];
