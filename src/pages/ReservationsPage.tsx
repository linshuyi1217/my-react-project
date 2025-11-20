import { useMemo, useState } from "react";
import type { Order, OrderStatus } from "../modules/reservations/types";
import { MOCK_ORDERS } from "../modules/reservations/mockData";
import {
  filterOrders,
  calculateTotalAmount,
  createOrder,
} from "../modules/reservations/reservationService";

export default function ReservationsPage() {
  // 用 state 管理订单，而不是直接用 MOCK_ORDERS
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "すべて">(
    "すべて"
  );

  // “新規予約”用的表单状态
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newStatus, setNewStatus] = useState<OrderStatus>("未入金");

  const filteredOrders = useMemo(
    () => filterOrders(orders, keyword, statusFilter),
    [orders, keyword, statusFilter]
  );

  const totalAmount = useMemo(() => calculateTotalAmount(orders), [orders]);

  const stats = {
    totalUsers: 1280,
    totalOrders: orders.length,
    pendingCount: orders.filter((x) => x.status === "未入金").length,
  };

  // 新规予約保存处理
  const handleCreateOrder = () => {
    if (!newUserName || !newProductName || !newDate || !newAmount) {
      alert("必須項目を入力してください。");
      return;
    }

    const amountNumber = Number(newAmount);
    if (Number.isNaN(amountNumber) || amountNumber <= 0) {
      alert("金額は 0 より大きい数値を入力してください。");
      return;
    }

    // 这里改成调用 service 的 createOrder
    const created = createOrder(orders, {
      userName: newUserName,
      productName: newProductName,
      date: newDate,
      amount: amountNumber,
      status: newStatus,
    });

    setOrders([...orders, created]);

    // ダイアログと入力値リセット
    setIsDialogOpen(false);
    setNewUserName("");
    setNewProductName("");
    setNewDate("");
    setNewAmount("");
    setNewStatus("未入金");
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
            onClick={() => setIsDialogOpen(true)} // ★ ダイアログ表示
          >
            ＋ 新規予約
          </button>
        </div>

        {isDialogOpen && (
          <div className="dialog-backdrop">
            <div className="dialog">
              <h2 className="dialog-title">新規予約登録</h2>
              <div className="dialog-body">
                <label className="dialog-field">
                  <span>氏名</span>
                  <input
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="山田 太郎"
                  />
                </label>
                <label className="dialog-field">
                  <span>商品名</span>
                  <input
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="ソウル3日間ツアー"
                  />
                </label>
                <label className="dialog-field">
                  <span>予約日</span>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                </label>
                <label className="dialog-field">
                  <span>金額（JPY）</span>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                  />
                </label>
                <label className="dialog-field">
                  <span>ステータス</span>
                  <select
                    value={newStatus}
                    onChange={(e) =>
                      setNewStatus(e.target.value as OrderStatus)
                    }
                  >
                    <option value="未入金">未入金</option>
                    <option value="入金済み">入金済み</option>
                    <option value="キャンセル">キャンセル</option>
                  </select>
                </label>
              </div>
              <div className="dialog-footer">
                <button
                  className="primary-button"
                  onClick={() => setIsDialogOpen(false)}
                >
                  キャンセル
                </button>
                <button className="primary-button" onClick={handleCreateOrder}>
                  登録する
                </button>
              </div>
            </div>
          </div>
        )}

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
