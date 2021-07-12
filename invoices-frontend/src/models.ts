export type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  slug: string;
  price: number;
  created_at: string;
};

export type CreditCard = {
  number: string;
  name: string;
  cvv: string;
  expiration_month: number;
  expiration_year: number;
};

export enum OrderStatus {
  Approved = "approved",
  Pending = "pending",
}

export type OrderItem = {
  product: Product;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  credit_card: Omit<CreditCard, "cvv" | "name">;
  items: OrderItem[];
  status: OrderStatus;
};
