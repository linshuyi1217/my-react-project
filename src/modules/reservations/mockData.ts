import type { Order } from "./types";

export const MOCK_ORDERS: Order[] = [
  {
    id: 1024,
    userName: "山田 太郎",
    productName: "東京フリープラン 5日間",
    date: "2025-11-10",
    amount: 158000,
    status: "入金済み",
  },
  {
    id: 1025,
    userName: "佐藤 花子",
    productName: "大阪ユニバーサルスタジオ 1日券",
    date: "2025-11-11",
    amount: 78000,
    status: "未入金",
  },
  {
    id: 1026,
    userName: "鈴木 一郎",
    productName: "北海道スキー 3日間ツアー",
    date: "2025-11-09",
    amount: 198000,
    status: "入金済み",
  },
  {
    id: 1027,
    userName: "高橋 陽子",
    productName: "京都紅葉日帰りツアー",
    date: "2025-11-07",
    amount: 52000,
    status: "キャンセル",
  },
];
