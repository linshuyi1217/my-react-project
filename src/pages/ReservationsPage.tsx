import { useMemo, useState } from "react";
import type { OrderStatus } from "../modules/reservations/types";
import { MOCK_ORDERS } from "../modules/reservations/mockData";
import {
  filterOrders,
  calculateTotalAmount,
} from "../modules/reservations/reservationService";

export default function ReservationsPage() {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "すべて">(
    "すべて"
  );

  const filteredOrders = useMemo(
    () => filterOrders(MOCK_ORDERS, keyword, statusFilter),
    [keyword, statusFilter]
  );

  const totalAmount = useMemo(() => calculateTotalAmount(MOCK_ORDERS), []);

  const stats = {
    totalUsers: 1280,
    totalOrders: MOCK_ORDERS.length,
    pendingCount: MOCK_ORDERS.filter((x) => x.status === "未入金").length,
  };

  return (
    <>
      {/* ヘッダー */}
      <header className="topbar">
        <div>
          <div className="page-title">予約管理</div>
          <div className="page-subtitle">
            スカイパスの予約データを確認・管理する画面です。
          </div>
        </div>
        <div className="topbar-right">
          <span className="topbar-user-name">林さん</span>
          <span className="topbar-user-role">システム管理者</span>
        </div>
      </header>

      {/* 統計カード */}
      <section className="stats">
        <div className="stat-card">
          <div className="stat-label">登録会員数</div>
          <div className="stat-value">
            {stats.totalUsers.toLocaleString("ja-JP")}
          </div>
          <div className="stat-desc">直近30日間で 120 名増加</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">累計予約件数</div>
          <div className="stat-value">{stats.totalOrders}</div>
          <div className="stat-desc">未入金・入金済み・キャンセルを含む</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">入金済み金額（合計）</div>
          <div className="stat-value">
            ¥ {totalAmount.toLocaleString("ja-JP")}
          </div>
          <div className="stat-desc">キャンセル分を除いた実際の入金額</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">未入金予約</div>
          <div className="stat-value">{stats.pendingCount}</div>
          <div className="stat-desc">フォローが必要な予約件数</div>
        </div>
      </section>

      {/* 検索＆一覧 */}
      <section className="orders">
        <div className="orders-toolbar">
          <div className="orders-filters">
            <input
              className="search-input"
              placeholder="予約番号／氏名／商品名で検索"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select
              className="status-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as OrderStatus | "すべて")
              }
            >
              <option value="すべて">すべてのステータス</option>
              <option value="未入金">未入金</option>
              <option value="入金済み">入金済み</option>
              <option value="キャンセル">キャンセル</option>
            </select>
          </div>
          <button
            className="primary-button"
            onClick={() =>
              alert(
                "将来的にはここで「新規予約登録」ダイアログを表示予定です。"
              )
            }
          >
            ＋ 新規予約（ダミー）
          </button>
        </div>

        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>予約番号</th>
                <th>氏名</th>
                <th>商品名</th>
                <th>予約日</th>
                <th>金額（JPY）</th>
                <th>ステータス</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-row">
                    条件に合致する予約データがありません。
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.userName}</td>
                    <td>{order.productName}</td>
                    <td>{order.date}</td>
                    <td>{order.amount.toLocaleString("ja-JP")}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
