export type OrderStatus = "未入金" | "入金済み" | "キャンセル";

export interface Order {
  id: number;
  userName: string;
  productName: string;
  date: string;
  amount: number;
  status: OrderStatus;
}
