import React from 'react';
import Link from 'next/link';

interface CustomLinkProps {
  text: string;
  href: string;
}

// Function component
function CustomLink({ text, href }: CustomLinkProps) {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
      <Link
        href={href}
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        {text}
      </Link>
    </div>
  );
}

export default CustomLink;