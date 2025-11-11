'use client';
import { DocsLayout } from '@/components/docs-layout';
import { Plus, Sparkles } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import NumberFlow from '@number-flow/react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { AnimatePresence, motion } from 'motion/react';
import useMeasure from 'react-use-measure';
const MotionNumberFlow = motion.create(NumberFlow);

export default function TransactionListAnimationPage() {
  const [ref, { height }] = useMeasure();
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: nanoid(), ...transactionsData[0] },
  ]);

  const addTransaction = () => {
    const randomIndex = Math.floor(Math.random() * transactionsData.length);
    const newTransaction = {
      id: nanoid(),
      ...transactionsData[randomIndex],
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const removeTransaction = (id: string) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  const totalBalance = useMemo(() => {
    return transactions.reduce(
      (total, transaction) => total + transaction.cost,
      0
    );
  }, [transactions]);

  const startTransactionTour = useCallback(() => {
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      steps: [
        {
          element: '#balance-section',
          popover: {
            title: '💰 Balance Overview',
            description:
              'Watch your balance update in real-time with smooth number animations as you add or remove transactions.',
            side: 'bottom',
            align: 'center',
          },
        },
        {
          element: '#balance-amount',
          popover: {
            title: '🔢 Animated Balance Counter',
            description:
              'This uses @number-flow/react for smooth currency transitions. Notice how it animates when transactions change!',
            side: 'bottom',
            align: 'center',
          },
        },
        {
          element: '#transactions-header',
          popover: {
            title: '📋 Transaction Management',
            description:
              'Add new transactions with the + button. Each transaction animates in with blur and slide effects.',
            side: 'bottom',
            align: 'center',
          },
        },
        {
          element: '#add-transaction-btn',
          popover: {
            title: '➕ Add Transaction',
            description:
              'Click here to add a random transaction. Watch the smooth entrance animation with blur effect!',
            side: 'left',
            align: 'center',
          },
        },
        {
          element: '#transaction-list',
          popover: {
            title: '✨ Animated Transaction List',
            description:
              'This list uses AnimatePresence for smooth enter/exit animations. Click any transaction to remove it and see the exit animation.',
            side: 'top',
            align: 'center',
          },
        },
        {
          popover: {
            title: '🎉 Tour Complete!',
            description:
              "You've learned about transaction animations! Try adding and removing transactions to see all the smooth Framer Motion effects in action.",
          },
        },
      ],
    });

    driverObj.drive();
  }, []);

  return (
    <DocsLayout>
      <div className="p-8">
        <div className="mb-8">
          <button
            onClick={startTransactionTour}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Start Interactive Tour
          </button>
        </div>
        <div className="flex items-center justify-center">
          <main className="flex  w-full max-w-xl rounded-2xl flex-col items-center shadow-xs py-16 px-16 bg-white dark:bg-zinc-900 sm:items-start gap-10">
            <div
              className="flex items-center justify-between w-full"
              id="balance-section"
            >
              <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                Balance
              </h1>
              <div className="self-center" id="balance-amount">
                <MotionNumberFlow
                  value={totalBalance}
                  className="font-semibold text-4xl mt-2"
                  format={{
                    style: 'currency',
                    currency: 'USD',
                    trailingZeroDisplay: 'stripIfInteger',
                  }}
                  // Important, see note below:
                  layout
                  layoutRoot
                />
              </div>
            </div>

            <div
              className="flex justify-between items-center w-full"
              id="transactions-header"
            >
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-xl">
                Transactions
              </h3>
              <button onClick={addTransaction} id="add-transaction-btn">
                <Plus className=" h-10 w-10 rounded-xl border border-zinc-200 bg-white p-2  shadow-sm hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700" />
              </button>
            </div>

            <div className="w-full " id="transaction-list">
              <motion.ul
                animate={{ height: height > 0 ? height : undefined }}
                transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
                // style={{ overflow: 'hidden', position: 'relative' }}
                layout
              >
                <div ref={ref} className="space-y-4">
                  <AnimatePresence initial={false}>
                    {transactions.map((transaction) => (
                      <motion.li
                        initial={{
                          opacity: 0,
                          y: -20,
                          filter: 'blur(10px)',
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: 'blur(0px)',
                        }}
                        exit={{
                          opacity: 0,
                          y: -20,
                          filter: 'blur(10px)',
                          transition: { duration: 0.15 },
                        }}
                        key={transaction.id}
                        className="bg-[#00000014] p-6 rounded-xl flex justify-between items-center"
                        transition={{
                          duration: 0.4,
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                          bounce: 0,
                        }}
                        onClick={removeTransaction.bind(null, transaction.id)}
                        layout
                      >
                        <div>
                          <h4 className="font-medium text-lg text-zinc-900 dark:text-zinc-100">
                            {transaction.title}
                          </h4>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {transaction.date}
                          </p>
                        </div>
                        <div className="font-mono text-lg font-medium">
                          <span>{transaction.cost}$</span>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.ul>
            </div>
          </main>
        </div>
      </div>
    </DocsLayout>
  );
}

type Transaction = {
  id: string;
  title: string;
  cost: number;
  date: string;
};

const transactionsData = [
  { title: 'Groceries', cost: 45.32, date: '2023-06-01' },
  { title: 'Gas Station', cost: 52, date: '2023-06-02' },
  { title: 'Coffee Shop', cost: 5.75, date: '2023-06-03' },
  { title: 'Restaurant', cost: 78.5, date: '2023-06-04' },
  { title: 'Movie Tickets', cost: 28, date: '2023-06-05' },
  { title: 'Pharmacy', cost: 34.99, date: '2023-06-06' },
  { title: 'Electricity Bill', cost: 120.45, date: '2023-06-07' },
  { title: 'Internet Bill', cost: 69.99, date: '2023-06-08' },
  { title: 'Gym Membership', cost: 55, date: '2023-06-09' },
  { title: 'Clothing Store', cost: 95.3, date: '2023-06-10' },
  { title: 'Books', cost: 38.75, date: '2023-06-11' },
  { title: 'Pizza Delivery', cost: 22.5, date: '2023-06-12' },
  { title: 'Car Maintenance', cost: 245, date: '2023-06-13' },
  { title: 'Hair Salon', cost: 65, date: '2023-06-14' },
  { title: 'Streaming Service', cost: 15.99, date: '2023-06-15' },
  { title: 'Grocery Store', cost: 112.45, date: '2023-06-16' },
  { title: 'Parking', cost: 15, date: '2023-06-17' },
  { title: 'Phone Bill', cost: 89.99, date: '2023-06-18' },
  { title: 'Dinner Out', cost: 85.6, date: '2023-06-19' },
  { title: 'Office Supplies', cost: 42.3, date: '2023-06-20' },
  { title: 'Takeout Lunch', cost: 18.75, date: '2023-06-21' },
  { title: 'Electronics', cost: 199.99, date: '2023-06-22' },
  { title: 'Subscription Box', cost: 39.99, date: '2023-06-23' },
  { title: 'Public Transport', cost: 35, date: '2023-06-24' },
  { title: 'Flowers', cost: 25, date: '2023-06-25' },
  { title: 'Hotel Stay', cost: 320, date: '2023-06-26' },
  { title: 'Museum Admission', cost: 18.5, date: '2023-06-27' },
  { title: 'Dental Checkup', cost: 150, date: '2023-06-28' },
  { title: 'Toy Store', cost: 47.8, date: '2023-06-29' },
  { title: 'Game Console Game', cost: 59.99, date: '2023-06-30' },
  { title: 'Coffee Equipment', cost: 127.5, date: '2023-07-01' },
  { title: 'Shoes', cost: 89, date: '2023-07-02' },
  { title: 'Fast Food', cost: 12.45, date: '2023-07-03' },
  { title: 'Furniture', cost: 450, date: '2023-07-04' },
  { title: 'Garden Supplies', cost: 63.25, date: '2023-07-05' },
  { title: 'Water Bill', cost: 45.5, date: '2023-07-06' },
  { title: 'Bicycle Repair', cost: 75, date: '2023-07-07' },
  { title: 'Dog Food', cost: 52.99, date: '2023-07-08' },
  { title: 'Concert Tickets', cost: 125, date: '2023-07-09' },
  { title: 'Bakery', cost: 15.3, date: '2023-07-10' },
  { title: 'Laundry Service', cost: 28, date: '2023-07-11' },
  { title: 'Thermometer', cost: 9.99, date: '2023-07-12' },
  { title: 'Gift Card Purchase', cost: 100, date: '2023-07-13' },
  { title: 'Car Wash', cost: 22, date: '2023-07-14' },
  { title: 'Wine Bottle', cost: 35.75, date: '2023-07-15' },
  { title: 'Art Supplies', cost: 58.4, date: '2023-07-16' },
  { title: 'Vacation Booking', cost: 800, date: '2023-07-17' },
  { title: 'Insurance Premium', cost: 220, date: '2023-07-18' },
  { title: 'Kitchen Utensils', cost: 73.5, date: '2023-07-19' },
  { title: 'Tea Leaves', cost: 24.99, date: '2023-07-20' },
];
