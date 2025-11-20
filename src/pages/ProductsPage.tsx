const MOCK_PRODUCTS = [
  {
    id: "P-001",
    name: "東京フリープラン 5日間",
    price: 158000,
    status: "販売中",
  },
  { id: "P-002", name: "大阪USJ 1日ツアー", price: 78000, status: "販売中" },
  {
    id: "P-003",
    name: "北海道スキー 3日間",
    price: 198000,
    status: "一時停止",
  },
];

export default function ProductsPage() {
  return (
    <>
      <header className="topbar">
        <div>
          <div className="page-title">商品管理</div>
          <div className="page-subtitle">
            旅行商品マスタの一覧とステータスの確認を行う画面です。（サンプル）
          </div>
        </div>
        <div className="topbar-right">
          <span className="topbar-user-name">林さん</span>
          <span className="topbar-user-role">システム管理者</span>
        </div>
      </header>

      <section className="stats">
        {MOCK_PRODUCTS.map((p) => (
          <div key={p.id} className="stat-card">
            <div className="stat-label">商品コード：{p.id}</div>
            <div className="stat-value">{p.name}</div>
            <div className="stat-desc">
              価格：¥ {p.price.toLocaleString("ja-JP")} ／ ステータス：
              {p.status}
            </div>
          </div>
        ))}
      </section>

      <section className="orders">
        <div className="orders-toolbar">
          <span style={{ fontSize: 12, color: "#6b7280" }}>
            ※ 実際の案件ではここから「商品登録／編集」画面へ遷移させます。
          </span>
          <button className="primary-button" disabled>
            新規商品を追加（ダミー）
          </button>
        </div>
      </section>
    </>
  );
}
