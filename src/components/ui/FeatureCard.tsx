"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { IconWrapper } from "./IconWrapper";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  actionLabel?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  index?: number; // For staggered animations
}

export const FeatureCard = ({
  title,
  description,
  icon,
  actionLabel,
  onClick,
  href,
  className,
  index = 0,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeInOut",
      }}
    >
      <Card
        className={cn(
          "h-full rounded-none flex flex-col cursor-default transition-all duration-300 hover:shadow-md border-0 shadow-none bg-blue-50/50 p-4 sm:py-12 sm:px-6",
          className || "bg-white"
        )}
      >
        <CardHeader className="text-center">
          <motion.div
            className="mx-auto"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <IconWrapper>{icon}</IconWrapper>
          </motion.div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 text-center text-base ">
            {description ||
              `Click here to apply for ${title?.toLocaleLowerCase()} and follow the steps to the end`}
          </p>
        </CardContent>

        {actionLabel && (onClick || href) && (
          <CardFooter className="flex justify-center items-center">
            {href ? (
              <Link
                href={href}
                className="bg-primary hover:bg-primary/90 font-medium text-white hover:cursor-pointer transition-all duration-300 rounded-md px-6 h-9 flex items-center justify-center"
              >
                {actionLabel}
              </Link>
            ) : (
              <Button
                onClick={onClick}
                className="transition-all duration-300 rounded-md px-6 shadow-sm hover:shadow-md"
              >
                {actionLabel}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};
