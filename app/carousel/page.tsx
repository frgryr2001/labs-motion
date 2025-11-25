'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const images = [
  '/images/7.jpg',
  '/images/2.jpg',
  '/images/8.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
];

const collapsedAspectRatio = 1 / 3;
const expandedAspectRatio = 3 / 2;
const margin = 12;
const gap = 2;
export default function Page() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setIndex((index) => Math.min(index + 1, images.length - 1));
      }
      if (e.key === 'ArrowLeft') {
        setIndex((index) => Math.max(index - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <MotionConfig
      transition={{
        duration: 0.7,
        ease: [0.33, 0.72, 0, 1],
      }}
    >
      <div className="h-screen ">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden  ">
            <motion.div
              animate={{
                x: -index * 100 + '%',
              }}
              className="flex"
            >
              {images.map((image, i) => (
                <img
                  alt=""
                  key={i}
                  src={image}
                  className="object-cover aspect-video w-screen flex-shrink-0"
                />
              ))}
            </motion.div>
            <AnimatePresence>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition hover:bg-white/80"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition hover:bg-white/80"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-6 flex h-14 justify-center inset-x-0 overflow-x-hidden">
            <motion.div
              animate={{
                x: `-${
                  (index * 100 * collapsedAspectRatio) / expandedAspectRatio +
                  margin +
                  index * gap
                }%`,
              }}
              style={{
                aspectRatio: expandedAspectRatio,
                gap: `${gap}%`,
              }}
              className="flex"
            >
              {images.map((image, i) => {
                return (
                  <motion.button
                    onClick={() => setIndex(i)}
                    className={` flex-shrink-0`}
                    animate={i === index ? 'active' : 'inactive'}
                    variants={{
                      active: {
                        aspectRatio: expandedAspectRatio,
                        marginLeft: `${margin}%`,
                        marginRight: `${margin}%`,
                        opacity: 1,
                      },
                      inactive: {
                        aspectRatio: collapsedAspectRatio,
                        marginLeft: 0,
                        marginRight: 0,
                        opacity: 0.5,
                      },
                    }}
                    key={image}
                  >
                    <img
                      src={image}
                      className="aspect-[3/2] h-full object-cover"
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}