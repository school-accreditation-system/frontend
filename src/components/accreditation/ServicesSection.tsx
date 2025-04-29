"use client";

import { ArrowRight, Award, Clock, HelpCircle } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    title: "Application Status",
    description:
      "Stay informed about your accreditation progress. Track your application status in real-time and receive timely updates on each step of the process.",
    icon: <Clock className="w-8 h-8 text-green-600" />,
    href: "/application-status",
    actionLabel: "Check Status",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    topColor: "bg-primary",
    hoverColor: "hover:text-green-700",
    linkColor: "text-green-600",
  },
  {
    title: "Verify Certificate",
    description:
      "Ensure the authenticity of accreditation certificates. Our verification system provides quick and reliable results with official digital validation.",
    icon: <Award className="w-8 h-8 text-purple-600" />,
    href: "/verify-certificate",
    actionLabel: "Verify Now",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    topColor: "bg-primary",
    hoverColor: "hover:text-purple-700",
    linkColor: "text-purple-600",
  },
  {
    title: "Submit a claim/feeback on this portal",
    description:
      "Share your experience with us. We value your feedback and are committed to improving our services. Submit a claim or feedback to help us serve you better.",
    icon: <HelpCircle className="w-8 h-8 text-primary" />,
    href: "/submit-claim",
    actionLabel: "Submit Claim",
    bgColor: "bg-blue-100",
    iconColor: "text-primary",
    topColor: "bg-primary",
    hoverColor: "hover:text-blue-700",
    linkColor: "text-blue-600",
  },
];

export const ServicesSection = () => {
  return (
    <section
      className="py-20 px-4 bg-gray-50 cursor-default flex flex-col gap-20"
      id="services"
    >
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-4xl font-bold text-primary">
          Verify school&apos;s accreditation
        </h2>
        <p className="text-gray-600 text-center text-xl">
          Access these tools to help manage your school&apos;s accreditation
          journey
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="flex flex-col h-full rounded-md overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg relative"
          >
            {/* Top color bar */}
            <div className={service.topColor + " h-2 w-full"}></div>

            {/* Card content */}
            <div className="bg-white p-8 h-full flex flex-col gap-5">
              <div
                className={`${service.bgColor} p-3 rounded-full inline-flex w-16 h-16 items-center justify-center`}
              >
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 font-normal text-base">
                {service.description}
              </p>
              <Link
                href={service.href}
                className={`inline-flex gap-2 group hover:gap-3 transition-all duration-300 ease-in-out items-center font-medium ${service.linkColor} ${service.hoverColor}`}
              >
                {service.actionLabel}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
