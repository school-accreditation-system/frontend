'use client';

import {
  ArrowRight,
  Award,
  Clock,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

const SERVICES = [
  {
    title: 'Application Status',
    description: 'Stay informed about your accreditation progress. Track your application status in real-time and receive timely updates on each step of the process.',
    icon: <Clock className="w-8 h-8 text-green-600" />,
    href: '/application-status',
    actionLabel: 'Check Status',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    topColor: 'bg-primary',
    hoverColor: 'hover:text-green-700',
    linkColor: 'text-green-600',
  },
  {
    title: 'Verify Certificate',
    description: 'Ensure the authenticity of accreditation certificates. Our verification system provides quick and reliable results with official digital validation.',
    icon: <Award className="w-8 h-8 text-purple-600" />,
    href: '/verify-certificate',
    actionLabel: 'Verify Now',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    topColor: 'bg-primary',
    hoverColor: 'hover:text-purple-700',
    linkColor: 'text-purple-600',
  },
  {
    title: 'Submit a claim for accreditation',
    description: 'Got an issue with your accreditation? Submit a claim and let us help you resolve it. Our team is here to assist you every step of the way.',
    icon: <HelpCircle className="w-8 h-8 text-primary" />,
    href: '/submit-claim',
    actionLabel: 'Submit Claim',
    bgColor: 'bg-blue-100',
    iconColor: 'text-primary',
    topColor: 'bg-primary',
    hoverColor: 'hover:text-blue-700',
    linkColor: 'text-blue-600',
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Verify school&apos;s accreditation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access these tools to help manage your school&apos;s accreditation journey
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="flex flex-col h-full rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg relative"
              >
                {/* Top color bar */}
                <div className={service.topColor + " h-2 w-full"}></div>

                {/* Card content */}
                <div className="flex-1 p-8 bg-white">
                  <div className={`${service.bgColor} p-3 rounded-full inline-flex mb-5 w-16 h-16 items-center justify-center`}>
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>

                  <Link
                    href={service.href}
                    className={`inline-flex items-center font-medium ${service.linkColor} ${service.hoverColor}`}
                  >
                    {service.actionLabel}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 