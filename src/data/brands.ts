// src/data/brands.ts
// ──────────────────────────────────────────────────────────────────
// Remplir ce tableau avec les données réelles des marques partenaires.
// Chaque brand ajouté ici s'affiche automatiquement dans BrandSection.
// ──────────────────────────────────────────────────────────────────

export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;          // Chemin: /brands/logo-brandname.png (dans /public)
  country: string;
  countryAR: string;
  description: string;
  descriptionAR: string;
  badge: string;             // Ex: "Official Libya Distributor"
  badgeAR: string;
  website?: string;
}

// ⬇️ Ajouter les marques ici — chaque objet = une card dans la grille
export const BRANDS: Brand[] = [
  // Exemple de structure (décommenter et remplir avec vraies données) :
  // {
  //   id: 'brand-001',
  //   name: 'BrandName',
  //   logoUrl: '/brands/brandname.png',
  //   country: 'Germany',
  //   countryAR: 'ألمانيا',
  //   description: 'Leader in premium automotive care solutions.',
  //   descriptionAR: 'رائد في حلول العناية بالسيارات المتميزة.',
  //   badge: 'Official Libya Distributor',
  //   badgeAR: 'الموزع الرسمي في ليبيا',
  //   website: 'https://brandname.com',
  // },
];
