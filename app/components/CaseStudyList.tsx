'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const caseStudies = [
  {
    id: 1,
    title: 'Brand Revamp for Nova',
    description: 'A complete identity redesign for a tech startup focused on sustainability.',
    imageUrl: '/images/casestudy.webp',
    slug: 'nova-brand-revamp',
    tags: ['Branding', 'Sustainability'],
  },
  {
    id: 2,
    title: 'UI Overhaul for Finch App',
    description: 'We redesigned the mobile app to improve engagement and user flow.',
    imageUrl: '/images/casestudy.webp',
    slug: 'finch-ui-redesign',
    tags: ['UI/UX', 'Mobile'],
  },
  {
  id: 3,
    title: 'Brand Revamp for Nova',
    description: 'A complete identity redesign for a tech startup focused on sustainability.',
    imageUrl: '/images/casestudy.webp',
    slug: 'nova-brand-revamp',
    tags: ['Branding', 'Sustainability'],
  },
  {
    id: 4,
    title: 'UI Overhaul for Finch App',
    description: 'We redesigned the mobile app to improve engagement and user flow.',
    imageUrl: '/images/casestudy.webp',
    slug: 'finch-ui-redesign',
    tags: ['UI/UX', 'Mobile'],
  },
  {
  id: 5,
    title: 'Brand Revamp for Nova',
    description: 'A complete identity redesign for a tech startup focused on sustainability.',
    imageUrl: '/images/casestudy.webp',
    slug: 'nova-brand-revamp',
    tags: ['Branding', 'Sustainability'],
  },
  {
    id: 6,
    title: 'UI Overhaul for Finch App',
    description: 'We redesigned the mobile app to improve engagement and user flow.',
    imageUrl: '/images/casestudy.webp',
    slug: 'finch-ui-redesign',
    tags: ['UI/UX', 'Mobile'],
  },
  // Add more case studies as needed
];

export default function CaseStudyList() {
  return (
    <section className="py-20 bg-light ba-casestudylist">
      <div className="ba-container">
        <h2 className="text-3xl font-light color-primary mb-8">Case Studies</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs, index) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white"
            >
              <Link href={`/case-studies/${cs.slug}`}>
                <div className="overflow-hidden">
                  <figure>
                  <Image
                    src={cs.imageUrl}
                    alt={cs.title}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  </figure>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-light color-primary mb-2">{cs.title}</h3>
                  <p className="text-sm color-black mb-3">{cs.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <footer className='pb-4 pt-10 text-center'>
          <Link href="#" className="inline-flex items-center gap-3 arrow-btn-border-black">
                Read More <img src="/arrow_right_white.svg" alt="arrow" />
              </Link>
        </footer>
      </div>
    </section>
  );
}
