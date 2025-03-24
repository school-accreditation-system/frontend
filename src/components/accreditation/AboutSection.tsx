'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const BENEFITS = [
  'Enhanced reputation and credibility',
  'Improved quality of education',
  'Access to funding and resources',
  'Recognition of qualifications',
  'Continuous improvement culture',
];

export const AboutSection = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <Card className="p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Accreditation</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Accreditation is a voluntary, peer-review process that ensures educational institutions meet rigorous standards of quality and continuous improvement. It provides assurance to students, parents, and the public that an institution offers a high-quality education.
              </p>
              <Button asChild>
                <Link href="#">Learn More</Link>
              </Button>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">Benefits of Accreditation:</h3>
              <Separator className="mb-6" />
              <ul className="space-y-4">
                {BENEFITS.map((benefit, index) => (
                  <li key={index} className="flex items-center text-lg">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 26a12 12 0 1 1 12-12 12 12 0 0 1-12 12z"/>
                      <path fill="currentColor" d="M14 21.5l-5-5 1.41-1.41L14 18.67l7.59-7.59L23 12.5l-9 9z"/>
                    </svg>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}; 