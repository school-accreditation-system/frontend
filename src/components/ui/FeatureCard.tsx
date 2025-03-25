'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { IconWrapper } from './IconWrapper';

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
  index = 0
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.2, 
        delay: index * 0.1, // Staggered animation based on index
        ease: "easeOut" 
      }}
    >
      <Card className={cn(
        "h-full flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-white",
        className
      )}>
        <CardHeader className="pb-0 pt-4 space-y-0 text-center">
          <motion.div 
            className="mx-auto"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <IconWrapper>{icon}</IconWrapper>
          </motion.div>
          <h3 className="text-xl font-semibold mt-1">{title}</h3>
        </CardHeader>
        
        <CardContent className="flex-grow py-1 px-4">
          <p className="text-muted-foreground text-center text-sm">{description}</p>
        </CardContent>
        
        {(actionLabel && (onClick || href)) && (
          <CardFooter className="pt-0 pb-4 flex justify-center">
            {href ? (
              <Button asChild className="bg-primary hover:bg-primary/90 hover:cursor-pointer transition-all duration-300">
                <Link href={href}>{actionLabel}</Link>
              </Button>
            ) : (
              <Button onClick={onClick} className="bg-primary hover:bg-primary/90 hover:cursor-pointer transition-all duration-300">
                {actionLabel}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}; 