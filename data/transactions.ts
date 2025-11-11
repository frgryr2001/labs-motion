export const descriptions = [
    'Payment from John Doe',
    'Refund to Jane Smith',
    'Subscription Renewal',
    'Payment from Acme Corp',
    'Refund to Bob Johnson',
    'Coffee Shop Purchase',
    'Online Store Payment',
    'Grocery Store',
    'Gas Station',
    'Restaurant Bill',
    'Movie Tickets',
    'Gym Membership',
    'Phone Bill',
    'Internet Service',
    'Electric Bill',
];

export const getRandomAmount = () => {
    const isRefund = Math.random() < 0.3;
    const amount = (Math.random() * 500 + 10).toFixed(2);
    return isRefund ? `-$${amount}` : `$${amount}`;
};

export const getRandomDate = () => {
    const start = new Date(2024, 0, 1);
    const end = new Date(2024, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
};

export const transactions = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    amount: getRandomAmount(),
    date: getRandomDate(),
}));
