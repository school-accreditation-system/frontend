import { Badge } from "@/components/ui/badge";
import { ArrowRight, BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SchoolCardProps {
  school: any;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  // Calculate accreditation score color

  // Generate a placeholder image if school doesn't have one
  const schoolImage = school.image || `/nesa-logo.png`;

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-sm transition-shadow border border-gray-200 cursor-default">
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between gap-2">
          <div className="flex items-start gap-4">
            {/* School Image */}
            <div className="w-14 h-14 rounded-full relative overflow-hidden flex-shrink-0">
              <Image
                src={schoolImage}
                alt={school.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            {/* School Name & Location*/}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {school.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="line-clamp-1">
                  {school.district}, {school.province || "Rwanda"}
                </span>
              </div>
            </div>
          </div>
          <BadgeCheck className="h-6 w-6 text-green-500" />
        </div>

        {/* Location & Date */}
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-gray-900 line-clamp-1">
            Contact Info
          </p>
          <div className="flex items-center flex-wrap gap-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Mail className="h-4 w-4 text-amber-500" />
              <span className="line-clamp-1">schoolmail@gmail.com</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Phone className="h-4 w-4 text-primary" />
              <span className="line-clamp-1">+250781234567</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-gray-900 line-clamp-1">
            Accredited Combinations
          </p>
          <div className="flex flex-wrap gap-2">
            {school.combinations?.slice(0, 5).map((combination, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-50 text-primary hover:bg-blue-100"
              >
                {combination.name}
              </Badge>
            ))}

            {school.combinations?.length > 5 && (
              <Badge variant="outline" className="bg-gray-50 text-gray-500">
                +{school.combinations.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <Link
        href={`/accredited-schools/${school.id}`}
        className="text-primary text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all ease-in-out duration-300 border-t bg-blue-50 border-gray-100  p-3 w-full"
      >
        View Details
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
