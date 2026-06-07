import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../lib/variants';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies' | 'legal';
}

export const LegalPage = memo(({ type }: LegalPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      date: 'Last updated: June 2026',
      content: [
        {
          heading: '1. Introduction',
          text: 'AL TARIQ AL LAMEA GROUP respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.'
        },
        {
          heading: '2. The Data We Collect About You',
          text: 'We may collect, use, store and transfer different kinds of personal data about you including: Identity Data, Contact Data, Technical Data, Usage Data, and Marketing and Communications Data.'
        },
        {
          heading: '3. How We Use Your Personal Data',
          text: 'We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you, or where it is necessary for our legitimate interests.'
        },
        {
          heading: '4. Data Security',
          text: 'We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.'
        }
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      date: 'Last updated: June 2026',
      content: [
        {
          heading: '1. Agreement to Terms',
          text: 'By accessing our website, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws.'
        },
        {
          heading: '2. Use License',
          text: 'Permission is granted to temporarily download one copy of the materials on AL TARIQ AL LAMEA GROUP\'s website for personal, non-commercial transitory viewing only.'
        },
        {
          heading: '3. Disclaimer',
          text: 'All the materials on AL TARIQ AL LAMEA GROUP\'s website are provided "as is". AL TARIQ AL LAMEA GROUP makes no warranties, may it be expressed or implied, therefore negates all other warranties.'
        }
      ]
    },
    cookies: {
      title: 'Cookie Policy',
      date: 'Last updated: June 2026',
      content: [
        {
          heading: '1. What Are Cookies',
          text: 'As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.'
        },
        {
          heading: '2. How We Use Cookies',
          text: 'We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.'
        },
        {
          heading: '3. Disabling Cookies',
          text: 'You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.'
        }
      ]
    },
    legal: {
      title: 'Legal Notice / Mentions Légales',
      date: 'Last updated: June 2026',
      content: [
        {
          heading: '1. Company Information',
          text: 'AL TARIQ AL LAMEA GROUP\nHeadquarters: Tripoli, Libya\nEmail: info@al-lamea.com\nPhone: 0948600012'
        },
        {
          heading: '2. Intellectual Property',
          text: 'The website and its original content, features, and functionality are owned by AL TARIQ AL LAMEA GROUP and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.'
        }
      ]
    }
  };

  const data = contentMap[type];

  return (
    <main className="min-h-screen pt-[120px] pb-24 bg-[var(--bg-void)]">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-display text-[var(--gold-500)] mb-4">{data.title}</h1>
          <p className="text-[var(--text-muted)] mb-12 border-b border-[var(--border-subtle)] pb-8">{data.date}</p>

          <div className="space-y-12">
            {data.content.map((section, idx) => (
              <div key={idx} className="prose prose-invert prose-gold max-w-none">
                <h2 className="text-2xl font-display text-[var(--text-primary)] mb-4">{section.heading}</h2>
                <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">{section.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
});

LegalPage.displayName = 'LegalPage';
