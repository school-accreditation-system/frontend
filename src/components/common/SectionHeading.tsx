'use client';

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export const SectionHeading = ({
  title,
  description,
  className = ''
}: SectionHeadingProps) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
    </div>
  );
}; 