import { memo } from 'react';
import { cn } from '@/lib/utils';

interface LibyaFlagIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export const LibyaFlagIcon = memo(({ className, ...props }: LibyaFlagIconProps) => {
  return (
    <img 
      src="/libya-flag-icon-16.png" 
      alt="Libya Flag"
      className={cn("inline-block w-8 h-auto align-middle rounded-sm shadow-sm", className)} 
      {...props}
    />
  );
});

LibyaFlagIcon.displayName = 'LibyaFlagIcon';
