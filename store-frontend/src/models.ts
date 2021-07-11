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
  expirationMonth: number;
  expirationYear: number;
};

export const products: Product[] = [
  {
    id: "uuid",
    name: "produto teste",
    description: "muito muito texto",
    price: 50.5,
    image_url: "https://source.unsplash.com/random?product," + Math.random(),
    slug: "produto-teste",
    created_at: "2021-06-06",
  },
  {
    id: "uuid2",
    name: "produto teste 2",
    description: "muito muito texto",
    price: 50.5,
    image_url: "https://source.unsplash.com/random?product," + Math.random(),
    slug: "produto-teste-2",
    created_at: "2021-06-06",
  },
];
