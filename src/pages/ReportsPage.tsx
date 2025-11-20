export default function ReportsPage() {
  return (
    <>
      <header className="topbar">
        <div>
          <div className="page-title">売上レポート</div>
          <div className="page-subtitle">
            月次・商品別などの売上傾向を確認するための画面です。（グラフはダミー）
          </div>
        </div>
        <div className="topbar-right">
          <span className="topbar-user-name">林さん</span>
          <span className="topbar-user-role">システム管理者</span>
        </div>
      </header>

      <section className="stats">
        <div className="stat-card">
          <div className="stat-label">今月の売上（概算）</div>
          <div className="stat-value">¥ 1,280,000</div>
          <div className="stat-desc">予約ベースの概算金額</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">前月比</div>
          <div className="stat-value">+ 12.3 %</div>
          <div className="stat-desc">キャンペーン効果を含む</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">主力商品</div>
          <div className="stat-value">東京フリープラン 5日間</div>
          <div className="stat-desc">売上構成比 32%</div>
        </div>
      </section>

      <section className="orders">
        <div className="orders-table-wrapper">
          <div
            style={{
              height: 260,
              borderRadius: 12,
              border: "1px dashed #cbd5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#6b7280",
            }}
          >
            ここに売上グラフコンポーネント（例：RechartsやChart.js）を配置できます。
          </div>
        </div>
      </section>
    </>
  );
}
