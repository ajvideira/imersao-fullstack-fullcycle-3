export type Invoice = {
  id: string;
  amount: number;
  payment_date: string;
  store: string;
  description: string;
  created_at: string;
};

export type CreditCard = {
  number: string;
};
