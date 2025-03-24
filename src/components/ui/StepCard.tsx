'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

export const StepCard = ({
  number,
  title,
  description,
  className
}: StepCardProps) => {
  return (
    <Card className={cn("relative border-none shadow-none bg-transparent", className)}>
      <CardContent className="pl-0 pr-0 md:px-4 pt-0 pb-0 text-center">
        <div className="flex flex-col md:flex-col items-start md:items-center mb-2 md:mb-4">
          {/* Mobile layout: number on left, content on right */}
          <div className="flex md:block w-full">
            <motion.div 
              className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white rounded-full relative z-10 shadow-md mr-4 md:mr-0 md:mx-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="font-semibold">{number}</span>
            </motion.div>
            
            <div className="flex flex-col md:mt-4 md:text-center">
              <h3 className="text-lg font-semibold mb-1 md:mb-2 transition-transform group-hover:-translate-y-1 mt-2 md:mt-0">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground transition-transform md:text-center">
                {description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 