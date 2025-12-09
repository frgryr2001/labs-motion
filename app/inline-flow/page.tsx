'use client';
import { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { Ellipsis, X } from 'lucide-react';
import useMeasure from 'react-use-measure';

export default function InlineFlowPage() {
  const [isShowMore, setIsShowMore] = useState(false);
  const [ref, { width, height }] = useMeasure();

  console.log('width', width);

  return (
    <div className="flex justify-center items-center min-h-screen w-full font-sans">
      <motion.div
        layout
        className="bg-zinc-100 rounded-[50px] flex gap-3 p-3 font-semibold text-sm shadow-md"
      >
        <motion.div
          layout
          className="px-3 py-2 bg-white rounded-[50px] shadow-sm "
        >
          Save
        </motion.div>
        <motion.div
          layout
          className="px-3 py-2  bg-white rounded-[50px] shadow-sm "
        >
          Copy
        </motion.div>
        <div
          ref={ref}
          className=" items-center"
          style={{
            display: isShowMore ? 'flex' : 'none',
          }}
        >
          <AnimatePresence>
            {isShowMore && (
              <motion.div
                layout
                initial={{ width: 0, opacity: 0, filter: 'blur(10px)' }}
                animate={{ width: 'auto', opacity: 1, filter: 'blur(0px)' }}
                exit={{ width: 0, opacity: 0, filter: 'blur(10px)' }}
                style={{
                  transformOrigin: 'left center',
                }}
                key="extra-buttons-container"
                className="flex items-center gap-3"
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(10px)' }}
                  style={{
                    transformOrigin: 'center',
                  }}
                  className="px-3 py-2 bg-white rounded-[50px] shadow-sm whitespace-nowrap"
                >
                  <motion.span layout> Share</motion.span>
                </motion.div>
                <motion.div
                  layout
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(10px)' }}
                  style={{
                    transformOrigin: 'center',
                  }}
                  key="delete"
                  className="px-3 py-2 bg-white rounded-[50px] shadow-sm whitespace-nowrap"
                >
                  <motion.span layout>Delete</motion.span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          onClick={() => setIsShowMore(!isShowMore)}
          layout
          className="px-3 py-2 bg-white rounded-[50px] shadow-sm"
        >
          <Ellipsis />
        </motion.div>
      </motion.div>
    </div>
  );
}
