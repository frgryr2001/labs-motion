'use client';
import { Loader } from 'lucide-react';
import {
 AnimatePresence,
 motion,
 MotionConfig,
 Transition,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';


const transition: Transition = {
 type: 'spring',
 bounce: 0,
 duration: 0.5,
};
export default function FeedbackPage() {
 const [isOpen, setIsOpen] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);
 const ref = useRef<HTMLDivElement>(null);
 useOutSideClick(ref, () => setIsOpen(false));


 useEffect(() => {
   if (isSuccess) {
     const timer = setTimeout(() => {
       setIsSuccess(false);
       setIsOpen(false);
     }, 2000);
     return () => clearTimeout(timer);
   }
 }, [isSuccess]);


 return (
   <div className='flex justify-center items-center min-h-screen w-full  font-sans'>
     <MotionConfig transition={transition}>
       <AnimatePresence >
         {isOpen ? (
           <motion.div
             layoutId="container"
             style={{ borderRadius: 12 }}
             ref={ref}
             className="p-1  border overflow-hidden border-[#E6E7E8] bg-white w-[300px]"
           >
             <motion.span
               layoutId="feedback-label"
               className="text-sm font-medium  p-1"


             >
               Feedback
             </motion.span>
             <form
               className="rounded-lg border overflow-hidden border-[#E6E7E8] bg-white"
               onSubmit={(e) => {
                 e.preventDefault();
                 setIsLoading(true);
                 delay(2000).then(() => {
                   setIsLoading(false);
                   setIsSuccess(true);
                 });
               }}
             >
               <textarea
                 required
                 autoFocus={isOpen}
                 className="hidden h-32 w-full resize-none rounded-t-lg bg-white p-3 text-sm text-black !outline-none md:block"
               ></textarea>


               <div className="relative flex h-12 items-center px-2.5">
                 <svg
                   className="absolute left-0 right-0 top-[-1px]"
                   width="352"
                   height="2"
                   viewBox="0 0 352 2"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     d="M0 1H352"
                     stroke="#E6E7E8"
                     strokeDasharray="4 4"
                   ></path>
                 </svg>
                 <div className="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2 rounded-full">
                   <svg
                     width="6"
                     height="12"
                     viewBox="0 0 6 12"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <g clipPath="url(#clip0_2029_22)">
                       <path
                         d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
                         fill="#F5F6F7"
                       ></path>
                       <path
                         d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
                         stroke="#E6E7E8"
                         strokeWidth="1"
                         strokeLinejoin="round"
                       ></path>
                     </g>
                     <defs>
                       <clipPath id="clip0_2029_22">
                         <rect width="6" height="12" fill="white"></rect>
                       </clipPath>
                     </defs>
                   </svg>
                 </div>
                 <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-[1.5px] rotate-180 rounded-full">
                   <svg
                     width="6"
                     height="12"
                     viewBox="0 0 6 12"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <g clipPath="url(#clip0_2029_22)">
                       <path
                         d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
                         fill="#F5F6F7"
                       ></path>
                       <path
                         d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
                         stroke="#E6E7E8"
                         strokeWidth="1"
                         strokeLinejoin="round"
                       ></path>
                     </g>
                     <defs>
                       <clipPath id="clip0_2029_22">
                         <rect width="6" height="12" fill="white"></rect>
                       </clipPath>
                     </defs>
                   </svg>
                 </div>
                 <motion.button


                   type="submit"
                   className="smooth-button bg-blue-500 ml-auto flex !h-6 !w-[104px] items-center justify-center !rounded-md !px-2 !text-xs"
                 >
                   <span className="opacity-100 transform text-white">
                     <span>
                       <AnimatePresence mode="popLayout">
                         {isLoading ? (
                           <motion.div
                             key={'loading'}
                             exit={{
                               opacity: 0,
                               y: -20,
                               filter: 'blur(10px)',
                             }}
                           >
                             <Loader size={12} className="animate-spin" />
                           </motion.div>
                         ) : isSuccess ? (
                           <motion.span
                             key={'sent'}
                             initial={{
                               opacity: 0,
                               y: 20,
                               filter: 'blur(10px)',
                             }}
                             animate={{
                               opacity: 1,
                               y: 0,
                               filter: 'blur(0px)',
                             }}
                             transition={{ duration: 0.5 }}
                           >
                             Sent!
                           </motion.span>
                         ) : (
                           <span> Send feedback</span>
                         )}
                       </AnimatePresence>
                     </span>
                   </span>
                 </motion.button>
               </div>
             </form>
           </motion.div>
         ) : (
           <motion.button
             layoutId="container"
             onClick={() => setIsOpen(true)}
             style={{
               borderRadius: '8px',
             }}
             layout
             className="relative flex h-9 items-center rounded-lg border border-[#E6E7E8] bg-white px-3 cursor-pointer hover:bg-white/10 font-medium outline-none focus-visible:shadow-focus-ring-button"
           >
             <motion.span
               layoutId="feedback-label"
               className="block text-sm relative"
             >
               Feedback
             </motion.span>
           </motion.button>
         )}
       </AnimatePresence>
     </MotionConfig>
   </div>
 );
}


function delay(ms: number) {
 return new Promise((resolve) => setTimeout(resolve, ms));
}


function useOutSideClick(
 ref: React.RefObject<HTMLDivElement | null>,
 callback: () => void
) {
 useEffect(() => {
   function handleClickOutside(event: MouseEvent) {
     if (ref.current && !ref.current.contains(event.target as Node)) {
       callback();
     }
   }
   document.addEventListener('mousedown', handleClickOutside);
   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, [ref, callback]);
}
