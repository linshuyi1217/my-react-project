import type { Order, OrderStatus } from "./types";

/**
 * 予約データをキーワードとステータスでフィルタリングする
 */
export const filterOrders = (
  orders: Order[],
  keyword: string,
  status: OrderStatus | "すべて"
): Order[] => {
  const kw = keyword.trim();

  return orders.filter((order) => {
    const matchKeyword =
      kw.length === 0 ||
      order.userName.includes(kw) ||
      order.productName.includes(kw) ||
      String(order.id).includes(kw);

    const matchStatus = status === "すべて" ? true : order.status === status;

    return matchKeyword && matchStatus;
  });
};

/**
 * 入金済みの合計金額を算出する
 */
export const calculateTotalAmount = (orders: Order[]): number => {
  return orders
    .filter((x) => x.status === "入金済み")
    .reduce((sum, x) => sum + x.amount, 0);
};
