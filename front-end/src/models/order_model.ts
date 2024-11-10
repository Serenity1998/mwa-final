export interface OrderNum {
  _id: string;
  order_num: string;
  total: number;
  is_ordered: boolean;
  order_items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  _id: string;
  name: string;
  color: string;
  description: string;
  priority: string;
  price: number;
  link: string;
  is_checked: boolean;
  createdAt: string;
}