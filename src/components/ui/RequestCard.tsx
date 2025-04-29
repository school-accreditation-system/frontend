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

interface RequestCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  actionLabel?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  index?: number; // For staggered animations
}

export const RequestCard = ({
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
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.3,
        delay: index * 0.1, // Staggered animation based on index
        ease: "easeOut",
      }}
      whileHover={{ y: -5 }}
    >
      <Card
        className={cn(
          "h-full flex flex-col transition-all duration-300 hover:shadow-lg border",
          className || "bg-white"
        )}
      >
        <CardHeader className="pb-0 pt-6 space-y-0 text-center">
          <motion.div
            className="mx-auto"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <IconWrapper>{icon}</IconWrapper>
          </motion.div>
          <h3 className="text-xl font-semibold mt-3">{title}</h3>
        </CardHeader>

        <CardContent className="flex-grow py-2 px-5">
          <p className="text-muted-foreground text-center text-base">
            {description ||
              `Click here to apply for ${title?.toLocaleLowerCase()} and follow the steps to the end`}
          </p>
        </CardContent>

        {actionLabel && (onClick || href) && (
          <CardFooter className="pt-2 pb-6 flex justify-center">
            {href ? (
              <Button
                asChild
                className="bg-primary hover:hover:bg-primary/90 hover:cursor-pointer transition-all duration-300 rounded-full px-6"
              >
                <Link href={href}>{actionLabel}</Link>
              </Button>
            ) : (
              <Button
                onClick={onClick}
                className="bg-primary hover:hover:bg-primary/90 hover:cursor-pointer transition-all duration-300 rounded-full px-6 shadow-sm hover:shadow-md"
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
