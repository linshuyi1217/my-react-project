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

/**
 * 新規予約データを生成する（ID 採番を含む）
 */
export const createOrder = (
  orders: Order[],
  data: {
    userName: string;
    productName: string;
    date: string;
    amount: number;
    status: OrderStatus;
  }
): Order => {
  // 新しい予約番号を生成（0001 の形式）
  const newId = `${String(orders.length + 1).padStart(4, "0")}`;

  const created: Order = {
    id: newId,
    userName: data.userName,
    productName: data.productName,
    date: data.date,
    amount: data.amount,
    status: data.status,
  };

  return created;
};
