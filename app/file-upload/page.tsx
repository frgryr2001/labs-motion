'use client';

import { Button } from '@/components/ui/button';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useFileUpload } from '@/hooks/use-file-upload';
import { motion, AnimatePresence, type Variants, type Transition } from 'motion/react';
import useMeasure from 'react-use-measure';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

const DELAY = 10000;
const PADDING_X = 24;

const ButtonMotion = motion.create(Button);

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
  },
};

const contentTransitions = {
  visible: {
    type: 'tween' as const,
    ease: 'easeOut' as const,
    duration: 0.25,
    delay: 0.15,
  },
  hidden: {
    type: 'tween' as const,
    ease: 'easeIn' as const,
    duration: 0.15,
  },
};

const buttonTransition: Transition = {
  type: 'spring',
  bounce: 0.05,
  duration: 0.15,

};

export default function FileUpload() {
  const {
    state,
    isDragging,
    fileInputRef,
    handleChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useFileUpload(DELAY);

  const [ref, bounds] = useMeasure();

  return (
    <div className="flex justify-center items-center min-h-screen w-full font-sans">
      <div className="w-full max-w-md mx-auto p-6 flex justify-center">
        <ButtonMotion
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          disabled={state === 'loading'}
          variant={'outline'}
          className={isDragging ? 'opacity-70' : ''}
          animate={{
            width: bounds.width > 0 ? bounds.width + PADDING_X : undefined
          }}
          transition={buttonTransition}
          style={{ overflow: 'hidden' }}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleChange}
            disabled={state === 'loading'}
            className="hidden"
            accept="*"
          />
          <div ref={ref}>
            <AnimatePresence mode="popLayout" initial={false}>
              {state === 'idle' && (
                <motion.div
                  key="idle"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={contentTransitions}
                  layout
                >
                  <Upload className="size-5" />
                </motion.div>
              )}

              {state === 'loading' && (
                <motion.div
                  key="loading"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={contentTransitions}
                >
                  <div className="flex items-center gap-2">
                    <Loader2 className="size-5 animate-spin" />
                    <AnimatedShinyText className="whitespace-nowrap text-sm font-medium">
                      Uploading...
                    </AnimatedShinyText>
                  </div>
                </motion.div>
              )}

              {state === 'success' && (
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={contentTransitions}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 text-green-500" />
                    <span className="whitespace-nowrap">Upload Success</span>
                  </div>
                </motion.div>
              )}

              {state === 'error' && (
                <motion.div
                  key="error"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={contentTransitions}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="size-5 text-red-500" />
                    <span className="whitespace-nowrap">Upload Failed</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ButtonMotion>
      </div>
    </div>
  );
}
