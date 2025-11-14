'use client';

export function Header() {


  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">JohnnyUI</h1>
        <div className="flex items-center gap-4">
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button> */}
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
