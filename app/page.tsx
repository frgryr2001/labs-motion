'use client';
import { DocsLayout } from '@/components/docs-layout';
import { Highlighter } from '@/components/ui/highlighter';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { LightRays } from '@/components/ui/light-rays';
import { PixelImage } from '@/components/ui/pixel-image';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <DocsLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative gap-10 ">
        <LightRays />
       <div className='flex gap-4 items-center'>
         <PixelImage src="/images/avatar.jpg" grid="8x8" />
        <div className="max-w-2xl text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Hi, I&lsquo;m{' '}
            <Highlighter action="underline" color="#FF9800">
              Johnny
            </Highlighter>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-loose text-balance">
            Welcome to my{' '}
            <Highlighter action="highlight" color="#87CEFA">
              Framer Motion
            </Highlighter>{' '}
            learning journey. This website is where I explore and showcase{' '}
            <Highlighter action="highlight" color="#90EE90">
              animations and interactions
            </Highlighter>{' '}
            built with React and Framer Motion.
          </p>
          <InteractiveHoverButton>
            <Link href="/transaction-list-animation">
              Let&lsquo;s Get Started
            </Link>
          </InteractiveHoverButton>
        </div>
       </div>
        <div className="max-w-7xl relative overflow-hidden  py-4">
          <InfiniteSlider  speed={50} speedOnHover={20} gap={24}>
            <Image
              src="/images/6.jpg"
              alt="Dean blunt - Black Metal 2"
              className="aspect-square w-[120px] rounded-[4px]"
              width={120}
              height={120}
            />
            <Image
              src="/images/7.jpg"
              alt="Jungle Jack - JUNGLE DES ILLUSIONS VOL 2"
              className="aspect-square w-[120px] rounded-[4px]"
              width={120}
              height={120}
            />
            <Image
              src="/images/8.jpg"
              alt="Yung Lean - Stardust"
              className="aspect-square w-[120px] rounded-[4px]"
              width={120}
              height={120}
            />
            <Image
              src="/images/9.jpg"
              alt="Lana Del Rey - Ultraviolence"
              className="aspect-square w-[120px] rounded-[4px]"
              width={120}
              height={120}
            />
            <Image
              src="https://i.scdn.co/image/ab67616d00001e020dcf0f3680cff56fe5ff2288"
              alt="A$AP Rocky - Tailor Swif"
              className="aspect-square w-[120px] rounded-[4px]"
              width={120}
              height={120}
            />
            <Image
              src="https://i.scdn.co/image/ab67616d00001e02bc1028b7e9cd2b17c770a520"
              alt="Midnight Miami (feat Konvy) - Nino Paid, Konvy"
              className="aspect-square w-[120px] rounded-[4px]"
              width={120}
              height={120}
            />
            <Image
              src="/images/1.jpg"
              alt="Lana Del Rey - Ultraviolence"
              className="aspect-square w-[120px] rounded-[4px]"
              width={120}
              height={120}
            />
            <Image
              src="/images/2.jpg"
              alt="Lana Del Rey - Ultraviolence"
              className="aspect-square w-[120px] rounded-[4px]"
              width={120}
              height={120}
            />
            <Image
              src="/images/3.jpg"
              alt="Lana Del Rey - Ultraviolence"
              className="aspect-square w-[120px] rounded-[4px]"
              width={120}
              height={120}
            />
          </InfiniteSlider>
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
            direction="right"
            blurIntensity={1}
          />
        </div>
      </div>
    </DocsLayout>
  );
}
