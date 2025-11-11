'use client';
import { DocsLayout } from '@/components/docs-layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <DocsLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center space-y-6 p-8">
          <h1 className="text-5xl font-bold">Framer Motion Examples</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A collection of interactive UI animations and examples built with Framer Motion, React, and Next.js
          </p>
          <div className="pt-4">
            <Link href="/ui-1">
              <Button size="lg">
                View Examples
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
