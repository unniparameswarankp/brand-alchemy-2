'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const caseStudies = [
  {
    id: 1,
    title: 'Branding',
    description: 'Crafting identities that resonate, inspire, and stand the test of time.',
    imageUrl: '/images/service.jpeg',
    slug: 'nova-brand-revamp',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'Designing intuitive, human-centered experiences that spark engagement and delight.',
    imageUrl: '/images/service.jpeg',
    slug: 'finch-ui-redesign',
  },
  {
  id: 3,
    title: 'Web App Development',
    description: 'Building fast, scalable, and future-ready web applications that power your digital growth.',
    imageUrl: '/images/service.jpeg',
    slug: 'nova-brand-revamp',
  },
  {
    id: 4,
    title: 'Mobile App Development',
    description: 'Delivering sleek, high-performance mobile apps tailored for real-world impact.',
    imageUrl: '/images/service.jpeg',
    slug: 'finch-ui-redesign',
  },
  {
  id: 5,
    title: 'DevOps Consulting',
    description: 'Optimizing your development workflow with seamless automation, scalability, and reliability.',
    imageUrl: '/images/service.jpeg',
    slug: 'nova-brand-revamp',
  },
  {
    id: 6,
    title: 'E-commerce',
    description: 'Creating conversion-driven online stores that elevate your brand and boost sales.',
    imageUrl: '/images/service.jpeg',
    slug: 'finch-ui-redesign',
  },
  // Add more case studies as needed
];

export default function ServiceList() {
  return (
    <section className="py-20 bg-light ba-service-list">
      <div className="ba-container">
        <h2 className="text-3xl font-light color-primary mb-8">Our Services</h2>
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
              <div>
                <div className="overflow-hidden">
                  <figure>
                  <Image
                    src={cs.imageUrl}
                    alt={cs.title}
                    width={600}
                    height={400}
                    className="w-full h-50 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  </figure>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light color-primary mb-2">{cs.title}</h3>
                  <p className="text-sm color-black mb-3">{cs.description}</p>
                  <Link href="#" className="inline-flex items-center gap-3 arrow-btn-black">
                    Read More <img src="/arrow_right_white.svg" alt="arrow" />
                  </Link>
                </div>
              </div>
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
