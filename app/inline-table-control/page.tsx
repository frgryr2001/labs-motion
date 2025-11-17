'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
 BanknoteArrowDown,
 Edit,
 Layers,
 SquareArrowUpRight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';


function InlineTableControlPage() {
 const [list, setList] = useState<ListItem[]>(makeListData());
 const [selectedRow, setSelectedRow] = useState<ListItem | null>(null);
 const editFormRef = useRef<HTMLDivElement>(null);


 useOutSideClick(editFormRef, () => setSelectedRow(null));


 const handleSave = () => {
   if (selectedRow) {
     setList((prev) =>
       prev.map((item) => (item.id === selectedRow.id ? selectedRow : item))
     );
     setSelectedRow(null);
   }
 };


 return (
   <div className="flex justify-center items-center min-h-screen font-sans p-8">
     <div className="w-4xl max-w-4xl">
       {/* Table Container */}
       <div className="border border-gray-200 rounded-lg overflow-hidden">
         {/* Header */}
         <div className="grid grid-cols-[2fr_2fr_1.5fr_80px] gap-4 bg-gray-50 border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
           <div className="flex items-center gap-3">
             <BanknoteArrowDown size={16} />
             Expense
           </div>
           <div className="flex items-center gap-3">
             <Layers size={16} />
             Method
           </div>
           <div className="flex items-center gap-3">
             <SquareArrowUpRight size={16} />
             Amount
           </div>
           <div></div>
         </div>


         {/* Body */}
         <div className="divide-y divide-gray-200">
           <AnimatePresence initial={false}>
             {list.map((item) => {
               const isSelected = selectedRow?.id === item.id;
               const isAnyRowSelected = selectedRow !== null;
               const shouldReduceOpacity = !isSelected && isAnyRowSelected;


               return (
                 <motion.div
                   key={item.id}
                   layout="position"
                   initial={{ opacity: 0 }}
                   animate={{
                     opacity: shouldReduceOpacity ? 0.3 : 1
                   }}
                   exit={{ opacity: 0 }}
                   transition={{
                     layout: { type: 'spring', bounce: 0, duration: 0.5 },
                     opacity: { duration: 0.3 },
                   }}
                   className="bg-white"
                 >
                   {isSelected ? (
                     <DetailView
                       selectedRow={selectedRow}
                       setSelectedRow={setSelectedRow}
                       handleSave={handleSave}
                       editFormRef={editFormRef}
                     />
                   ) : (
                     <ViewMode item={item} setSelectedRow={setSelectedRow} />
                   )}
                 </motion.div>
               );
             })}
           </AnimatePresence>
         </div>
       </div>
     </div>
   </div>
 );
}


export default InlineTableControlPage;
const expenseData = [
 'Rent',
 'Utilities',
 'Groceries',
 'Transportation',
 'Entertainment',
];


const method = ['Credit Card', 'Debit Card', 'Cash', 'Bank Transfer', 'Cash'];


type ListItem = {
 id: string;
 expense: string;
 method: string;
 amount: string;
};


const makeListData = () => {
 return Array.from({ length: 5 }, (_, i) => ({
   id: nanoid(),
   expense: expenseData[i],
   method: method[i],
   amount: '$250.00',
 }));
};


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


interface DetailViewProps {
 selectedRow: ListItem | null;
 setSelectedRow: (row: ListItem | null) => void;
 handleSave: () => void;
 editFormRef: React.RefObject<HTMLDivElement | null>;
}


function DetailView({
 selectedRow,
 setSelectedRow,
 handleSave,
 editFormRef,
}: DetailViewProps) {
 const [focusedField, setFocusedField] = useState<
   'expense' | 'method' | 'amount' | null
 >(null);


 return (
   <motion.div ref={editFormRef} className="px-4 py-6">
     <div className="flex flex-col gap-4">
       {/* Expense Field */}
       <div className="flex items-center gap-6">
         <div className="flex items-center gap-2 w-32 text-sm font-medium text-gray-700">
           <BanknoteArrowDown size={16} />
           Expense
         </div>
         <div className="flex-1 relative">
           {focusedField !== 'expense' ? (
             <div className="group flex items-center gap-2">
               <motion.div
                 layoutId={`expense-${selectedRow?.id}`}
                 className="flex-1 flex gap-1"
               >
                 <motion.span className="block text-sm" layout>
                   {selectedRow?.expense}
                 </motion.span>
                 <button
                   onClick={() => setFocusedField('expense')}
                   className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                 >
                   <Edit size={14} className="text-gray-500" />
                 </button>
               </motion.div>
             </div>
           ) : (
             <Input
               autoFocus
               value={selectedRow?.expense || ''}
               onChange={(e) => {
                 if (selectedRow) {
                   setSelectedRow({
                     ...selectedRow,
                     expense: e.target.value,
                   });
                 }
               }}
               onBlur={() => setFocusedField(null)}
               className="w-full"
             />
           )}
         </div>
       </div>


       {/* Method Field */}
       <div className="flex items-center gap-6">
         <div className="flex items-center gap-2 w-32 text-sm font-medium text-gray-700">
           <Layers size={16} />
           Method
         </div>
         <div className="flex-1 relative">
           {focusedField !== 'method' ? (
             <div className="group flex items-center gap-2">
               <motion.div
                 layoutId={`method-${selectedRow?.id}`}
                 className="flex-1 flex gap-1"
               >
                 <motion.span className="block text-sm" layout>
                   {selectedRow?.method}
                 </motion.span>
                 <button
                   onClick={() => setFocusedField('method')}
                   className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                 >
                   <Edit size={14} className="text-gray-500" />
                 </button>
               </motion.div>
             </div>
           ) : (
             <Input
               autoFocus
               value={selectedRow?.method || ''}
               onChange={(e) => {
                 if (selectedRow) {
                   setSelectedRow({
                     ...selectedRow,
                     method: e.target.value,
                   });
                 }
               }}
               onBlur={() => setFocusedField(null)}
               className="w-full"
             />
           )}
         </div>
       </div>


       {/* Amount Field */}
       <div className="flex items-center gap-6">
         <div className="flex items-center gap-2 w-32 text-sm font-medium text-gray-700">
           <SquareArrowUpRight size={16} />
           Amount
         </div>
         <div className="flex-1 relative">
           {focusedField !== 'amount' ? (
             <div className="group flex items-center gap-2">
               <motion.div
                 layoutId={`amount-${selectedRow?.id}`}
                 className="flex-1 flex gap-1"
               >
                 <motion.span className="block text-sm" layout>
                   {selectedRow?.amount}
                 </motion.span>
                 <button
                   onClick={() => setFocusedField('amount')}
                   className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                 >
                   <Edit size={14} className="text-gray-500" />
                 </button>
               </motion.div>
             </div>
           ) : (
             <Input
               autoFocus
               value={selectedRow?.amount || ''}
               onChange={(e) => {
                 if (selectedRow) {
                   setSelectedRow({
                     ...selectedRow,
                     amount: e.target.value,
                   });
                 }
               }}
               onBlur={() => setFocusedField(null)}
               className="w-full"
             />
           )}
         </div>
       </div>


       {/* Action Buttons */}
       <div className="flex justify-end gap-2 mt-2">
         <Button
           variant="outline"
           size="sm"
           onClick={() => setSelectedRow(null)}
         >
           Cancel
         </Button>
         <Button size="sm" onClick={handleSave}>
           Save
         </Button>
       </div>
     </div>
   </motion.div>
 );
}


interface ViewModeProps {
 item: ListItem;
 setSelectedRow: (row: ListItem) => void;
}


function ViewMode({ item, setSelectedRow }: ViewModeProps) {
 return (
   <motion.div className="grid grid-cols-[2fr_2fr_1.5fr_80px] gap-4 px-4 py-4 items-center hover:bg-gray-50 transition-colors">
     <motion.div layoutId={`expense-${item.id}`} className=" text-gray-900">
       <motion.span layout className="block">
         {' '}
         {item.expense}
       </motion.span>
     </motion.div>
     <motion.div layoutId={`method-${item.id}`} className="text-gray-700">
       <motion.span layout className="block">
         {item.method}
       </motion.span>
     </motion.div>
     <motion.div className="text-gray-700" layoutId={`amount-${item.id}`}>
       <motion.span layout className="block">
         {item.amount}
       </motion.span>
     </motion.div>
     <div className="flex justify-end">
       <motion.button
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         className="hover:bg-gray-200 w-fit p-2 rounded transition-colors cursor-pointer"
         onClick={() => setSelectedRow(item)}
       >
         <Edit size={16} className="text-gray-600 hover:text-gray-900" />
       </motion.button>
     </div>
   </motion.div>
 );
}
