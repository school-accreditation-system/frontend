"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BENEFITS = [
  "Enhanced reputation and credibility",
  "Improved quality of education",
  // 'Access to funding and resources',
  "Recognition of qualifications",
  "Continuous improvement culture",
];

export const AboutSection = () => {
  return (
    <section className="py-4 px-4 bg-gradient-to-r from-primary to-secondary cursor-default">
      <Card className="p-8 shadow-xs rounded-md max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">About Accreditation</h2>
            <p className="text-lg text-gray-600">
              Accreditation is a compulsory process that ensures educational
              institutions meet rigorous standards of quality and continuous
              improvement. It provides assurance to students, parents, and the
              public that an institution offers a high-quality education and it
              is recognized by the National Examination and School Inspection
              Authority.
            </p>
            <Link
              href="#"
              className="border bg-primary text-white px-6 py-2 rounded-md w-fit font-medium hover:bg-primary/90"
            >
              Learn More
            </Link>
          </div>

          <div className="flex flex-col gap-3 self-start">
            <h3 className="text-2xl font-bold">Benefits of Accreditation:</h3>
            <Separator />
            <ul className="flex flex-col gap-2">
              {BENEFITS.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-lg">
                  <svg
                    className="w-5 h-5 text-primary flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 26a12 12 0 1 1 12-12 12 12 0 0 1-12 12z"
                    />
                    <path
                      fill="currentColor"
                      d="M14 21.5l-5-5 1.41-1.41L14 18.67l7.59-7.59L23 12.5l-9 9z"
                    />
                  </svg>
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
};
