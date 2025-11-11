'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme
    const htmlElement = document.documentElement;
    setIsDark(htmlElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      setIsDark(false);
    } else {
      htmlElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">Framer Motion Learning</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <a
            href="https://github.com/frgryr2001/labs-motion"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
